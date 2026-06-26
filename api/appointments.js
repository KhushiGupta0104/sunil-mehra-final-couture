// api/appointments.js
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method Not Allowed. Only POST requests are accepted.'
        });
    }

    try {
        const { name, email, phone, date, interest, message } = req.body;

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
            console.log(`[Vercel Serverless] Forwarding appointment for "${name}" to CRM...`);
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
                    console.log('[Vercel Serverless] Successfully forwarded request to CRM.');
                    crmSuccess = true;
                } else {
                    const text = await crmResponse.text();
                    console.error(`[Vercel Serverless] CRM Webhook returned status ${crmResponse.status}: ${text}`);
                    crmError = 'CRM webhook returned an error';
                }
            } catch (err) {
                console.error('[Vercel Serverless] CRM Webhook fetch failed:', err);
                crmError = 'CRM webhook fetch failed';
            }
        } else {
            console.warn('[Vercel Serverless] CRM_WEBHOOK_URL or CRM_WEBHOOK_SECRET is not configured. Skipping CRM integration.');
        }

        // 2. Forward to Google Sheets Webhook
        let sheetsSuccess = false;
        const sheetsWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
        
        if (sheetsWebhookUrl && sheetsWebhookUrl.trim() !== '') {
            console.log(`[Vercel Serverless] Forwarding appointment for "${name}" to Google Sheets...`);
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
                    console.log('[Vercel Serverless] Successfully forwarded request to Google Sheets.');
                    sheetsSuccess = true;
                } else {
                    const text = await sheetsResponse.text();
                    console.error(`[Vercel Serverless] Google Sheets Webhook returned status ${sheetsResponse.status}: ${text}`);
                }
            } catch (err) {
                console.error('[Vercel Serverless] Google Sheets Webhook fetch failed:', err);
            }
        } else {
            console.warn('[Vercel Serverless] GOOGLE_SHEET_WEBHOOK_URL is not configured.');
        }

        // If neither webhook is configured, log an error
        if (!crmWebhookUrl && !sheetsWebhookUrl) {
            return res.status(500).json({
                success: false,
                error: 'Server configuration error: No webhooks are configured.'
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
        console.error('[Vercel Serverless Error]:', error);
        return res.status(500).json({
            success: false,
            error: 'An internal error occurred while processing your request.'
        });
    }
}
