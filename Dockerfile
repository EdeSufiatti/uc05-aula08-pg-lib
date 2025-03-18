# Etapa 1: build
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: produção
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
