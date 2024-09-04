# Frontend Dockerfile

# Step 1: Build the React app
FROM node:20 AS build
WORKDIR /my-react-app
COPY my-react-app/package.json ./
COPY my-react-app/package-lock.json ./
RUN npm install
COPY my-react-app/ ./
RUN npm run build

# Step 2: Serve the React app using nginx
FROM nginx:alpine
COPY --from=build /my-react-app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
