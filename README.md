# DSA Tracker

A personal self-learning Data Structures & Algorithms (DSA) progress tracking application built strictly from the **DSA Cheat Sheet** syllabus.

![DSA Tracker Banner](https://img.shields.io/badge/DSA-Tracker-FF6B00?style=for-the-badge&logo=codeforces&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🚀 Features

- 📚 **211 DSA Problems**: Complete problem set extracted directly from the DSA Cheat Sheet (`01` through `211`).
- 📂 **Topic & Subtopic Accordion Syllabus**:
  - 15 Collapsible Topics (`01 ARRAYS` to `11 MISCELLANEOUS`).
  - Subtopics (`1-D Array`, `2-D Array`, `Prefix Sum`, `Kadane's Algorithm`, `Sliding Window`, `Two Pointers`, `Binary Search`, `Sorting`, `Hashing`, `Linked Lists`, `Stack & Queue`, `Heap`, `Recursion & Backtracking`, `Trees`, `Trees II`, `Graphs`, `Greedy`, `Dynamic Programming`, `Math`, `Miscellaneous`).
- 💾 **Persistent Client-Side Progress**:
  - Problem completion checkbox state saved in `localStorage` by unique problem number.
  - Bookmarks & expanded topic preferences survive page reloads and browser restarts.
- 📊 **Dynamic Summary Dashboard**:
  - Live problem metrics: `Total Problems (211)`, `Completed`, `Remaining`, and `Progress %`.
- 🔍 **Filtering & Instant Search**:
  - Status filters: `All`, `Completed`, `Pending`.
  - Topic selector dropdown.
  - Search box matching problem name, problem number, topic, or subtopic.
- 🔗 **Direct Practice Links & Action Buttons**:
  - Direct practice links to LeetCode and GeeksforGeeks.
  - Action buttons: Problem links, YouTube tutorial search, Copy link, Bookmark toggle.
- 🎨 **Premium Dark UI**:
  - Deep black (`#0B0B0D`) background with vibrant orange (`#FF6B00`) accents.
  - Responsive table layout for desktop and mobile devices.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (Custom Design System & Dark Theme)
- **Persistence**: Browser `localStorage` API

---

## 📁 Project Structure

```
DSA-Checklist/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App Header with logo & status
│   │   ├── SummaryMetrics.jsx  # Top 4 summary metric cards
│   │   ├── FilterBar.jsx       # Search input & filter controls
│   │   ├── TopicAccordion.jsx  # Collapsible topic container
│   │   ├── SubtopicSection.jsx # Subtopic header & problem table
│   │   └── ProblemRow.jsx      # Individual problem row with checkbox & actions
│   ├── data/
│   │   └── dsa_data.json       # 211 extracted DSA problems data
│   ├── utils/
│   │   └── storage.js          # LocalStorage persistence utility
│   ├── App.jsx                 # Main application state & logic
│   ├── index.css               # Complete dark black + orange styling system
│   └── main.jsx                # React entry point
├── index.html                  # HTML template
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation
```

---

## 💻 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.0.0 or higher)
- `npm` or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https.github.com/MohamedRilwanJ/DSA-Checklist.git
   cd DSA-Checklist
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000` (or the port indicated in terminal).

---

## 🏗️ Production Build

To build the project for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📄 License

This project is open-source and intended for personal learning and DSA preparation.
