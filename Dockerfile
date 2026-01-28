# Dockerfile
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port your app runs on
EXPOSE 8877

# Start the app
CMD ["node", "index.js"]
