const SHEET_ID = "PASTE_GOOGLE_SHEET_ID_HERE";
const NOTIFY_EMAIL = "operations@almrebid.sa";

function doPost(e) {
  const payload = JSON.parse(e.postData.contents || "{}");
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Leads") ||
    SpreadsheetApp.openById(SHEET_ID).insertSheet("Leads");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Submitted At", "Source", "Name", "Phone", "Company", "Storage", "City", "Volume", "Message", "Page"]);
  }

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
      "<p><b>Source:</b> " + (payload.source || "") + "</p>" +
      "<p><b>Name:</b> " + (payload.name || "") + "</p>" +
      "<p><b>Phone:</b> " + (payload.phone || "") + "</p>" +
      "<p><b>Company:</b> " + (payload.company || "") + "</p>" +
      "<p><b>Storage:</b> " + (payload.storage || "") + "</p>" +
      "<p><b>City:</b> " + (payload.city || "") + "</p>" +
      "<p><b>Volume:</b> " + (payload.volume || "") + "</p>" +
      "<p><b>Message:</b> " + (payload.message || "") + "</p>" +
      "<p><b>Page:</b> " + (payload.page || "") + "</p>"
  });

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
