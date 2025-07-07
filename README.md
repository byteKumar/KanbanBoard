# Kanban Board

A simple, interactive Kanban Board web application for managing tasks visually by priority. This project is built using HTML, CSS, and JavaScript, and is fully client-side.

## Features

- **Task Creation**
  - Add new tasks with a title and select a priority (P1, P2, P3, P4).
  - Each task is assigned a unique ID automatically.

- **Task Display**
  - Tasks are displayed as cards with their priority, ID, and title.
  - Priority is visually indicated by color.

- **Priority Management**
  - Change a task's priority by clicking on its priority bar.
  - Priority cycles through P1 → P2 → P3 → P4 → P1.

- **Task Editing**
  - Enable edit mode to make task titles editable.
  - Toggle edit mode using the "remove" (edit) button in the header.
  - Disable edit mode to make tasks non-editable.

- **Task Removal**
  - Remove tasks by clicking the trash icon on each task card.

- **Task Filtering**
  - Filter tasks by priority using the colored boxes in the header.
  - Only tasks of the selected priority are shown.

- **Task Search**
  - Search tasks by ID or title using the search bar.
  - Results update in real-time as you type.

- **Responsive UI**
  - Clean, modern interface with intuitive controls.
  - Modal dialog for adding new tasks.

- **Accessibility**
  - Keyboard support for adding tasks (press Enter).
  - Visual feedback for selected priorities and edit mode.

## Getting Started

1. **Clone or Download the Repository**
2. **Open `index.html` in your browser**

No build tools or server required.

## File Structure

- `index.html` — Main HTML file
- `index.css` — Stylesheet for the Kanban Board
- `index.js` — JavaScript logic for task management
- `README.md` — Project documentation

## Customization

- You can change priority colors in the CSS (`index.css`).
- Add more features such as drag-and-drop, due dates, or persistence as needed.

## License

This project is open source and free to use.

---

**Enjoy managing your tasks with this Kanban Board!**