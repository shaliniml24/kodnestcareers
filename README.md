# KodNestCareers

A scalable microservices-based application for career management.

## Project Structure

- `frontend/`: Frontend application code.
- `backend/`: Backend microservices.
  - `api-gateway`: Entry point for all API requests.
  - `auth-service`: Authentication and authorization service.
  - `profile-service`: User profile management.
  - `job-service`: Job posting and management.
  - `matching-service`: Job matching logic.
  - `resume-service`: Resume parsing and management.
  - `readiness-service`: Job readiness assessment.
  - `notification-service`: Email and push notifications.
  - `analytics-service`: Data analytics and reporting.
- `shared/`: Shared libraries and utilities.
- `infrastructure/`: Infrastructure configuration (Docker, k8s, Terraform).
- `scripts/`: Utility scripts.
- `docs/`: Documentation.
- `tests/`: End-to-end and integration tests.

## Getting Started

See individual service directories for setup instructions.
