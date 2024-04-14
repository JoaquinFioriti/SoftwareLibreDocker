# Imagen base
FROM node:latest AS builder

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json
COPY package.json .
COPY yarn.lock .

# Instalar las dependencias
RUN yarn install

# Copiar el resto de los archivos
COPY . .

# Construir la aplicación
RUN yarn build

# Segunda etapa del Dockerfile
FROM nginx:alpine

# Copiar los archivos de construcción de la primera etapa
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]