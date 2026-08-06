(function () {
  "use strict";

  /*
    PEGÁ ACÁ EL ENLACE DEL CHECKOUT DE HOTMART DE USD 11,90.
    Es el único lugar que tenés que modificar.
  */
  const CHECKOUT_URL = "PEGAR_AQUI_EL_ENLACE_HOTMART_USD_11_90";

  const checkoutLinks = document.querySelectorAll("[data-checkout-link]");
  const urlConfigurada = /^https?:\/\//i.test(CHECKOUT_URL);

  checkoutLinks.forEach(function (link) {
    if (urlConfigurada) {
      link.href = CHECKOUT_URL;
      return;
    }

    link.href = "#";
    link.addEventListener("click", function (event) {
      event.preventDefault();
      console.error(
        "Falta configurar CHECKOUT_URL en checkout.js con el enlace de Hotmart de USD 11,90."
      );
    });
  });
})();
