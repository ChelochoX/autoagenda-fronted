# Etapa 1: Construcción de la aplicación
FROM node:16-alpine AS build
WORKDIR /app

# Copiar archivos de configuración de npm
COPY package*.json ./

# Instalar las dependencias
RUN npm install --legacy-peer-deps

# Copiar el resto del proyecto
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación con un servidor Node.js ligero
FROM node:16-alpine
WORKDIR /app

# Copiar el build generado
COPY --from=build /app/dist /app/dist

# Instalar un servidor estático simple (serve)
RUN npm install -g serve

# Exponer el puerto 3000 para la aplicación
EXPOSE 3000

# Ejecutar la aplicación
CMD ["serve", "-s", "build", "-l", "3000"]
