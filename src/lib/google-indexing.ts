/**
 * Google Indexing API utility — zero external dependencies.
 * Uses Node.js built-in `crypto` for JWT signing and `https` for API requests.
 *
 * Setup:
 * 1. Create a Service Account in Google Cloud Console with the Indexing API enabled.
 * 2. Add the service account email as an Owner in Google Search Console.
 * 3. Download the JSON key and add its contents as GOOGLE_INDEXING_SA_KEY in your env.
 *
 * GOOGLE_INDEXING_SA_KEY={"type":"service_account","project_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...","client_email":"...@....iam.gserviceaccount.com"}
 */

import crypto from 'crypto';
import https from 'https';

const INDEXING_SCOPE = 'https://www.googleapis.com/auth/indexing';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const INDEXING_URL = 'https://indexing.googleapis.com/v3/urlNotifications:publish';

function base64url(input: Buffer | string): string {
    const buf = typeof input === 'string' ? Buffer.from(input) : input;
    return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

async function getAccessToken(clientEmail: string, privateKey: string): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const claim = base64url(
        JSON.stringify({
            iss: clientEmail,
            scope: INDEXING_SCOPE,
            aud: TOKEN_URL,
            exp: now + 3600,
            iat: now,
        })
    );

    const unsignedJwt = `${header}.${claim}`;
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(unsignedJwt);
    const signature = base64url(sign.sign(privateKey));
    const jwt = `${unsignedJwt}.${signature}`;

    const body = new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
    }).toString();

    return new Promise((resolve, reject) => {
        const req = https.request(
            TOKEN_URL,
            { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
            (res) => {
                let data = '';
                res.on('data', (chunk) => (data += chunk));
                res.on('end', () => {
                    try {
                        const json = JSON.parse(data);
                        if (json.access_token) resolve(json.access_token);
                        else reject(new Error(`Token exchange failed: ${data}`));
                    } catch (e) {
                        reject(e);
                    }
                });
            }
        );
        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

/**
 * Notify Google to crawl or remove a URL.
 * Never throws — logs errors silently so publish flow is never blocked.
 */
export async function notifyGoogleIndexing(
    url: string,
    type: 'URL_UPDATED' | 'URL_DELETED'
): Promise<void> {
    const keyJson = process.env.GOOGLE_INDEXING_SA_KEY;
    if (!keyJson) {
        console.warn('[Indexing API] GOOGLE_INDEXING_SA_KEY not set — skipping.');
        return;
    }

    try {
        const { client_email, private_key } = JSON.parse(keyJson);
        const accessToken = await getAccessToken(client_email, private_key);

        const payload = JSON.stringify({ url, type });

        await new Promise<void>((resolve, reject) => {
            const req = https.request(
                INDEXING_URL,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(payload),
                    },
                },
                (res) => {
                    let data = '';
                    res.on('data', (chunk) => (data += chunk));
                    res.on('end', () => {
                        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                            console.log(`[Indexing API] Notified: ${type} ${url}`);
                            resolve();
                        } else {
                            reject(new Error(`Indexing API error ${res.statusCode}: ${data}`));
                        }
                    });
                }
            );
            req.on('error', reject);
            req.write(payload);
            req.end();
        });
    } catch (err) {
        console.error('[Indexing API] Failed to notify Google:', err);
        // Never re-throw — indexing failure should never break the publish flow
    }
}
