# Multi-stage: build kit visuals + Pattern Lab shell, serve on nginx
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY kits-app/package.json kits-app/package-lock.json ./kits-app/
RUN npm ci && cd kits-app && npm ci

COPY index.html tsconfig.json vite.config.ts ./
COPY src ./src
COPY public ./public
COPY kits-app ./kits-app

# Local React kit visuals → public/kits
RUN cd kits-app && npm run build
RUN npm run build

FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 43127
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:43127/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
