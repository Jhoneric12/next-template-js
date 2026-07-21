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

All API requests belong inside the root `src/services` directory in a strict two-layer architecture.

**CRITICAL RULE**: Never place API requests inside page folders, components, or anywhere else. Services are the ONLY place for API logic.

## Directory Structure

```
src/services/
├── api/                    # HTTP Request Layer (Axios only)
│   ├── auth.js            # Pure HTTP functions: login, logout, getUser
│   ├── products.js        # Pure HTTP functions: getProducts, createProduct
│   └── ...
│
└── query/                  # Query/Mutation Layer (TanStack Query only)
    ├── useAuth.js         # Hooks: useLogin, useLogout, useGetUser
    ├── useProducts.js     # Hooks: useGetProducts, useCreateProduct
    └── ...
```

## Two-Layer Architecture

### Layer 1: `services/api/` - HTTP Requests (Axios)

**Responsibility**: Pure HTTP request functions using Axios.

**Rules**:

- Only Axios calls, no React/hooks
- Export plain functions, not hooks
- Name functions like: `fetchUser()`, `loginUser()`, `createProduct()`
- Handle only HTTP errors, no UI logic
- Pure data transformation if needed
- Always return raw response data

**Example - `services/api/auth.js`**:

```javascript
import axios from "@/lib/axios";

export const loginUser = async (credentials) => {
  const { data } = await axios.post("/auth/login", credentials);
  return data;
};

export const getUser = async () => {
  const { data } = await axios.get("/auth/user");
  return data;
};

export const logoutUser = async () => {
  await axios.post("/auth/logout");
};
```

### Layer 2: `services/query/` - TanStack Query (React Hooks)

**Responsibility**: Wrap HTTP functions with TanStack Query hooks.

**Rules**:

- Use only exported functions from `services/api/`
- Export React Query hooks, not functions
- Name hooks like: `useLogin()`, `useGetUser()`, `useCreateProduct()`
- Include query/mutation configuration (staleTime, retry, etc.)
- Handle loading/error/success states
- Use `onSuccess` and `onError` callbacks for side effects
- Never call HTTP functions directly in components

**Example - `services/query/useAuth.js`**:

```javascript
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser, getUser, logoutUser } from "@/services/api/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login successful:", data);
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};
```

## The Request Flow

```
Component
    ↓
Import: useGetUser() from services/requests/
    ↓
TanStack Query Hook executes
    ↓
Calls: getUser() from services/api/
    ↓
Axios HTTP Request
    ↓
Backend API
```

## Component Usage (ONLY)

Components **MUST** only import from `services/query/`:

```javascript
import { useGetUser, useLogin } from "@/services/query/useAuth";

export const UserProfile = () => {
  const { data: user, isLoading } = useGetUser();
  const { mutate: login } = useLogin();

  return (
    // UI here
  );
};
```

## Forbidden Patterns

❌ Direct Axios calls in components:

```javascript
// WRONG - Never do this
import axios from "@/lib/axios";
const { data } = await axios.get("/users");
```

❌ API functions in components:

```javascript
// WRONG - Never do this
export const getUser = async () => { ... };
// Then import in component
```

❌ TanStack Query in api/ folder:

```javascript
// WRONG - Keep api/ pure Axios only
export const useGetUser = () => useQuery(...);
```

❌ Multiple features mixed in one file:

```javascript
// WRONG - Split by domain
export const getUser = () => {};
export const getProducts = () => {}; // Use separate file
```

---

# Axios

Keep all Axios configuration inside `src/lib`.

Example:

```
lib/
└── axios/
    ├── interceptor.js
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
