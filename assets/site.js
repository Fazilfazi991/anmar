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
  const updateFloatingWa = () => {
    floatingWa.classList.toggle("visible", window.scrollY > 520);
  };

  updateFloatingWa();
  window.addEventListener("scroll", updateFloatingWa, { passive: true });
}
