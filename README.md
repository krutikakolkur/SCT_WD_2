# Stopwatch — Precision Time Tracking

A feature-rich, visually immersive stopwatch application built with vanilla HTML, CSS, and JavaScript. Built as **Task 02** of the SkillCraft Technology Web Development Internship, this project goes beyond a basic timer — featuring an animated SVG ring clock, lap tracking with split times, live stats, and a futuristic UI with particle effects.

---

## Features

### Core Stopwatch
- **Start / Pause / Resume** — Full playback control with a single toggle button
- **Reset** — Resets the timer and clears all laps back to the initial state
- **Millisecond precision** — Displays time as `HH:MM:SS.mmm`
- **Live status label** — Shows READY, RUNNING, or PAUSED dynamically

### Lap Tracking
- **Lap recording** — Capture split times at any point while the stopwatch is running
- **Lap list** — Scrollable list showing each lap's number, split time, and cumulative total time
- **Stats bar** — Displays total laps recorded, best (fastest) lap, and average lap time

### Animated SVG Ring Clock
- A circular progress ring that sweeps around as time elapses
- Tick marks rendered dynamically around the ring face
- Colour-coded ring transitions for visual timing feedback

### Visual Design
- Animated grid background with three layered gradient glows
- Particle canvas effect for a dynamic atmosphere
- Google Fonts: **Orbitron** (display/numerals) + **Share Tech Mono** (monospace details)
- Fully dark-themed, futuristic aesthetic

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | App structure and SVG ring markup |
| CSS3 | Dark theme, animations, glow effects, layout |
| JavaScript (ES6+) | Timer logic, lap tracking, stats calculation, DOM updates |
| SVG | Animated circular progress ring with tick marks |
| Google Fonts | Orbitron & Share Tech Mono typefaces |

---

## Project Structure

```
SCT_WD_2/
├── index.html    # App layout — header, SVG ring, controls, stats bar, lap list
├── style.css     # All styles — dark theme, ring, particles, glow, responsive layout
└── script.js     # Timer engine — start/pause/reset, lap recording, stats, ring animation
```

---

## UI Sections

| Element | Description |
|---|---|
| **Header** | Task badge, title, and subtitle |
| **SVG Ring** | Animated circular clock face with progress arc and tick marks |
| **Time Display** | `HH:MM:SS.mmm` centred inside the ring with a live status label |
| **Controls** | LAP, START/PAUSE, and RESET buttons |
| **Stats Bar** | Shows total laps, best lap time, and average lap time (appears after first lap) |
| **Lap List** | Scrollable table with lap number, split time, and running total |

---

## Getting Started

No build tools or dependencies required. Just open in a browser:

```bash
# Clone the repository
git clone https://github.com/krutikakolkur/SCT_WD_2.git

# Navigate into the project folder
cd SCT_WD_2

# Open in browser
open index.html
```

Or simply double-click `index.html` to launch it locally.

---

## How to Use

1. Click **START** to begin timing
2. Click **LAP** at any point to record the current split time
3. Click **START** again to **PAUSE** the timer
4. Click **RESET** to clear everything and return to zero
5. View the **Stats Bar** for best and average lap times after recording at least one lap

---

## Internship Context

This project was built as **Task 02** of the **SkillCraft Technology Web Development Internship (SCT_WD)**. The task objective was to create a stopwatch web application with start, pause, and reset functionality, along with the ability to record and display lap times.

---



