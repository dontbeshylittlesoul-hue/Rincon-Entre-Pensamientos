/* ── main.js ────────────────────────────────────────────────────── */

// Scroll reveal: Intersection Observer
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

// ── Custom Audio Player ──────────────────────────────────────────
const audio = document.getElementById('audioAmbiente');
const playBtn = document.getElementById('playPauseBtn');
const progressFill = document.getElementById('progressFill');
const progressWrap = document.getElementById('progressWrap');
const volSlider = document.getElementById('volumen');

if (audio && playBtn && progressFill && progressWrap && volSlider) {
  const iconPlay = playBtn.querySelector('.icon-play');
  const iconPause = playBtn.querySelector('.icon-pause');

  audio.volume = parseFloat(volSlider.value);

  function setPlaying(playing) {
    if (!iconPlay || !iconPause) return;

    if (playing) {
      iconPlay.classList.add('hidden');
      iconPause.classList.remove('hidden');
    } else {
      iconPause.classList.add('hidden');
      iconPlay.classList.remove('hidden');
    }
  }

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  });

  audio.addEventListener('pause', () => setPlaying(false));
  audio.addEventListener('play', () => setPlaying(true));

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = pct + '%';
  });

  progressWrap.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = progressWrap.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
  });

  progressWrap.addEventListener('keydown', (e) => {
    if (!audio.duration) return;
    if (e.key === 'ArrowRight') audio.currentTime = Math.min(audio.currentTime + 5, audio.duration);
    if (e.key === 'ArrowLeft') audio.currentTime = Math.max(audio.currentTime - 5, 0);
  });

  volSlider.addEventListener('input', () => {
    audio.volume = parseFloat(volSlider.value);
  });
}
