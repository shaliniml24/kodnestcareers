# KodNestCareers

A production-ready, scalable microservices platform for career management and job matching.

## 🚀 Features

- **Modern Frontend**: Next.js 15 with TypeScript, Tailwind CSS, and toast notifications
- **Microservices Architecture**: Modular backend services with API Gateway
- **Profile Management**: Create and manage developer profiles with skills
- **Job Board**: Post and browse job opportunities with real-time updates
- **Type Safety**: End-to-end TypeScript with shared types library
- **Production Ready**: Docker containerization with development and production configs

## 📁 Project Structure

```
kodnestcareers/
├── frontend/              # Next.js application
├── backend/
│   ├── api-gateway/      # Entry point (Port 8000)
│   ├── auth-service/     # Authentication (Port 8001)
│   ├── profile-service/  # Profile CRUD (Port 8002)
│   ├── job-service/      # Job CRUD (Port 8003)
│   └── [other services]  # Future enhancements
├── shared/               # Shared TypeScript types & utils
├── infrastructure/       # Docker & deployment configs
└── scripts/             # Utility scripts
```

## 🛠️ Tech Stack

**Frontend**:
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Sonner (Toast notifications)
- Lucide React (Icons)

**Backend**:
- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite (development)
- Zod (validation)

**DevOps**:
- Docker & Docker Compose
- NPM Workspaces (Monorepo)
- Concurrently (dev orchestration)

## 🚦 Quick Start

### Development Mode

```bash
# Install dependencies
npm install

# Start all services (Gateway, Profile, Job, Frontend)
npm run dev

# Access the application
# Frontend: http://localhost:3000
# API Gateway: http://localhost:8000
```

### Individual Services

```bash
# Frontend only
npm run dev:frontend

# API Gateway only
npm run dev:gateway

# Profile Service only
npm run dev:profile

# Job Service only
npm run dev:job
```

### Production Mode

```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up --build

# Access at http://localhost:3000
```

## 📝 API Endpoints

### Profile Service (via Gateway)
- `POST /api/profiles` - Create/Update profile
- `GET /api/profiles/:userId` - Get profile

### Job Service (via Gateway)
- `POST /api/jobs` - Post a job
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/:id` - Get job details

## 🔧 Environment Variables

Create a `.env` file from `.env.example`:

```bash
NODE_ENV=development
PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📦 Available Scripts

- `npm run dev` - Start all services concurrently
- `npm run build` - Build all workspaces
- `npm run dev:frontend` - Frontend only
- `npm run dev:gateway` - API Gateway only
- `npm run dev:profile` - Profile service only
- `npm run dev:job` - Job service only

## 🗂️ Monorepo Workspaces

This project uses NPM workspaces:

```json
{
  "workspaces": [
    "frontend",
    "backend/*",
    "shared"
  ]
}
```

## 🎯 Roadmap

**Phase 1-4** ✅ Complete:
- [x] Monorepo setup with TypeScript
- [x] Profile Service (CRUD)
- [x] Job Service (CRUD)
- [x] Next.js Frontend
- [x] Docker production config

**Future Enhancements**:
- [ ] Matching Service (AI-powered)
- [ ] Resume Service (PDF parsing)
- [ ] Analytics Service
- [ ] E2E Testing
- [ ] Real authentication (JWT/OAuth)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
