/* ── main.js ────────────────────────────────────────────────────── */

// Scroll reveal: Intersection Observer
const revealEls = document.querySelectorAll('.reveal');

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

// ── Custom Audio Player ──────────────────────────────────────────
const audio       = document.getElementById('audioAmbiente');
const playBtn     = document.getElementById('playPauseBtn');
const iconPlay    = playBtn.querySelector('.icon-play');
const iconPause   = playBtn.querySelector('.icon-pause');
const progressFill = document.getElementById('progressFill');
const progressWrap = document.getElementById('progressWrap');
const volSlider   = document.getElementById('volumen');

// Set initial volume
audio.volume = parseFloat(volSlider.value);

function setPlaying(playing) {
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
    audio.play().catch(() => {});
    setPlaying(true);
  } else {
    audio.pause();
    setPlaying(false);
  }
});

audio.addEventListener('pause', () => setPlaying(false));
audio.addEventListener('play',  () => setPlaying(true));

// Progress bar
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = pct + '%';
});

// Seek on click
progressWrap.addEventListener('click', (e) => {
  if (!audio.duration) return;
  const rect = progressWrap.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  audio.currentTime = ratio * audio.duration;
});

// Keyboard seek
progressWrap.addEventListener('keydown', (e) => {
  if (!audio.duration) return;
  if (e.key === 'ArrowRight') audio.currentTime = Math.min(audio.currentTime + 5, audio.duration);
  if (e.key === 'ArrowLeft')  audio.currentTime = Math.max(audio.currentTime - 5, 0);
});

// Volume
volSlider.addEventListener('input', () => {
  audio.volume = parseFloat(volSlider.value);
});
