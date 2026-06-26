import express from 'express';
import cors from 'cors';
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
app.use(cors());
app.use(express.json());

// API endpoint to receive appointment requests
app.post('/api/appointments', async (req, res) => {
    try {
        const { name, email, phone, date, interest, message, instagram_handle, liked_dresses } = req.body;

        // Basic validation
        if (!name || !name.trim() || !email || !email.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Name and email are required.'
            });
        }

        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

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

        // 2. Forward to Google Sheets Webhook
        let sheetsSuccess = false;
        const sheetsWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
        
        if (sheetsWebhookUrl && sheetsWebhookUrl.trim() !== '') {
            console.log(`[Backend] Forwarding appointment for "${name}" to Google Sheets...`);
            try {
                const sheetsResponse = await fetch(sheetsWebhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        timestamp,
                        name,
                        email,
                        message: `[Phone: ${phone || ''} | Interest: ${interest || ''}] ${message || ''}`
                    })
                });

                if (sheetsResponse.ok) {
                    console.log('[Backend] Successfully logged to Google Sheets.');
                    sheetsSuccess = true;
                } else {
                    const text = await sheetsResponse.text();
                    console.error(`[Backend] Google Sheets Webhook returned error (${sheetsResponse.status}): ${text}`);
                }
            } catch (fetchErr) {
                console.error('[Backend] Network error forwarding to Google Sheets:', fetchErr.message);
            }
        } else {
            console.warn('[Backend] GOOGLE_SHEET_WEBHOOK_URL is not configured.');
        }

        // If neither webhook is configured, return mock success
        if (!crmWebhookUrl && !sheetsWebhookUrl) {
            console.warn('[Backend Warning] No webhooks configured. Logging locally only.');
            return res.status(200).json({
                success: true,
                message: 'Your appointment request was simulated successfully. (Webhooks not configured)'
            });
        }

        // If configured webhooks failed, return error
        if (!crmSuccess && !sheetsSuccess) {
             return res.status(502).json({
                success: false,
                error: crmError || 'Failed to log request. Webhooks returned an error or are not configured.'
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
