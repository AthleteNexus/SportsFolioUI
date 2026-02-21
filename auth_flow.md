# 🔐 JWT + Refresh Token Authentication — Client ↔ Backend Flow

## 🧩 1️⃣ LOGIN FLOW

### Client
User enters credentials and sends:
```
POST /auth/login
Content-Type: application/json

{
  "username": "adarsh",
  "password": "secret"
}
```

### Backend
1. Validates credentials  
2. Generates:
   - Access Token (valid 15 mins)
   - Refresh Token (valid 7 days)
3. Stores Refresh Token in DB (linked to user)
4. Returns:
```
{
  "accessToken": "<JWT_ACCESS_TOKEN>",
  "refreshToken": "<JWT_REFRESH_TOKEN>"
}
```

### Client stores:
- Access Token → in memory or `localStorage`
- Refresh Token → in `httpOnly` cookie (recommended)

---

## 🧩 2️⃣ ACCESSING PROTECTED RESOURCES

### Client
Sends access token with every API call:
```
GET /api/user/profile
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

### Backend
- Validates token signature and expiry using JWT filter  
- If valid → allows request  
- If expired → returns `401 Unauthorized`

---

## 🧩 3️⃣ TOKEN REFRESH FLOW

When access token expires:

### Client
1. Detects `401 Unauthorized`  
2. Sends refresh request:
```
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "<JWT_REFRESH_TOKEN>"
}
```

### Backend
1. Validates refresh token:
   - Exists in DB
   - Not expired / revoked
2. Returns new access token:
```
{
  "accessToken": "<NEW_JWT_ACCESS_TOKEN>"
}
```
(Optional: rotate refresh token and update DB)

### Client
- Stores new access token  
- Retries the failed request automatically  

---

## 🧩 4️⃣ LOGOUT FLOW

### Client
Calls:
```
POST /auth/logout
Authorization: Bearer <JWT_ACCESS_TOKEN>
```
Then clears all local tokens:
```
localStorage.removeItem("accessToken");
deleteCookie("refreshToken");
```

### Backend
- Deletes refresh token from DB  
- (Optional) Adds access token to blacklist  
- Future refresh attempts → rejected  

---

## 🧩 5️⃣ TOKEN EXPIRY SCENARIOS

| Scenario | Client Behavior | Backend Behavior |
|-----------|----------------|------------------|
| Access token expired | Use refresh token to get new one | Validate refresh token, issue new access token |
| Refresh token expired | Redirect to login | Reject with 401 |
| User logs out | Delete refresh token, clear tokens | Remove refresh token from DB |

---

## 🧠 SECURITY BEST PRACTICES

✅ Store refresh token in **HttpOnly, Secure cookie**  
✅ Use **short-lived** access tokens (5–15 min)  
✅ Always use **HTTPS**  
✅ Rotate refresh tokens on every use  
✅ Optionally **blacklist** access tokens on logout  

---

## ⚛️ Example: React + Axios Interceptor
```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getCookie("refreshToken");
      if (refreshToken) {
        const { data } = await axios.post("/auth/refresh", { refreshToken });
        localStorage.setItem("accessToken", data.accessToken);
        api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```