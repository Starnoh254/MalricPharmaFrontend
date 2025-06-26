
# 🔐 Advanced Auth Implementation Plan

## ✅ 3. Auto-Login on Page Refresh

**Goal**: Automatically log in the user on page refresh using a refresh token stored in HttpOnly cookie.

### 🔧 Flow:
1. On app load, in `AuthContext.tsx` (inside `useEffect`):
2. Send a `GET /api/auth/refresh-token` request.
3. If valid, backend responds with:
   - new access token
   - user data
4. Update AuthContext with new token and user.

```tsx
useEffect(() => {
  const loadUser = async () => {
    try {
      const res = await axios.get("/api/auth/refresh-token", { withCredentials: true });
      login(res.data.user, res.data.token);
    } catch (err) {
      console.log("Not logged in:", err);
    }
  };
  loadUser();
}, []);
```

---

## ✅ 4. Axios Interceptors

**Goal**: Automatically attach access token to every request and handle token expiry (401).

### 🔧 Setup:
Create a reusable `axios.ts` config file:

```ts
import axios from "axios";
import { getAuthToken, refreshToken } from "@/utils/auth";

const api = axios.create({
  baseURL: "https://api.example.com",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const res = await refreshToken(); // Get new token from server
        // Update token and retry original request
        const newToken = res.data.token;
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api.request(error.config);
      } catch (refreshErr) {
        console.error("Refresh failed:", refreshErr);
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## ✅ 5. Logout

**Goal**: Log the user out and clear all auth state.

### 🔧 Implementation:

```tsx
const logout = async () => {
  try {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
  } catch (err) {
    console.error("Logout failed:", err);
  }
  setUser(null);
  setToken(null);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
```

---

## ✅ 6. Route Protection

**Goal**: Prevent access to certain routes unless user is authenticated.

### 🔧 PrivateRoute.tsx

```tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}
```

### 🧠 Usage:

```tsx
<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>
```

---

## 💡 Summary

| Feature         | Description                                 |
|----------------|---------------------------------------------|
| Auto Login      | On page refresh, check if refresh token is valid |
| Interceptors    | Automatically attach token and retry expired requests |
| Logout          | Call backend to clear session and context   |
| Route Protection| Prevents unauthenticated users from accessing routes |

---

🧠 Keep this flow modular and clean — your users will love the seamless experience 💙
