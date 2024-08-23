FROM nginx:latest

# Copia la plantilla de configuración
COPY nginx.conf /etc/nginx/templates/nginx.conf.template

# Instala envsubst
RUN apt-get update && apt-get install -y gettext-base

# Reemplaza variables de entorno en la plantilla y genera nginx.conf
CMD envsubst '${CORS_ORIGIN}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'

# Etapa de construcción
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn build

# Etapa de producción/desarrollo
FROM node:18-alpine as production

WORKDIR /app

COPY --from=build /app .

# Usa nodemon para el entorno de desarrollo
CMD ["node", "dist/main.js"]
