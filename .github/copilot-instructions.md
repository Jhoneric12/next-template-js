# GitHub Copilot Custom Instructions

## Tech Stack

- Next.js (App Router)
- React
- JavaScript (No TypeScript)
- Tailwind CSS
- Ant Design
- Axios
- TanStack Query
- Zustand

Always generate code using these technologies.

---

# Project Structure

The entire application source code lives inside the `src` folder.

```
src/
├── app/
├── pages/
├── services/
├── store/
├── shared/
├── lib/
└── ...
```

---

# Routing

Use the **Next.js App Router**.

Routes belong only inside the `src/app` directory.

Each `page.js` should only render its corresponding page component from the `pages` directory.

Example:

```
src/
├── app/
│   └── login/
│       └── page.js
│
└── pages/
    └── Login/
        └── index.js
```

Example:

```jsx
import Login from "@/pages/Login";

export default function Page() {
  return <Login />;
}
```

---

# Pages

Every feature/page should be placed inside the `src/pages` directory.

Example:

```
pages/
└── Login/
    ├── index.js
    ├── components/
    └── hooks/
```

### Responsibilities

- `index.js` → Main page component.
- `components/` → Components used only by the page.
- `hooks/` → Custom hooks used only by the page.

If the page is simple, don't create unnecessary folders.

---

# Services

All API requests belong inside the root `src/services` directory.

Never place API requests inside page folders or React components.

Example:

```
src/
└── services/
    ├── auth/
    │   ├── api.js
    │   └── query.js
    ├── user/
    │   ├── api.js
    │   └── query.js
    └── ...
```

- `api.js` → Axios request functions.
- `requests.js` → TanStack Query hooks.

Components should only use TanStack Query hooks.

Flow:

```
Component
    ↓
TanStack Query Hook
    ↓
Axios Service
    ↓
Backend API
```

---

# Axios

Keep all Axios configuration inside `src/lib`.

Example:

```
lib/
└── axios/
    ├── instance.js
    ├── interceptors.js
    └── index.js
```

Always use the configured Axios instance.

---

# State Management

- Use Zustand for global state.
- Use TanStack Query for server state.
- Use React `useState` for local UI state.

Do not store server data in Zustand.

---

# Error Handling

- Wrap asynchronous operations with `try/catch`.
- Throw descriptive errors from API services.
- Use Ant Design `message` for user notifications.
- Never use `alert()`.

---

# General Rules

- Use JavaScript only.
- Prefer `async/await`.
- Use functional components with arrow functions.
- Keep components focused on UI.
- Keep business logic outside components.
- Write clean, reusable, production-ready code.
