// Única fuente de verdad para el checkout de esta landing.
// Antes de publicar la campaña, reemplazá solamente esta URL por la oferta de USD 11,90.
const CHECKOUT_URL = "https://go.hotmart.com/L106304893W";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-checkout-link]").forEach(function (link) {
    link.setAttribute("href", CHECKOUT_URL);
  });
});
