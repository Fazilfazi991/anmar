const SHEET_ID = "PASTE_GOOGLE_SHEET_ID_HERE";
const SHEET_NAME = "Leads";
const NOTIFY_EMAIL = "operations@almrebid.sa";

const HEADERS = [
  "Submitted At",
  "Source",
  "Name",
  "Phone",
  "Company",
  "Storage",
  "City",
  "Volume",
  "Message",
  "Page"
];

function getLeadSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  return sheet;
}

function doPost(e) {
  const payload = JSON.parse((e.postData && e.postData.contents) || "{}");
  const sheet = getLeadSheet();

  sheet.appendRow([
    payload.submittedAt || new Date().toISOString(),
    payload.source || "",
    payload.name || "",
    payload.phone || "",
    payload.company || "",
    payload.storage || "",
    payload.city || "",
    payload.volume || "",
    payload.message || "",
    payload.page || ""
  ]);

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "New Anmar Logistics website lead",
    htmlBody:
      "<h2>New website storage request</h2>" +
      "<p><b>Source:</b> " + escapeHtml(payload.source || "") + "</p>" +
      "<p><b>Name:</b> " + escapeHtml(payload.name || "") + "</p>" +
      "<p><b>Phone:</b> " + escapeHtml(payload.phone || "") + "</p>" +
      "<p><b>Company:</b> " + escapeHtml(payload.company || "") + "</p>" +
      "<p><b>Storage:</b> " + escapeHtml(payload.storage || "") + "</p>" +
      "<p><b>City:</b> " + escapeHtml(payload.city || "") + "</p>" +
      "<p><b>Volume:</b> " + escapeHtml(payload.volume || "") + "</p>" +
      "<p><b>Message:</b> " + escapeHtml(payload.message || "") + "</p>" +
      "<p><b>Page:</b> " + escapeHtml(payload.page || "") + "</p>"
  });

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  const rows = getLeadSheet().getDataRange().getValues();
  const bodyRows = rows.slice(1).reverse();
  const total = bodyRows.length;
  const chatbot = bodyRows.filter((row) => String(row[1]).toLowerCase().includes("chatbot")).length;
  const forms = total - chatbot;

  const tableRows = bodyRows.map((row) => {
    return "<tr>" + row.map((cell, index) => {
      const value = escapeHtml(cell || "");
      if (index === 9 && value) {
        return '<td><a href="' + value + '" target="_blank" rel="noopener">Open</a></td>';
      }
      return "<td>" + value + "</td>";
    }).join("") + "</tr>";
  }).join("");

  const html =
    "<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>" +
    "<title>Anmar Leads Dashboard</title>" +
    "<style>body{margin:0;background:#eef5fb;color:#071d3a;font-family:Arial,sans-serif}main{padding:28px}h1{margin:0 0 8px;font-size:34px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:22px 0}.card{background:#fff;border:1px solid #b9c9d8;border-radius:10px;padding:18px;box-shadow:0 12px 30px rgba(8,38,74,.1)}.card strong{display:block;font-size:30px}.table{overflow:auto;background:#fff;border:1px solid #b9c9d8;border-radius:10px}table{width:100%;border-collapse:collapse;min-width:980px}th,td{padding:12px;border-bottom:1px solid #dfe8f1;text-align:left;font-size:13px;vertical-align:top}th{background:#f7fbff;font-size:11px;text-transform:uppercase}a{color:#08264a;font-weight:700}@media(max-width:760px){.cards{grid-template-columns:1fr}main{padding:18px}}</style>" +
    "</head><body><main><h1>Anmar Leads Dashboard</h1><p>Central leads saved in Google Sheet. Email notifications are sent to " + escapeHtml(NOTIFY_EMAIL) + ".</p>" +
    "<div class='cards'><div class='card'><strong>" + total + "</strong><span>Total leads</span></div><div class='card'><strong>" + chatbot + "</strong><span>Chatbot leads</span></div><div class='card'><strong>" + forms + "</strong><span>Form leads</span></div></div>" +
    "<div class='table'><table><thead><tr>" + HEADERS.map((header) => "<th>" + header + "</th>").join("") + "</tr></thead><tbody>" + tableRows + "</tbody></table></div>" +
    "</main></body></html>";

  return HtmlService.createHtmlOutput(html).setTitle("Anmar Leads Dashboard");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
