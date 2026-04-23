/**
 * STOPWATCH — TASK 02
 * Fully functional: Start/Pause/Reset, Lap times, Stats
 */

// ── State ────────────────────────────────────────────────
let startTime    = 0;
let elapsedTime  = 0;
let lapStartTime = 0;
let timerID      = null;
let isRunning    = false;
let laps         = [];

// ── DOM Refs ─────────────────────────────────────────────
const timeHH      = document.getElementById('timeHH');
const timeMM      = document.getElementById('timeMM');
const timeSS      = document.getElementById('timeSS');
const timeMS      = document.getElementById('timeMS');
const statusLabel = document.getElementById('statusLabel');
const btnStart    = document.getElementById('btnStart');
const btnLap      = document.getElementById('btnLap');
const btnReset    = document.getElementById('btnReset');
const startIcon   = document.getElementById('startIcon');
const startLabel  = document.getElementById('startLabel');
const lapList     = document.getElementById('lapList');
const lapHeader   = document.getElementById('lapHeader');
const lapContainer= document.getElementById('lapContainer');
const statsBar    = document.getElementById('statsBar');
const statLaps    = document.getElementById('statLaps');
const statBest    = document.getElementById('statBest');
const statAvg     = document.getElementById('statAvg');
const ringProgress= document.getElementById('ringProgress');
const particles   = document.getElementById('particles');

// Ring circumference = 2π × 135 ≈ 848.23
const RING_CIRC = 2 * Math.PI * 135;

