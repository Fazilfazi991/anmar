(function () {
  const config = window.ANMAR_CHATBOT_CONFIG || {};
  const endpoint = (config.endpoint || "").trim();
  const whatsapp = config.whatsapp || "966598626402";

  const questions = [
    { name: "name", label: "Your name", type: "text", placeholder: "Full name", required: true },
    { name: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+966 ...", required: true },
    { name: "company", label: "Company", type: "text", placeholder: "Company name" },
    { name: "storage", label: "Storage need", type: "select", options: ["Medical storage", "Food storage", "Cosmetics storage", "Cold storage", "Dry storage", "3PL support"], required: true },
    { name: "city", label: "Preferred city", type: "select", options: ["Riyadh", "Jeddah", "Dammam", "Madinah", "Not sure yet"], required: true },
    { name: "volume", label: "Capacity needed", type: "text", placeholder: "Pallets, sqm, cartons, or monthly volume" },
    { name: "message", label: "Anything important?", type: "textarea", placeholder: "Temperature, start date, product type, special handling..." }
  ];

  let step = 0;
  const answers = {};

  const launcher = document.createElement("button");
  launcher.className = "lead-chat__launcher";
  launcher.type = "button";
  launcher.setAttribute("aria-label", "Open storage quote assistant");
  launcher.title = "Storage quote assistant";
  launcher.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12a7.5 7.5 0 0 1-7.5 7.5H8l-5 3 1.6-5.2A7.5 7.5 0 1 1 21 12Z"/>
      <path d="M8 11h8M8 14h5"/>
    </svg>
  `;

  const widget = document.createElement("aside");
  widget.className = "lead-chat";
  widget.hidden = true;
  widget.setAttribute("aria-live", "polite");
  widget.innerHTML = `
    <div class="lead-chat__panel">
      <div class="lead-chat__head">
        <div><strong>Storage Quote Assistant</strong><span>Share details for a faster warehouse quote</span></div>
        <button class="lead-chat__close" type="button" aria-label="Close chat">&times;</button>
      </div>
      <form class="lead-chat__body">
        <div class="lead-chat__bubble"></div>
        <div class="lead-chat__slot"></div>
        <div class="lead-chat__status"></div>
        <div class="lead-chat__actions">
          <button class="lead-chat__btn secondary" type="button" data-back>Back</button>
          <button class="lead-chat__btn" type="submit" data-next>Next</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(launcher);
  document.body.appendChild(widget);

  const form = widget.querySelector("form");
  const bubble = widget.querySelector(".lead-chat__bubble");
  const slot = widget.querySelector(".lead-chat__slot");
  const status = widget.querySelector(".lead-chat__status");
  const backBtn = widget.querySelector("[data-back]");
  const nextBtn = widget.querySelector("[data-next]");

  function openWidget() {
    widget.hidden = false;
    launcher.hidden = true;
    renderStep();
  }

  function closeWidget() {
    widget.hidden = true;
    launcher.hidden = false;
  }

  function renderStep() {
    const q = questions[step];
    status.textContent = "";
    backBtn.hidden = step === 0;
    nextBtn.textContent = step === questions.length - 1 ? "Send request" : "Next";
    bubble.textContent = step === 0
      ? "Hi. What warehouse storage do you need?"
      : "Thanks. This detail helps us match the right storage option.";

    const value = answers[q.name] || "";
    let field = "";
    if (q.type === "select") {
      field = `<select name="${q.name}" ${q.required ? "required" : ""}>
        <option value="">Select an option</option>
        ${q.options.map((option) => `<option value="${option}" ${option === value ? "selected" : ""}>${option}</option>`).join("")}
      </select>`;
    } else if (q.type === "textarea") {
      field = `<textarea name="${q.name}" placeholder="${q.placeholder || ""}">${value}</textarea>`;
    } else {
      field = `<input name="${q.name}" type="${q.type}" value="${value}" placeholder="${q.placeholder || ""}" ${q.required ? "required" : ""}>`;
    }

    slot.innerHTML = `<div class="lead-chat__field"><label>${q.label}</label>${field}</div>`;
    const input = slot.querySelector("[name]");
    if (input) input.focus({ preventScroll: true });
  }

  function persistLead(payload) {
    const stored = JSON.parse(localStorage.getItem("anmarChatbotLeads") || "[]");
    stored.push(payload);
    localStorage.setItem("anmarChatbotLeads", JSON.stringify(stored.slice(-25)));
  }

  async function submitLead() {
    const payload = {
      ...answers,
      page: window.location.href,
      source: "Anmar website chatbot",
      submittedAt: new Date().toISOString()
    };

    persistLead(payload);

    if (endpoint) {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
    }

    const summary = encodeURIComponent(
      `New storage request from ${payload.name || "website visitor"}%0A` +
      `Phone: ${payload.phone || ""}%0ACompany: ${payload.company || ""}%0A` +
      `Storage: ${payload.storage || ""}%0ACity: ${payload.city || ""}%0A` +
      `Volume: ${payload.volume || ""}%0AMessage: ${payload.message || ""}`
    );

    slot.innerHTML = `<div class="lead-chat__bubble">Thanks. Your request is saved and our team will review it shortly.</div>
      <a class="lead-chat__btn" href="https://wa.me/${whatsapp}?text=${summary}" target="_blank" rel="noopener">Continue on WhatsApp</a>`;
    bubble.textContent = "Request received.";
    status.textContent = endpoint ? "Lead sent to the connected sheet/email workflow." : "Webhook is not connected yet; lead is saved in browser storage.";
    backBtn.hidden = true;
    nextBtn.textContent = "Close";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (step >= questions.length) {
      closeWidget();
      return;
    }

    const input = slot.querySelector("[name]");
    if (input && !input.reportValidity()) return;
    if (input) answers[input.name] = input.value.trim();

    if (step < questions.length - 1) {
      step += 1;
      renderStep();
      return;
    }

    step += 1;
    nextBtn.disabled = true;
    status.textContent = "Sending request...";
    try {
      await submitLead();
    } catch (error) {
      status.textContent = "Saved locally. Please use WhatsApp so the team receives it immediately.";
    } finally {
      nextBtn.disabled = false;
    }
  });

  backBtn.addEventListener("click", () => {
    if (step > 0) {
      step -= 1;
      renderStep();
    }
  });

  widget.querySelector(".lead-chat__close").addEventListener("click", closeWidget);
  launcher.addEventListener("click", openWidget);
  window.setTimeout(openWidget, 5000);
})();
