# Multi-stage: React kits + Next kits + Pattern Lab shell
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY kits-app/package.json kits-app/package-lock.json ./kits-app/
COPY kits-next/package.json kits-next/package-lock.json ./kits-next/
RUN npm ci && cd kits-app && npm ci && cd ../kits-next && npm ci

COPY index.html tsconfig.json vite.config.ts ./
COPY src ./src
COPY public ./public
COPY kits-app ./kits-app
COPY kits-next ./kits-next

# React (Vite) gallery → public/kits
RUN cd kits-app && npm run build

# Next static export → public/kits-next
RUN cd kits-next && npm run build && rm -rf /app/public/kits-next && cp -a out /app/public/kits-next

# Pattern Lab shell (copies public incl. kits)
RUN npx tsc && npx vite build

FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 43127
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:43127/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
