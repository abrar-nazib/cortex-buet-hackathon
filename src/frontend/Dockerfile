# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
# Set environment variables
ENV NODE_ENV=production
ENV API_URL=http://localhost:8000
ENV API_TRAIN =http://localhost:8001
ENV API_BOOKING =http://localhost:8002
ENV API_PAYMENT =http://localhost:8003