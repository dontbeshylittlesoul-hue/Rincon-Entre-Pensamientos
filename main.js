document.addEventListener("DOMContentLoaded", function () {
  /* Animaciones al aparecer */

  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  reveals.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* Visor de páginas del ebook */

  const libroDemo = document.getElementById("libroDemo");

  if (libroDemo) {
    const paginas = libroDemo.querySelectorAll(".libro-pagina");
    const btnPrev = libroDemo.querySelector(".libro-prev");
    const btnNext = libroDemo.querySelector(".libro-next");
    const contador = document.getElementById("contadorLibro");

    let paginaActual = 0;

    function mostrarPagina(index) {
      if (!paginas.length) return;

      paginaActual = index;

      if (paginaActual < 0) {
        paginaActual = paginas.length - 1;
      }

      if (paginaActual >= paginas.length) {
        paginaActual = 0;
      }

      paginas.forEach(function (pagina, i) {
        pagina.classList.toggle("activa", i === paginaActual);
      });

      if (contador) {
        contador.textContent = "Página " + (paginaActual + 1) + " de " + paginas.length;
      }
    }

    if (btnPrev) {
      btnPrev.addEventListener("click", function () {
        mostrarPagina(paginaActual - 1);
      });
    }

    if (btnNext) {
      btnNext.addEventListener("click", function () {
        mostrarPagina(paginaActual + 1);
      });
    }

    const marco = libroDemo.querySelector(".libro-marco");

    if (marco) {
      marco.addEventListener("click", function () {
        mostrarPagina(paginaActual + 1);
      });
    }

    mostrarPagina(0);
  }

  /* Ambiente sonoro */

  const audioAmbiente = document.getElementById("audioAmbiente");
  const ambienteToggle = document.getElementById("ambienteToggle");
  const entrarMuestra = document.getElementById("entrarMuestra");

  if (audioAmbiente && ambienteToggle) {
    audioAmbiente.volume = 0.22;

    function activarAmbiente() {
      audioAmbiente.play()
        .then(function () {
          ambienteToggle.classList.add("activo");
          ambienteToggle.textContent = "☔ Pausar lluvia";
        })
        .catch(function (error) {
          console.log("No se pudo reproducir el ambiente:", error);
        });
    }

    function pausarAmbiente() {
      audioAmbiente.pause();
      ambienteToggle.classList.remove("activo");
      ambienteToggle.textContent = "☔ Activar lluvia";
    }

    ambienteToggle.addEventListener("click", function () {
      if (audioAmbiente.paused) {
        activarAmbiente();
      } else {
        pausarAmbiente();
      }
    });

    if (entrarMuestra) {
      entrarMuestra.addEventListener("click", function () {
        if (audioAmbiente.paused) {
          activarAmbiente();
        }
      });
    }
  }
});
