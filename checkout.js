(function () {
  "use strict";

  /*
    Enlace único del checkout de Hotmart de USD 11,90.
  */
  const CHECKOUT_URL =
    "https://pay.hotmart.com/L106304893W?off=v8kc4xyl";

  /*
    Parámetros que deben viajar desde la landing hasta Hotmart.
  */
  const TRACKING_PARAMS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "gclid",
    "gbraid",
    "wbraid",
    "sck",
    "src"
  ];

  function buildCheckoutUrl() {
    const checkoutUrl = new URL(CHECKOUT_URL);
    const currentParams = new URLSearchParams(window.location.search);

    TRACKING_PARAMS.forEach(function (param) {
      const value = currentParams.get(param);

      if (value) {
        checkoutUrl.searchParams.set(param, value);
      }
    });

    return checkoutUrl.toString();
  }

  const checkoutLinks = document.querySelectorAll(
    "[data-checkout-link]"
  );

  checkoutLinks.forEach(function (link) {
    link.href = buildCheckoutUrl();

    link.addEventListener("click", function () {
      link.href = buildCheckoutUrl();
    });
  });
})();
