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
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !name.trim() || !email || !email.trim() || !message || !message.trim()) {
            return res.status(400).json({
                success: false,
                error: 'All fields (name, email, message) are required.'
            });
        }

        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
        const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

        if (!webhookUrl || webhookUrl.trim() === '') {
            console.warn('[Backend Warning] GOOGLE_SHEET_WEBHOOK_URL is not set in your .env file.');
            console.log(`[Backend Log Simulation] Timestamp: ${timestamp}, Name: ${name}, Email: ${email}, Message: ${message}`);
            return res.status(200).json({
                success: true,
                message: 'Your appointment request was simulated successfully. (Warning: GOOGLE_SHEET_WEBHOOK_URL not set)'
            });
        }

        console.log(`[Backend] Forwarding appointment for "${name}" to Google Sheets...`);
        
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    timestamp,
                    name,
                    email,
                    message
                })
            });

            if (response.ok) {
                console.log('[Backend] Successfully logged to Google Sheets.');
                return res.status(200).json({
                    success: true,
                    message: 'Your appointment request has been logged successfully.'
                });
            } else {
                const text = await response.text();
                console.error(`[Backend] Google Sheets Webhook returned error (${response.status}): ${text}`);
                return res.status(502).json({
                    success: false,
                    error: 'Failed to log request to Google Sheets. Webhook returned an error.'
                });
            }
        } catch (fetchErr) {
            console.error('[Backend] Network error forwarding to Google Sheets:', fetchErr.message);
            return res.status(502).json({
                success: false,
                error: 'Failed to connect to the Google Sheets webhook. Please check the URL configuration.'
            });
        }

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
