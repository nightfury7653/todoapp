# Use Node.js LTS (Long Term Support) as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Add metadata labels
LABEL maintainer="ashiqfiroz"
LABEL version="1.1"
LABEL description="React Todo App with CRUD"
LABEL created_at="2025-01-26"

# Install dependencies first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Command to run the app
CMD ["npm", "run","dev"]
