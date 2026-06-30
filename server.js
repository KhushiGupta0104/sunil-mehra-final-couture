import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xss from 'xss';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per window
    message: { success: false, error: 'Too many requests, please try again later.' }
});

// Local Database Setup
const DB_FILE = path.join(__dirname, 'appointments.json');

const readDB = () => {
    try {
        if (!fs.existsSync(DB_FILE)) return [];
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
};

const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// API endpoint to fetch all appointments
app.get('/api/appointments', (req, res) => {
    try {
        const apiKey = req.headers['x-admin-api-key'];
        if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const db = readDB();
        res.json(db);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

// API endpoint to receive appointment requests
app.post('/api/appointments', apiLimiter, async (req, res) => {
    try {
        const { name, email, phone, date, interest, message, instagram_handle, liked_dresses } = req.body;

        // Basic validation
        if (!name || !name.trim() || !email || !email.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Name and email are required.'
            });
        }

        // Sanitize inputs
        const safeName = xss(name);
        const safeEmail = xss(email);
        const safePhone = phone ? xss(phone) : '';
        const safeInterest = interest ? xss(interest) : '';
        const safeMessage = message ? xss(message) : '';
        const safeInstagram = instagram_handle ? xss(instagram_handle) : '';

        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

        // 0. Save to local DB
        const newAppointment = {
            id: Date.now().toString(),
            timestamp,
            name: safeName,
            email: safeEmail,
            phone: safePhone,
            date,
            interest: safeInterest,
            message: safeMessage,
            instagram_handle: safeInstagram,
            liked_dresses
        };
        const db = readDB();
        db.push(newAppointment);
        writeDB(db);

        let crmSuccess = false;
        let crmError = null;

        // 1. Forward to CRM Webhook
        const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
        const crmWebhookSecret = process.env.CRM_WEBHOOK_SECRET;

        if (crmWebhookUrl && crmWebhookSecret) {
            console.log(`[Backend] Forwarding appointment for "${name}" to CRM...`);
            try {
                // Ensure appointment_date is a valid ISO string. If not provided, use current date.
                let isoDate;
                try {
                    isoDate = date ? new Date(date).toISOString() : new Date().toISOString();
                } catch {
                    isoDate = new Date().toISOString();
                }

                const crmPayload = {
                    bride_name: name,
                    appointment_date: isoDate,
                    contact_email: email,
                    contact_phone: phone || '',
                    instagram_handle: instagram_handle || '',
                    liked_dresses: liked_dresses || [],
                    notes: `[Interest: ${interest || 'N/A'}] ${message || ''}`
                };

                const crmResponse = await fetch(crmWebhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-webhook-secret': crmWebhookSecret
                    },
                    body: JSON.stringify(crmPayload)
                });

                if (crmResponse.ok) {
                    console.log('[Backend] Successfully forwarded request to CRM.');
                    crmSuccess = true;
                } else {
                    const text = await crmResponse.text();
                    console.error(`[Backend] CRM Webhook returned status ${crmResponse.status}: ${text}`);
                    crmError = 'CRM webhook returned an error';
                }
            } catch (err) {
                console.error('[Backend] CRM Webhook fetch failed:', err);
                crmError = 'CRM webhook fetch failed';
            }
        } else {
            console.warn('[Backend] CRM_WEBHOOK_URL or CRM_WEBHOOK_SECRET is not configured. Skipping CRM integration.');
        }

        // If CRM webhook is not configured, return mock success
        if (!crmWebhookUrl) {
            console.warn('[Backend Warning] CRM webhook not configured. Logging locally only.');
            return res.status(200).json({
                success: true,
                message: 'Your appointment request was simulated successfully. (CRM webhook not configured)'
            });
        }

        // If CRM webhook failed, return error
        if (!crmSuccess) {
             return res.status(502).json({
                success: false,
                error: crmError || 'Failed to log request. CRM webhook returned an error.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Your appointment request has been logged successfully.'
        });

    } catch (error) {
        console.error('[Backend Error]:', error);
        return res.status(500).json({
            success: false,
            error: 'An internal error occurred. Please try again later.'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`[Backend] Server listening on http://localhost:${PORT}`);
});
