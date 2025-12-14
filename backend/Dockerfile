# Usa una imagen base de Node.js (versión 18 es una buena opción)
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de configuración de dependencias
# Esto ayuda a aprovechar el cache de Docker si solo cambian los archivos de código
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente del backend al directorio de trabajo del contenedor
# Nota: Asume que server.js está en la raíz de la carpeta backend
COPY . .

# Expone el puerto que usa tu servidor (generalmente 3000 o 8080)
# (Revisa tu server.js si es diferente)
EXPOSE 3000

# Comando para correr la aplicación cuando el contenedor se inicie
CMD [ "npm", "start" ]