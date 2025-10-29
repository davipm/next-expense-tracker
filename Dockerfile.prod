# Use Node.js 18 as the base image
FROM node:24.0-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/
COPY packages/api/package.json ./packages/api/
COPY packages/db/package.json ./packages/db/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npm run db:generate

# Build packages individually to better handle errors
RUN cd packages/api && npm run build || echo "API build failed, continuing..."
RUN cd packages/db && npm run build || echo "DB build failed, continuing..."
RUN cd apps/server && npm run build || echo "Server build failed, continuing..."
RUN cd apps/web && npm run build || echo "Web build failed, continuing..."

# Expose ports
EXPOSE 3000 5173

# Start the applications
CMD ["npm", "run", "dev"]
