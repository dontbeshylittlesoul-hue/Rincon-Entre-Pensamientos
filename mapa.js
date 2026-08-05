document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("mapaModalLanding");
  if (!modal) return;

  const openButtons = document.querySelectorAll("[data-open-map]");
  const closeButtons = modal.querySelectorAll("[data-close-map]");
  let previousOverflow = "";

  function openMap() {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal.classList.add("activo");
    modal.setAttribute("aria-hidden", "false");

    if (typeof gtag === "function") {
      gtag("event", "click_ver_mapa", {
        event_category: "landing_github",
        page_location: window.location.href
      });
    }
  }

  function closeMap() {
    modal.classList.remove("activo");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = previousOverflow;
  }

  openButtons.forEach(function (button) {
    button.addEventListener("click", openMap);
  });

  closeButtons.forEach(function (button) {
    button.addEventListener("click", closeMap);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("activo")) {
      closeMap();
    }
  });
});
