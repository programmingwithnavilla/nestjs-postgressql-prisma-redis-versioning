# Use official Node.js image
From node:20-alpine


# Create app directory

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Build Typescript code
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
