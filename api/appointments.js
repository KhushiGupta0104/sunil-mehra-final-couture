import xss from 'xss';

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

    // Handle GET for Admin Dashboard
    if (req.method === 'GET') {
        const apiKey = req.headers['x-admin-api-key'];
        if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // Serverless functions don't have a local filesystem DB. Return empty array to prevent crashing Admin UI.
        return res.status(200).json([]);
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method Not Allowed. Only POST and GET requests are accepted.'
        });
    }

    try {
        const { name, email, phone, date, interest, message, instagram_handle, liked_dresses, liked_dresses_details } = req.body;

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

        let crmSuccess = false;
        let crmError = null;

        // 1. Forward to CRM Webhook
        const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
        const crmWebhookSecret = process.env.CRM_WEBHOOK_SECRET;

        if (crmWebhookUrl && crmWebhookSecret) {
            console.log(`[Vercel Serverless] Forwarding appointment for "${safeName}" to CRM...`);
            try {
                // Ensure appointment_date is a valid ISO string. If not provided, use current date.
                let isoDate;
                try {
                    isoDate = date ? new Date(date).toISOString() : new Date().toISOString();
                } catch {
                    isoDate = new Date().toISOString();
                }

                const crmPayload = {
                    bride_name: safeName,
                    appointment_date: isoDate,
                    contact_email: safeEmail,
                    contact_phone: safePhone || '',
                    instagram_handle: safeInstagram || '',
                    liked_dresses: liked_dresses || [],
                    liked_dresses_details: liked_dresses_details || [],
                    notes: `[Interest: ${safeInterest || 'N/A'}] ${safeMessage || ''}`
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

        // If CRM webhook is not configured, return mock success so the frontend doesn't crash for the client
        if (!crmWebhookUrl) {
            console.warn('[Vercel Serverless Warning] CRM webhook not configured. Returning simulated success.');
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
        console.error('[Vercel Serverless Error]:', error);
        return res.status(500).json({
            success: false,
            error: 'An internal error occurred while processing your request.'
        });
    }
}
