# Stage 1: Build the application
FROM node:22.14-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install --global corepack@latest
RUN corepack enable pnpm

# Copy dependency definition files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies for building)
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the project. Output will be in ./.mastra/output/
RUN pnpm run build

# Stage 2: Create the production image
FROM node:22.14-alpine

WORKDIR /app

# Install pnpm
RUN npm install --global corepack@latest
RUN corepack enable pnpm

# Copy only the package.json and pnpm-lock.yaml for installing production dependencies
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile && pnpm store prune

# Copy the built application from the builder stage
COPY --from=builder /app/.mastra/output/ ./.mastra/output/

# Expose the port the app runs on
EXPOSE 4111

# Command to run the application
CMD ["node", ".mastra/output/index.mjs"]
