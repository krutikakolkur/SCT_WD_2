# QUIZΛ — Neural Challenge

A sleek, interactive web-based quiz application built with vanilla HTML, CSS, and JavaScript. QUIZΛ challenges users across multiple question types with a polished, futuristic UI featuring animated particles, a live timer, and a detailed score breakdown.

---

## Features

- **15 Questions** spanning multiple knowledge dimensions
- **3 Question Types** — Single select, multi-select, and fill-in-the-blank
- **Live Timer** — Per-question countdown with animated SVG ring
- **Real-time Score Tracking** — Score updates as you answer
- **Progress Bar** — Visual progress indicator throughout the quiz
- **Feedback Flash** — Instant correct/incorrect feedback after each answer
- **Results Screen** — Final score with performance title and category breakdown
- **Answer Review** — Full review of all questions with correct vs. your answers
- **Particle Canvas Background** — Animated visual effects for immersive experience
- **Responsive Design** — Works across different screen sizes

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structure and layout |
| CSS3 | Styling, animations, and responsive design |
| JavaScript (ES6+) | Quiz logic, timer, scoring, and DOM manipulation |
| Google Fonts | Syne & Space Mono typefaces |

---

## Project Structure

```
SCT_WD_3/
├── index.html       # Main HTML — all four screens (intro, quiz, results, review)
├── style.css        # Futuristic UI styles, animations, and layout
├── questions.js     # Question bank (single select, multi-select, fill-in-the-blank)
└── app.js           # Core quiz logic — timer, scoring, navigation, and rendering
```

---

## Screens

1. **Intro Screen** — Landing page with logo animation and quiz stats (15 questions, 3 types)
2. **Quiz Screen** — Question card with HUD (question counter, timer, live score), options, and next button
3. **Results Screen** — Orbital score display, performance title, and category breakdown
4. **Review Screen** — Full answer review listing every question and the correct answer

---

## Getting Started

No build tools or dependencies required. Just open the project in a browser:

```bash
# Clone the repository
git clone https://github.com/krutikakolkur/SCT_WD_3.git

# Navigate into the project folder
cd SCT_WD_3

# Open in browser
open index.html
```

Or simply double-click `index.html` to launch it locally.

---

## How to Play

1. Click **INITIATE** on the intro screen to start
2. Read each question and select your answer before the timer runs out
3. Hit **NEXT** to advance to the following question
4. After all 15 questions, view your score and performance rating
5. Click **REVIEW ANSWERS** to see a breakdown, or **PLAY AGAIN** to restart





This project is open source and available under the [MIT License](LICENSE).
