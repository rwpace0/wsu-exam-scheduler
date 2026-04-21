FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

FROM deps AS development
COPY . .
EXPOSE 5001
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5001", "--strictPort"]
