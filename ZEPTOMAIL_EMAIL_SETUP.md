# ZeptoMail OTP email (`email.service.ts`)

## Step-by-step

1. **Install dependency** (from `ecom_back/`):

   ```bash
   npm install zeptomail
   ```

2. **Configure environment** — add the variables below to your `.env` (see example block). Use the **Send Mail token** from ZeptoMail (API), not the SMTP password.

3. **Replace / verify code** — OTP mail is sent from [`src/services/email.service.ts`](src/services/email.service.ts) via `SendMailClient`.

4. **Restart the API** and trigger an email OTP (signup or password reset) to confirm delivery.

5. **(Recommended)** If you previously shared SMTP credentials publicly, **rotate** them in ZeptoMail after switching to the API token.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ZEPTOMAIL_SEND_MAIL_TOKEN` | Yes | Full **Send Mail** API token exactly as copied, e.g. `Zoho-enczapikey yourTokenValue...`. |
| `ZEPTOMAIL_FROM_EMAIL` | Yes* | Verified sender address allowed by your Mail Agent. |
| `ZEPTOMAIL_FROM_NAME` | No | Display name (defaults to `APP_NAME` or `Ecom`). |
| `ZEPTOMAIL_API_URL` | No | Defaults to `https://api.zeptomail.com/v1.1/email`. |

\*`ZEPTOMAIL_FROM_EMAIL` must be set to a verified sender address in your ZeptoMail Mail Agent.

## `.env` example

```env
# ZeptoMail Send Mail API (OTP emails via email.service.ts)
ZEPTOMAIL_SEND_MAIL_TOKEN=Zoho-enczapikey your-real-send-mail-token
ZEPTOMAIL_FROM_EMAIL=noreply@your-verified-domain.com
ZEPTOMAIL_FROM_NAME=Ecom
# ZEPTOMAIL_API_URL=https://api.zeptomail.com/v1.1/email

APP_NAME=Ecom
```

## Where to get values in ZeptoMail (dashboard)

- **Send Mail token**  
  ZeptoMail console → select your **Mail Agent** → **API** (or **SMTP / API** / **API credentials**, depending on UI) → create or copy the **Send Mail token**. Paste the **entire** string into `ZEPTOMAIL_SEND_MAIL_TOKEN`.

- **Verified sender (`ZEPTOMAIL_FROM_EMAIL`)**  
  Same **Mail Agent** → sender / bounce / domain configuration (e.g. **Sender**, **Bounce address**, or **Domains** / verified senders). Use the **exact** from-address ZeptoMail allows for that agent (often `noreply@yourdomain.com` after domain verification).

## Raw HTTP request (reference)

Same payload the SDK sends:

```http
POST https://api.zeptomail.com/v1.1/email
Authorization: Zoho-enczapikey your-real-send-mail-token
Content-Type: application/json
```

```json
{
  "from": { "address": "noreply@your-verified-domain.com", "name": "Ecom" },
  "to": [
    { "email_address": { "address": "user@example.com", "name": "user" } }
  ],
  "subject": "Verify Your Account",
  "textbody": "plain text body",
  "htmlbody": "<div>HTML body</div>"
}
```

## Note on other email code

[`src/utils/email.ts`](src/utils/email.ts) still uses **Nodemailer + SMTP** for generic `sendEmail`. Removing `nodemailer` from the project requires migrating that utility separately.
