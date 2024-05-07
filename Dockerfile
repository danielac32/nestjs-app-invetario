# Usa una imagen base que contenga Node.js
FROM node:18

# Instala SQLite y herramientas necesarias para compilar aplicaciones de Node.js
 
# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias del servidor Nest.js
RUN npm install

# Instala Angular CLI de forma global
RUN npm install -g @nestjs/cli

# Copia todos los archivos del proyecto al contenedor
COPY . .

# Compila la aplicación Angular
CMD ["npm", "run","start:dev"]

# Expone el puerto 3000 para el servidor Nest.js
EXPOSE 3000