// ── Particle Init ────────────────────────────────────────
(function initParticles() {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      --dur: ${5 + Math.random() * 10}s;
      --delay: ${-Math.random() * 15}s;
      width: ${1 + Math.random() * 2}px;
      height: ${1 + Math.random() * 2}px;
      background: ${Math.random() > .5 ? 'var(--cyan)' : '#a78bfa'};
    `;
    particles.appendChild(p);
  }
})();

// ── SVG Tick Marks ───────────────────────────────────────
(function drawTicks() {
  const g = document.getElementById('tickMarks');
  for (let i = 0; i < 60; i++) {
    const angle = (i / 60) * 2 * Math.PI - Math.PI / 2;
    const isMajor = i % 5 === 0;
    const inner = isMajor ? 118 : 122;
    const outer = 135;
    const x1 = 150 + inner * Math.cos(angle);
    const y1 = 150 + inner * Math.sin(angle);
    const x2 = 150 + outer * Math.cos(angle);
    const y2 = 150 + outer * Math.sin(angle);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    line.setAttribute('stroke', isMajor ? 'rgba(0,229,255,0.4)' : 'rgba(0,229,255,0.12)');
    line.setAttribute('stroke-width', isMajor ? '2' : '1');
    g.appendChild(line);
  }
})();

// ── Format Helpers ───────────────────────────────────────
function pad(n, digits = 2) {
  return String(Math.floor(n)).padStart(digits, '0');
}

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const hh = Math.floor(totalSec / 3600);
  const mm = Math.floor((totalSec % 3600) / 60);
  const ss = totalSec % 60;
  const millis = ms % 1000;
  return { hh, mm, ss, millis };
}

function formatDisplay(ms) {
  const { hh, mm, ss, millis } = formatTime(ms);
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}.${pad(millis, 3)}`;
}

function formatShort(ms) {
  const { hh, mm, ss, millis } = formatTime(ms);
  if (hh > 0) return `${pad(hh)}:${pad(mm)}:${pad(ss)}.${pad(millis, 3)}`;
  return `${pad(mm)}:${pad(ss)}.${pad(millis, 3)}`;
}

// ── Update Display ───────────────────────────────────────
function updateDisplay(ms) {
  const { hh, mm, ss, millis } = formatTime(ms);

  timeHH.textContent = pad(hh);
  timeMM.textContent = pad(mm);
  timeSS.textContent = pad(ss);
  timeMS.textContent = `.${pad(millis, 3)}`;

  // Ring: seconds progress in 60-sec cycle
  const secFraction = (ss + millis / 1000) / 60;
  const offset = RING_CIRC * (1 - secFraction);
  ringProgress.style.strokeDashoffset = offset;

  // Color shift at 30s+
  if (ss >= 45) {
    ringProgress.style.stroke = 'var(--red)';
    ringProgress.style.filter = 'drop-shadow(0 0 8px rgba(255,56,96,.6))';
  } else if (ss >= 30) {
    ringProgress.style.stroke = 'var(--gold)';
    ringProgress.style.filter = 'drop-shadow(0 0 8px rgba(255,215,0,.5))';
  } else {
    ringProgress.style.stroke = 'var(--cyan)';
    ringProgress.style.filter = 'drop-shadow(0 0 8px var(--cyan-glow))';
  }
}

// ── Timer Loop ───────────────────────────────────────────
function tick() {
  elapsedTime = Date.now() - startTime;
  updateDisplay(elapsedTime);
}

// ── Start / Pause ────────────────────────────────────────
function startPause() {
  if (!isRunning) {
    // Start
    startTime = Date.now() - elapsedTime;
    if (laps.length === 0) lapStartTime = startTime;
    timerID = setInterval(tick, 10);
    isRunning = true;

    startIcon.textContent  = '⏸';
    startLabel.textContent = 'PAUSE';
    btnStart.classList.add('running');
    statusLabel.textContent = 'RUNNING';
    statusLabel.className   = 'status-label running';

    btnLap.disabled   = false;
    btnReset.disabled = false;

    // Blink sep stop when running
    document.querySelectorAll('.time-sep').forEach(s => s.style.animationPlayState = 'paused');

  } else {
    // Pause
    clearInterval(timerID);
    isRunning = false;
    elapsedTime = Date.now() - startTime;

    startIcon.textContent  = '▶';
    startLabel.textContent = 'RESUME';
    btnStart.classList.remove('running');
    statusLabel.textContent = 'PAUSED';
    statusLabel.className   = 'status-label paused';

    document.querySelectorAll('.time-sep').forEach(s => s.style.animationPlayState = 'running');
  }

  addRipple(btnStart);
}

// ── Lap ──────────────────────────────────────────────────
function recordLap() {
  if (!isRunning) return;

  const now      = Date.now();
  const total    = now - startTime + (startTime - (laps.length === 0 ? startTime : 0));
  const split    = now - lapStartTime;
  lapStartTime   = now;

  const totalMs  = elapsedTime;
  const splitMs  = laps.length === 0
    ? elapsedTime
    : elapsedTime - laps.reduce((a, l) => a + l.splitMs, 0);

  laps.unshift({ num: laps.length + 1, splitMs, totalMs });

  // Fix unshift ordering
  laps = laps.map((l, i) => ({ ...l, num: laps.length - i }));

  renderLaps();
  updateStats();
  addRipple(btnLap);
}

// ── Reset ────────────────────────────────────────────────
function reset() {
  clearInterval(timerID);
  isRunning    = false;
  elapsedTime  = 0;
  startTime    = 0;
  lapStartTime = 0;
  laps         = [];

  updateDisplay(0);

  startIcon.textContent  = '▶';
  startLabel.textContent = 'START';
  btnStart.classList.remove('running');
  statusLabel.textContent = 'READY';
  statusLabel.className   = 'status-label';

  btnLap.disabled   = true;
  btnReset.disabled = true;

  lapList.innerHTML  = '';
  lapHeader.style.display  = 'none';
  statsBar.style.display   = 'none';

  ringProgress.style.strokeDashoffset = RING_CIRC;
  ringProgress.style.stroke = 'var(--cyan)';

  document.querySelectorAll('.time-sep').forEach(s => s.style.animationPlayState = 'running');
  addRipple(btnReset);
}

// ── Render Laps ──────────────────────────────────────────
function renderLaps() {
  lapHeader.style.display = 'grid';
  statsBar.style.display  = 'flex';

  // Find best and worst
  const splits   = laps.map(l => l.splitMs);
  const bestMs   = Math.min(...splits);
  const worstMs  = Math.max(...splits);

  lapList.innerHTML = '';

  laps.forEach((lap, i) => {
    const li = document.createElement('li');
    li.className = 'lap-item';
    if (laps.length > 1) {
      if (lap.splitMs === bestMs)  li.classList.add('best');
      if (lap.splitMs === worstMs) li.classList.add('worst');
    }
    li.style.animationDelay = `${i * 0.03}s`;

    li.innerHTML = `
      <span class="lap-num">LAP ${pad(lap.num)}</span>
      <span class="lap-split">${formatShort(lap.splitMs)}</span>
      <span class="lap-total">${formatShort(lap.totalMs)}</span>
    `;
    lapList.appendChild(li);
  });
}

// ── Stats ────────────────────────────────────────────────
function updateStats() {
  const count  = laps.length;
  const splits = laps.map(l => l.splitMs);
  const best   = Math.min(...splits);
  const avg    = splits.reduce((a,b) => a+b, 0) / count;

  statLaps.textContent = count;
  statBest.textContent = formatShort(best);
  statAvg.textContent  = formatShort(avg);
}

// ── Ripple ───────────────────────────────────────────────
function addRipple(btn) {
  const r = document.createElement('span');
  r.className = 'ripple';
  r.style.width = r.style.height = btn.offsetWidth + 'px';
  r.style.left = '0';
  r.style.top  = '0';
  btn.appendChild(r);
  setTimeout(() => r.remove(), 500);
}

// ── Event Listeners ──────────────────────────────────────
btnStart.addEventListener('click', startPause);
btnLap.addEventListener('click',   recordLap);
btnReset.addEventListener('click', reset);

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.code === 'Space') { e.preventDefault(); startPause(); }
  if (e.code === 'KeyL')  recordLap();
  if (e.code === 'KeyR')  reset();
});

// ── Init ─────────────────────────────────────────────────
updateDisplay(0);
console.log('%cSTOPWATCH READY', 'color:#00e5ff;font-family:monospace;font-size:1.2rem;font-weight:bold;');
console.log('%cKeyboard: [Space] Start/Pause  [L] Lap  [R] Reset', 'color:#888;font-family:monospace;');