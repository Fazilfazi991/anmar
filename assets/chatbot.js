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
  launcher.textContent = "Storage Assistant";

  const widget = document.createElement("aside");
  widget.className = "lead-chat";
  widget.hidden = true;
  widget.setAttribute("aria-live", "polite");
  widget.innerHTML = `
    <div class="lead-chat__panel">
      <div class="lead-chat__head">
        <div><strong>Anmar Storage Assistant</strong><span>Quick quote details in under a minute</span></div>
        <button class="lead-chat__close" type="button" aria-label="Close chat">×</button>
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
      ? "Hi, what storage requirement can we help you with today?"
      : "Great. Please share this detail so our team can quote accurately.";

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
