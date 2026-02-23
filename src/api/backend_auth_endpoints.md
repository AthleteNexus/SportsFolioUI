## Authentication Endpoints

### 1. User Login
```
POST /auth/login
Content-Type: application/json

Request:
{
    "username": "john_doe",
    "password": "SecurePass@123"
}

Response (200 OK):
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userDTO": {
        "id": 1,
        "name": "john_doe",
        "email": "john@example.com",
        "userRole": "USER",
        "profilePicture": null,
        "bio": null
    }
}
```

### 2. User Registration
```
POST /auth/signup
Content-Type: application/json

Request:
{
    "username": "john_doe",
    "password": "SecurePass@123",
    "emailId": "john@example.com"
}

Response (201 Created):
"User signed up successfully. OTP sent to your email. Please verify your email to login."
```

### 3. Verify Email with OTP
```
POST /auth/verify-otp
Content-Type: application/json

Request:
{
    "email": "john@example.com",
    "otp": "123456"
}

Response (200 OK):
"Email verified successfully. You can now login."
```

### 4. Resend OTP
```
POST /auth/resend-otp
Content-Type: application/json

Request:
{
    "email": "john@example.com"
}

Response (200 OK):
"OTP resent to your email. Please verify within 10 minutes."
```

### 5. Request Password Reset
```
POST /auth/forgot-password
Content-Type: application/json

Request:
{
    "email": "john@example.com"
}

Response (200 OK):
{
    "message": "OTP has been sent to your email. Please check your inbox.",
    "email": "john@example.com"
}
```

### 6. Reset Password with OTP
```
POST /auth/reset-password
Content-Type: application/json

Request:
{
    "email": "john@example.com",
    "otp": "123456",
    "newPassword": "NewSecurePass@123",
    "confirmPassword": "NewSecurePass@123"
}

Response (200 OK):
"Password reset successfully. You can now login with your new password."
```

### 7. Refresh Access Token
```
POST /auth/refresh
Content-Type: application/json

Request:
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response (200 OK):
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userDTO": {...}
}
```

### 8. User Logout
```
GET /auth/logout?username=john_doe

Response (200 OK):
"User logged out successfully"
```

## Password Requirements

Password must contain:
- ✓ Minimum 8 characters
- ✓ At least one uppercase letter (A-Z)
- ✓ At least one lowercase letter (a-z)
- ✓ At least one digit (0-9)
- ✓ At least one special character (!@#$%^&*)
