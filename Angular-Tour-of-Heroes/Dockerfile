# Dockerfile
# Thank you:
# https://medium.com/@wkrzywiec/build-and-run-angular-application-in-a-docker-container-b65dbbc50be8

# Stage 1: Build
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run 
FROM nginx:1.17.1-alpine
# Copy compiled files from previous build stage
COPY --from=build /usr/src/app/dist/angular-tour-of-heroes /usr/share/nginx/html