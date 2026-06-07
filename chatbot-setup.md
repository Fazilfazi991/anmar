# Chatbot, Lead Dashboard, Sheet, and Email Setup

The website chatbot is installed on every page and opens automatically after 10 seconds. The contact form uses the same lead endpoint.

## Current Status

`assets/chatbot-config.js` currently has:

```js
endpoint: ""
```

That means email and Google Sheet delivery are not active yet. Until the endpoint is connected:

- Chatbot leads are saved in the visitor browser under `anmarChatbotLeads`.
- Contact-form leads are saved in the visitor browser under `anmarFormLeads`.
- The local dashboard at `leads-dashboard.html` can show only leads saved in that same browser.

## Local Website Dashboard

Open this page on the site:

```text
leads-dashboard.html
```

It shows:

- Total local leads
- Chatbot leads
- Form leads
- Filters and search
- CSV export
- Whether the Google Sheet/email endpoint is connected

This local dashboard is useful for testing, but it is not a central shared lead database.

## Google Sheet and Email Setup

To save chatbot and contact-form leads to Google Sheets and send email to `operations@almrebid.sa`:

1. Create a Google Sheet.
2. Copy the spreadsheet ID from the Sheet URL.
3. Open Google Apps Script.
4. Paste the code from `chatbot-google-apps-script.gs`.
5. Confirm the `SHEET_ID` value matches your Google Sheet ID: `1_GxlC_e1Ra00R60-Oq1K9BclMhMX5iFzQRH4AHCWXTw`.
6. Deploy the script as a Web App.
7. Set access to `Anyone`.
8. Copy the Web App URL.
9. Paste that URL into `assets/chatbot-config.js`:

```js
window.ANMAR_CHATBOT_CONFIG = {
  endpoint: "PASTE_WEB_APP_URL_HERE",
  notifyEmail: "operations@almrebid.sa",
  whatsapp: "966598626402"
};
```

After this is connected:

- Chatbot leads will be sent to the Google Sheet.
- Contact-form leads will be sent to the same Google Sheet.
- Email notifications will be sent to `operations@almrebid.sa`.
- Opening the deployed Apps Script Web App URL in a browser will show a central leads dashboard from the Google Sheet.

## Important

The first lead submission may ask Google Apps Script for permission to send email and access the Sheet. Approve it from the Google account that owns the script.
