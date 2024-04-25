# Usa una imagen base con Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json (o yarn.lock si estás usando Yarn) al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de tu aplicación al directorio de trabajo
COPY . .

# Compila tu aplicación
RUN npm run build


# Define el comando para iniciar tu aplicación
CMD ["npm", "run", "dev"]
