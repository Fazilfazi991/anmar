(function () {
  const config = window.ANMAR_CHATBOT_CONFIG || {};
  const endpoint = (config.endpoint || "").trim();

  const table = document.querySelector("[data-leads-table]");
  const emptyState = document.querySelector("[data-empty-state]");
  const searchInput = document.querySelector("[data-search]");
  const sourceFilter = document.querySelector("[data-source-filter]");
  const storageFilter = document.querySelector("[data-storage-filter]");
  const totalEl = document.querySelector("[data-total-leads]");
  const chatbotEl = document.querySelector("[data-chatbot-leads]");
  const formEl = document.querySelector("[data-form-leads]");
  const endpointStatus = document.querySelector("[data-endpoint-status]");
  const endpointHelp = document.querySelector("[data-endpoint-help]");

  function readLeads(key, type) {
    try {
      return JSON.parse(localStorage.getItem(key) || "[]").map((lead) => ({ ...lead, leadType: type }));
    } catch (error) {
      return [];
    }
  }

  function allLeads() {
    return [
      ...readLeads("anmarChatbotLeads", "chatbot"),
      ...readLeads("anmarFormLeads", "form")
    ].sort((a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0));
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
  }

  function filteredLeads() {
    const q = (searchInput.value || "").trim().toLowerCase();
    const source = sourceFilter.value;
    const storage = storageFilter.value;

    return allLeads().filter((lead) => {
      const sourceMatch = !source || lead.leadType === source;
      const storageMatch = !storage || (lead.storage || "") === storage;
      const haystack = [
        lead.name,
        lead.phone,
        lead.company,
        lead.storage,
        lead.city,
        lead.volume,
        lead.message,
        lead.page,
        lead.source
      ].join(" ").toLowerCase();
      return sourceMatch && storageMatch && (!q || haystack.includes(q));
    });
  }

  function populateStorageOptions(leads) {
    const current = storageFilter.value;
    const values = Array.from(new Set(leads.map((lead) => lead.storage).filter(Boolean))).sort();
    storageFilter.innerHTML = '<option value="">All storage</option>' +
      values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
    storageFilter.value = values.includes(current) ? current : "";
  }

  function render() {
    const leads = allLeads();
    populateStorageOptions(leads);

    const chatbotCount = leads.filter((lead) => lead.leadType === "chatbot").length;
    const formCount = leads.filter((lead) => lead.leadType === "form").length;
    totalEl.textContent = String(leads.length);
    chatbotEl.textContent = String(chatbotCount);
    formEl.textContent = String(formCount);

    endpointStatus.textContent = endpoint ? "Sheet/email connected" : "Sheet/email not connected";
    endpointHelp.textContent = endpoint
      ? "Website leads are being posted to the configured Google Apps Script endpoint."
      : "Current config endpoint is empty, so email and Google Sheet delivery are not active yet.";

    const visible = filteredLeads();
    table.innerHTML = visible.map((lead) => `
      <tr>
        <td>${escapeHtml(formatDate(lead.submittedAt))}</td>
        <td><strong>${escapeHtml(lead.leadType)}</strong><br>${escapeHtml(lead.source)}</td>
        <td><strong>${escapeHtml(lead.name)}</strong></td>
        <td>${escapeHtml(lead.phone)}</td>
        <td>${escapeHtml(lead.company)}</td>
        <td>${escapeHtml(lead.storage)}</td>
        <td>${escapeHtml(lead.city)}</td>
        <td>${escapeHtml(lead.volume)}</td>
        <td>${escapeHtml(lead.message)}</td>
        <td>${lead.page ? `<a class="link" href="${escapeHtml(lead.page)}" target="_blank" rel="noopener">Open</a>` : ""}</td>
      </tr>
    `).join("");

    emptyState.hidden = visible.length > 0;
  }

  function exportCsv() {
    const rows = filteredLeads();
    const headers = ["Submitted At", "Type", "Source", "Name", "Phone", "Company", "Storage", "City", "Volume", "Message", "Page"];
    const csv = [headers, ...rows.map((lead) => [
      lead.submittedAt || "",
      lead.leadType || "",
      lead.source || "",
      lead.name || "",
      lead.phone || "",
      lead.company || "",
      lead.storage || "",
      lead.city || "",
      lead.volume || "",
      lead.message || "",
      lead.page || ""
    ])].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `anmar-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  searchInput.addEventListener("input", render);
  sourceFilter.addEventListener("change", render);
  storageFilter.addEventListener("change", render);
  document.querySelector("[data-refresh]").addEventListener("click", render);
  document.querySelector("[data-export]").addEventListener("click", exportCsv);

  render();
})();
