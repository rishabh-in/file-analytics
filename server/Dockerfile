# Use the official Node.js image as a base
FROM node:18.9.1

# Set the working directory inside the container
WORKDIR /usr/src/apps

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 4001

# Command to run the application
CMD ["npm", "start"]
