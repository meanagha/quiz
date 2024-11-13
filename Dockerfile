# Use an official Node.js runtime as a base image
FROM node:22

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which your app will run
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
