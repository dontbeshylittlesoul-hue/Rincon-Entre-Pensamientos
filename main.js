document.addEventListener("DOMContentLoaded", function () {
  /* ==============================
     ANIMACIÓN REVEAL
     ============================== */

  const revealElements = document.querySelectorAll(".reveal");

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
      threshold: 0.12,
    }
  );

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });

  /* ==============================
     AUDIO AMBIENTE
     ============================== */

  const audioAmbiente = document.getElementById("audioAmbiente");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const volumen = document.getElementById("volumen");
  const progressWrap = document.getElementById("progressWrap");
  const progressFill = document.getElementById("progressFill");
  const iconPlay = document.querySelector(".icon-play");
  const iconPause = document.querySelector(".icon-pause");

  if (audioAmbiente && playPauseBtn) {
    audioAmbiente.volume = volumen ? parseFloat(volumen.value) : 0.7;

    playPauseBtn.addEventListener("click", function () {
      if (audioAmbiente.paused) {
        audioAmbiente.play().then(function () {
          if (iconPlay) iconPlay.classList.add("hidden");
          if (iconPause) iconPause.classList.remove("hidden");
        }).catch(function (error) {
          console.log("Error al reproducir audio:", error);
        });
      } else {
        audioAmbiente.pause();
        if (iconPlay) iconPlay.classList.remove("hidden");
        if (iconPause) iconPause.classList.add("hidden");
      }
    });

    if (volumen) {
      volumen.addEventListener("input", function () {
        audioAmbiente.volume = parseFloat(volumen.value);
      });
    }

    audioAmbiente.addEventListener("timeupdate", function () {
      if (!progressFill || !audioAmbiente.duration) return;

      const progreso = (audioAmbiente.currentTime / audioAmbiente.duration) * 100;
      progressFill.style.width = progreso + "%";
    });

    if (progressWrap) {
      progressWrap.addEventListener("click", function (event) {
        if (!audioAmbiente.duration) return;

        const rect = progressWrap.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const porcentaje = clickX / rect.width;

        audioAmbiente.currentTime = porcentaje * audioAmbiente.duration;
      });
    }
  }

  /* ==============================
     VISOR EBOOK INTERACTIVO
     ============================== */

  const libroDemo = document.getElementById("libroDemo");
  const paginasLibro = document.querySelectorAll(".libro-pagina");
  const btnPrev = document.querySelector(".libro-prev");
  const btnNext = document.querySelector(".libro-next");
  const contadorLibro = document.getElementById("contadorLibro");

  if (!libroDemo || paginasLibro.length === 0) {
    return;
  }

  let paginaActual = 0;

  function mostrarPagina(nuevaPagina, direccion) {
    paginasLibro.forEach(function (pagina, index) {
      pagina.classList.remove(
        "activa",
        "sale-izquierda",
        "sale-derecha",
        "entra-derecha",
        "entra-izquierda"
      );

      if (index === nuevaPagina) {
        pagina.classList.add("activa");

        if (direccion === "siguiente") {
          pagina.classList.add("entra-derecha");
        }

        if (direccion === "anterior") {
          pagina.classList.add("entra-izquierda");
        }
      }
    });

    paginaActual = nuevaPagina;

    if (contadorLibro) {
      contadorLibro.textContent = "Página " + (paginaActual + 1) + " de " + paginasLibro.length;
    }

    if (btnPrev) {
      btnPrev.disabled = paginaActual === 0;
    }

    if (btnNext) {
      btnNext.disabled = paginaActual === paginasLibro.length - 1;
    }
  }

  function paginaSiguiente() {
    if (paginaActual >= paginasLibro.length - 1) return;

    paginasLibro[paginaActual].classList.add("sale-izquierda");

    setTimeout(function () {
      mostrarPagina(paginaActual + 1, "siguiente");
    }, 220);
  }

  function paginaAnterior() {
    if (paginaActual <= 0) return;

    paginasLibro[paginaActual].classList.add("sale-derecha");

    setTimeout(function () {
      mostrarPagina(paginaActual - 1, "anterior");
    }, 220);
  }

  if (btnNext) {
    btnNext.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      paginaSiguiente();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      paginaAnterior();
    });
  }

  const marcoLibro = document.querySelector(".libro-marco");

  if (marcoLibro) {
    marcoLibro.addEventListener("click", function () {
      paginaSiguiente();
    });
  }

  mostrarPagina(0);
});
// Ambiente sonoro de la landing

document.addEventListener("DOMContentLoaded", function () {
  const audioAmbiente = document.getElementById("audioAmbiente");
  const ambienteToggle = document.getElementById("ambienteToggle");
  const entrarMuestra = document.getElementById("entrarMuestra");

  if (!audioAmbiente || !ambienteToggle) return;

  audioAmbiente.volume = 0.28;

  function activarAmbiente() {
    audioAmbiente.play()
      .then(function () {
        ambienteToggle.classList.add("activo");
        ambienteToggle.querySelector(".ambiente-texto").textContent = "Pausar ambiente";
      })
      .catch(function (error) {
        console.log("No se pudo reproducir el ambiente:", error);
      });
  }

  function pausarAmbiente() {
    audioAmbiente.pause();
    ambienteToggle.classList.remove("activo");
    ambienteToggle.querySelector(".ambiente-texto").textContent = "Activar ambiente";
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
});
