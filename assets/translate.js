(function () {
  const COOKIE_NAME = "googtrans";
  const EN_VALUE = "/en/en";
  const AR_VALUE = "/en/ar";

  function setTranslateCookie(value) {
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `${COOKIE_NAME}=${value};path=/;max-age=${maxAge}`;

    const host = window.location.hostname;
    if (host && host.includes(".")) {
      document.cookie = `${COOKIE_NAME}=${value};domain=.${host};path=/;max-age=${maxAge}`;
    }
  }

  function clearTranslateCookie() {
    document.cookie = `${COOKIE_NAME}=;path=/;max-age=0`;

    const host = window.location.hostname;
    if (host && host.includes(".")) {
      document.cookie = `${COOKIE_NAME}=;domain=.${host};path=/;max-age=0`;
    }
  }

  function activeLanguage() {
    const cookie = decodeURIComponent(document.cookie || "");
    return cookie.includes(`${COOKIE_NAME}=${AR_VALUE}`) ? "ar" : "en";
  }

  function syncControls(language) {
    document.documentElement.lang = language === "ar" ? "ar" : "en";
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-translate]").forEach((button) => {
      const isActive = button.dataset.translate === language;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  window.anmarTranslateInit = function () {
    if (!window.google || !window.google.translate) return;

    new window.google.translate.TranslateElement({
      pageLanguage: "en",
      includedLanguages: "en,ar",
      autoDisplay: false
    }, "anmar_translate_element");
  };

  function loadGoogleTranslate() {
    if (document.getElementById("anmar_translate_element")) return;

    const mount = document.createElement("div");
    mount.id = "anmar_translate_element";
    mount.setAttribute("aria-hidden", "true");
    document.body.appendChild(mount);

    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=anmarTranslateInit";
    script.async = true;
    document.body.appendChild(script);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const language = activeLanguage();
    syncControls(language);
    loadGoogleTranslate();

    document.querySelectorAll("[data-translate]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextLanguage = button.dataset.translate;
        if (nextLanguage === activeLanguage()) return;

        if (nextLanguage === "ar") {
          setTranslateCookie(AR_VALUE);
          localStorage.setItem("anmarLanguage", "ar");
        } else {
          clearTranslateCookie();
          setTranslateCookie(EN_VALUE);
          localStorage.setItem("anmarLanguage", "en");
        }

        window.location.reload();
      });
    });
  });
})();
