FROM node:18-alpine

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./
COPY tsconfig.json ./

# Copy shared library
COPY shared ./shared

# Copy service code (will be overridden by build args/volumes if needed, but here we copy all backends for simplicity in a monorepo build)
COPY backend ./backend

# Install dependencies
RUN npm ci

# Build shared library
RUN npm run build --workspace=shared

# Argument for the specific service to build/start
ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}

# Build the specific service
RUN npm run build --workspace=backend/${SERVICE_NAME}

# Expose ports (Gateway 8000, Auth 8001, Profile 8002, Job 8003)
EXPOSE 8000 8001 8002 8003

# Command to run the service
CMD npm start --workspace=backend/${SERVICE_NAME}
