# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json files for backend and frontend
COPY backend/package.json backend/package-lock.json ./backend/
COPY frontend/package.json frontend/package-lock.json ./frontend/

# Install backend dependencies
RUN cd backend && npm install

# Install frontend dependencies and build the frontend
RUN cd frontend && npm install && npm run build

# Copy the rest of your application code
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start", "--prefix", "backend"]
