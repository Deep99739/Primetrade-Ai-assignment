# TaskFlow - Task Management Application

A full-stack task management application built with React, Node.js, Express, and MongoDB.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TailwindCSS, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT, bcryptjs |

## Features

- **Authentication**: Signup, Login with JWT tokens
- **User Profile**: View and update profile
- **Task Management**: Full CRUD operations
- **Search & Filter**: Search by title, filter by status/priority
- **Responsive Design**: Mobile-first with TailwindCSS

## Project Structure

```
primetrade-task-manager/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── app.js          # Express app
│   │   └── server.js       # Entry point
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth context
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/Deep99739/Primetrade-Ai-assignment.git
cd Primetrade-Ai-assignment
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your values:
# MONGODB_URI=mongodb://localhost:27017/taskflow
# JWT_SECRET=your_secret_key
# JWT_EXPIRE=7d
# PORT=5000

npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api/v1

## Demo Credentials

After running both servers, create a new account or use:
- Email: demo@example.com
- Password: demo123456

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/signup | Register user |
| POST | /api/v1/auth/login | Login user |

### User Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/me | Get profile |
| PUT | /api/v1/me | Update profile |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/tasks | List tasks (supports ?status, ?priority, ?search) |
| GET | /api/v1/tasks/:id | Get single task |
| POST | /api/v1/tasks | Create task |
| PUT | /api/v1/tasks/:id | Update task |
| DELETE | /api/v1/tasks/:id | Delete task |

## Scaling Considerations

For production deployment with increased load:

1. **Database**: Add MongoDB Atlas with replica sets, implement connection pooling, add indexes on frequently queried fields (already done for user+status, user+priority)

2. **Caching**: Implement Redis for session storage and frequently accessed data caching

3. **API**: Rate limiting with express-rate-limit, request validation with joi/yup, centralized error handling middleware

4. **Deployment**: Containerize with Docker, use PM2 for process management, deploy on AWS/GCP with load balancer

5. **Security**: Helmet.js for headers, CORS configuration, input sanitization, refresh token rotation

## Development Commits

The project was built incrementally with meaningful commits:

1. `project setup with React and Express`
2. `add User model with bcrypt`
3. `implement authentication endpoints`
4. `add JWT auth middleware and profile endpoints`
5. `add Task model and CRUD operations`
6. `add reusable UI components`
7. `add authentication context and API services`
8. `implement auth pages with routing`
9. `fix pre-save hook for modern mongoose`

---

Built for Primetrade.ai Frontend Developer Intern Assignment
