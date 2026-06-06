# Chatbot Sheet and Email Setup

The website chatbot is installed on every page and opens automatically after 5 seconds.

To save leads to Google Sheets and send email:

1. Create a Google Sheet and copy its spreadsheet ID.
2. Open Google Apps Script and paste the code from `chatbot-google-apps-script.gs`.
3. Replace `PASTE_GOOGLE_SHEET_ID_HERE` with the Sheet ID.
4. Deploy the script as a Web App with access set to "Anyone".
5. Copy the Web App URL.
6. Paste that URL into `assets/chatbot-config.js`:

```js
window.ANMAR_CHATBOT_CONFIG = {
  endpoint: "PASTE_WEB_APP_URL_HERE",
  notifyEmail: "info@anmarlogistics.com",
  whatsapp: "966598626402"
};
```

Until the endpoint is added, chatbot leads are saved in browser local storage and visitors can continue the request through WhatsApp.
