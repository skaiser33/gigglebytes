
# Fetching the minified node image on Alpine Linux
FROM node:alpine

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /gigglebytes

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Installing pm2 globally
# RUN npm install pm2 -g

# Starting our application
CMD node server.js

# Exposing server port
EXPOSE 3000/tcp