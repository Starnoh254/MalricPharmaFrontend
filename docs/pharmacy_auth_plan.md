# 🛡️ Pharmacy Frontend Authentication Plan

## 🎯 Goal

Implement a secure, efficient authentication system for our pharmacy frontend (React + Vite + TypeScript) that integrates cleanly with our backend (Node.js + Express + MySQL).

---

## 🔐 Auth Flow Overview

### 1. **User Actions:**

- Register
- Login
- Logout
- Persistent session (stay logged in)
- Protect private routes (e.g. Cart, Orders, Dashboard)

### 2. **Token Strategy:**

- **Access Token:** Short-lived (e.g. 15min), used for API requests
- **Refresh Token:** Long-lived (e.g. 7 days), used to generate new access tokens

### 3. **Where to Store Tokens:**

| Token Type    | Storage           | Reason                    |
| ------------- | ----------------- | ------------------------- |
| Access Token  | `memory` (state)  | Prevent XSS               |
| Refresh Token | `httpOnly cookie` | Secure against XSS & CSRF |

> ✅ We're choosing **httpOnly cookies** for refresh tokens and storing access tokens temporarily in memory (or context).

---

## 🧩 Frontend Implementation Plan

### ✅ 1. **Auth Context (Global State)**

Create `AuthContext` to store:

- `user` info
- `accessToken`
- login/logout functions
- loading state

### ✅ 2. **Login & Register Pages**

- Forms to collect email & password
- On success:
  - Access token is saved in context
  - Refresh token is saved in cookie (from backend via `Set-Cookie`)
  - Redirect user to `/` or `/dashboard`

### ✅ 3. **Auto-Login on Page Refresh**

- On app load → call `GET /refresh-token`
- If valid, backend returns new access token
- Update context

### ✅ 4. **Axios Interceptors**

- Automatically attach access token to API calls
- On 401 → use refresh token to get new access token

### ✅ 5. **Logout**

- Clear access token from context
- Call backend to clear refresh cookie

### ✅ 6. **Route Protection**

- Create `PrivateRoute` component
- Redirect to login if no access token

---

## 🛠️ Backend Support Needed

Ensure backend:

- Sends refresh token as `httpOnly` cookie on login
- Supports `GET /refresh-token` endpoint
- Supports `POST /logout` to clear cookie
- Sets `SameSite=Strict` or `Lax` on cookies

---

## 📁 Suggested Folder Structure

```
src/
│
├── context/
│   └── AuthContext.tsx         # Global auth state
│
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Dashboard.tsx
│
├── components/
│   └── PrivateRoute.tsx
│
├── utils/
│   └── axios.ts                # Axios instance with interceptors
```

---

## ✅ Benefits of This Plan

- Secure: No token exposed to JS via cookies
- Clean: Separation of concerns (auth state vs API calls)
- Scalable: Can plug into admin vs user logic later
- Time-saving: Handles edge cases like token expiry automatically

---

## 🧠 Future Enhancements

- Social login (Google, Facebook)
- Role-based access control
- Email verification flow
- Password reset flow

---

Let’s start building! 🚀

