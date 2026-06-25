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
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !name.trim() || !email || !email.trim() || !message || !message.trim()) {
            return res.status(400).json({
                success: false,
                error: 'All fields (name, email, message) are required.'
            });
        }

        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

        // Retrieve webhook URL from environment variables
        const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
        if (!webhookUrl || webhookUrl.trim() === '') {
            console.error('[Vercel Serverless] GOOGLE_SHEET_WEBHOOK_URL environment variable is not configured.');
            return res.status(500).json({
                success: false,
                error: 'Server configuration error: Google Sheets Webhook URL is missing. Please configure GOOGLE_SHEET_WEBHOOK_URL on Vercel.'
            });
        }

        console.log(`[Vercel Serverless] Forwarding appointment for "${name}" to Google Sheets...`);

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
            console.log('[Vercel Serverless] Successfully forwarded request to Google Sheets.');
            return res.status(200).json({
                success: true,
                message: 'Your appointment request has been logged successfully.'
            });
        } else {
            const text = await response.text();
            console.error(`[Vercel Serverless] Google Sheets Webhook returned status ${response.status}: ${text}`);
            return res.status(502).json({
                success: false,
                error: 'Failed to log request to Google Sheets. The webhook returned an error.'
            });
        }

    } catch (error) {
        console.error('[Vercel Serverless Error]:', error);
        return res.status(500).json({
            success: false,
            error: 'An internal error occurred while processing your request.'
        });
    }
}
