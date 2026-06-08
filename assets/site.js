const menuButton = document.querySelector(".menu-btn");
const mobilePanel = document.querySelector(".mobile-panel");

if (menuButton && mobilePanel) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobilePanel.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mobilePanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobilePanel.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const floatingWa = document.querySelector(".floating-wa");

if (floatingWa) {
  floatingWa.classList.add("visible");
}

const revealTargets = document.querySelectorAll(
  ".section > .container, .card, .feature, .proof-cell, .step-card, .check-item, .dark-panel, .faq-section details, .cta"
);

if (revealTargets.length) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  revealTargets.forEach((target, index) => {
    target.classList.add("reveal-on-scroll", `reveal-delay-${index % 4}`);
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -60px 0px" });

    revealTargets.forEach((target) => revealObserver.observe(target));
  }
}

document.querySelectorAll("[data-lead-form]").forEach((form) => {
  const status = form.querySelector("[data-lead-status]");
  const config = window.ANMAR_CHATBOT_CONFIG || {};
  const endpoint = (config.endpoint || "").trim();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form).entries());
    const payload = {
      ...data,
      page: window.location.href,
      source: "Anmar website contact form - free operation offer",
      submittedAt: new Date().toISOString()
    };

    const stored = JSON.parse(localStorage.getItem("anmarFormLeads") || "[]");
    stored.push(payload);
    localStorage.setItem("anmarFormLeads", JSON.stringify(stored.slice(-25)));

    if (status) status.textContent = "Sending your request...";

    try {
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(payload)
        });
        if (status) status.textContent = "Request sent. Our operations team will contact you shortly.";
        form.reset();
      } else if (status) {
        status.textContent = "Request saved locally. Connect the sheet/email endpoint to send it to operations@almrebid.sa.";
      }
    } catch (error) {
      if (status) status.textContent = "Request saved locally. Please WhatsApp or call if urgent.";
    }
  });
});
