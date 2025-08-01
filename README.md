﻿# Backend API

A simple Node.js REST API with JWT (JSON Web Token) authentication.

## Features

- ✅ User registration with secure password hashing
- ✅ User login with JWT token generation
- ✅ Protected routes with JWT authentication
- ✅ Password hashing using bcrypt
- ✅ Rate limiting and security headers
- ✅ In-memory user storage
- ✅ Comprehensive error handling

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate to the backend folder:
```bash
cd TeleHEDR/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
cp env.example .env
```

4. Start the server:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### 1. Register User
**POST** `/register`

Create a new user account.

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "1703123456789",
      "username": "john_doe",
      "createdAt": "2023-12-21T10:30:45.123Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login User
**POST** `/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "1703123456789",
      "username": "john_doe",
      "createdAt": "2023-12-21T10:30:45.123Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Get User Profile
**GET** `/profile`

Get user information (requires JWT authentication).

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "id": "1703123456789",
      "username": "john_doe",
      "createdAt": "2023-12-21T10:30:45.123Z"
    }
  }
}
```

## Authentication

### JWT Token
- **Expiration**: 15 minutes
- **Header Format**: `Authorization: Bearer <token>`
- **Secret**: Configurable via `JWT_SECRET` environment variable

### Password Security
- Passwords are hashed using bcrypt with 10 salt rounds
- Minimum password length: 6 characters
- Minimum username length: 3 characters

## Error Responses

### Validation Errors (400)
```json
{
  "success": false,
  "message": "Username and password are required"
}
```

### Authentication Errors (401)
```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

### Authorization Errors (403)
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### Not Found Errors (404)
```json
{
  "success": false,
  "message": "User not found"
}
```

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Password Hashing**: bcrypt with salt
- **JWT Expiration**: 15-minute token lifetime

## Project Structure

```
backend/
├── config/
│   └── database.js          # In-memory user storage
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── routes/
│   ├── auth.js              # Registration and login routes
│   └── profile.js           # Protected profile route
├── server.js                # Main server file
├── package.json             # Dependencies and scripts
├── env.example              # Environment variables template
└── README.md               # This file
```

## Testing the API

### Using curl

1. **Register a user:**
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

2. **Login:**
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

3. **Get profile (replace TOKEN with actual token):**
```bash
curl -X GET http://localhost:3000/profile \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman

1. Import the endpoints into Postman
2. Set the request body to JSON format
3. For protected routes, add the Authorization header with the Bearer token

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key-change-in-production` |
| `NODE_ENV` | Environment mode | `development` |
| `ALLOWED_ORIGIN` | CORS allowed origin | `*` |

## Development

### Scripts
- `npm start`: Start production server
- `npm run dev`: Start development server with auto-restart

### Adding New Features
1. Create new route files in `routes/` directory
2. Add middleware in `middleware/` directory
3. Import and use routes in `server.js`

## Production Deployment

1. Set environment variables:
   - `NODE_ENV=production`
   - `JWT_SECRET=<strong-secret-key>`
   - `PORT=<your-port>`

2. Install dependencies:
   ```bash
   npm install --production
   ```

3. Start the server:
   ```bash
   npm start
   ```

## License

MIT License
