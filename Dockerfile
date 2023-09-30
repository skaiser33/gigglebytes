FROM node:alpine

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /gigglebytes

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN apk add --no-cache postgresql-client
RUN npm install

# Starting our application
CMD ["node", "server.js"]

# Exposing server port
EXPOSE 3000/tcp