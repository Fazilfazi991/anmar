(function () {
  const config = window.ANMAR_CHATBOT_CONFIG || {};
  const endpoint = (config.endpoint || "").trim();
  const whatsapp = config.whatsapp || "966598626402";

  const questions = [
    { name: "storage", label: "Storage need", type: "select", options: ["Medical storage", "Food storage", "Cosmetics storage", "Cold storage", "Dry storage", "3PL support"], required: true },
    { name: "city", label: "Preferred city", type: "select", options: ["Riyadh", "Jeddah", "Dammam", "Not sure yet"], required: true },
    { name: "volume", label: "Capacity needed", type: "text", placeholder: "Pallets, sqm, cartons, or monthly volume" },
    { name: "message", label: "Anything important?", type: "textarea", placeholder: "Temperature, start date, product type, special handling..." },
    { name: "name", label: "Your name", type: "text", placeholder: "Full name", required: true },
    { name: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+966 ...", required: true },
    { name: "company", label: "Company", type: "text", placeholder: "Company name" }
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
        <div><strong>Free Operation Offer</strong><span>Share details to check storage offer eligibility</span></div>
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
    bubble.classList.remove("is-success");
    status.textContent = "";
    backBtn.hidden = step === 0;
    nextBtn.textContent = step === questions.length - 1 ? "Send request" : "Next";
    if (step === 0) {
      bubble.textContent = "Hi. Tell us your storage requirement first so we can check the free operation offer.";
    } else if (["name", "phone", "company"].includes(q.name)) {
      bubble.textContent = "Great. Now share your contact details so our team can follow up with the best option.";
    } else {
      bubble.textContent = "Thanks. This helps us match the right storage option and offer eligibility.";
    }

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
      source: "Anmar website chatbot - free operation offer",
      submittedAt: new Date().toISOString()
    };

    persistLead(payload);

    if (endpoint) {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload)
      });
    }

    const messageParts = [
      `Hi Anmar Logistics team, my name is ${payload.name || "a website visitor"}.`,
      `I have a requirement for ${payload.storage || "warehouse storage"}${payload.city ? ` in ${payload.city}` : ""}.`,
      payload.company ? `My company name is ${payload.company}.` : "",
      payload.volume ? `The required capacity or volume is ${payload.volume}.` : "",
      payload.message ? `Additional details: ${payload.message}.` : "",
      payload.phone ? `Please contact me on ${payload.phone}.` : "Please contact me with more details."
    ].filter(Boolean);
    const summary = encodeURIComponent(messageParts.join(" "));

    slot.innerHTML = `<div class="lead-chat__success">
      <strong>Thanks, request received.</strong>
      <p>Our operations team will review your storage details and follow up shortly.</p>
      <a class="lead-chat__btn" href="https://wa.me/${whatsapp}?text=${summary}" target="_blank" rel="noopener">Continue on WhatsApp</a>
    </div>`;
    bubble.textContent = "Request received.";
    bubble.classList.add("is-success");
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
  window.setTimeout(openWidget, 10000);
})();
