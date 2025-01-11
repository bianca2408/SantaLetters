# Imaginea de bază
FROM node:18 as build

# Setează directorul de lucru
WORKDIR /app

# Copiază fișierele necesare
COPY santa_letters/package.json santa_letters/package-lock.json ./

# Instalează dependențele
RUN npm install

# Copiază restul proiectului
COPY santa_letters ./

# Creează build-ul pentru producție
RUN npm run build

# Imagine finală pentru serverul static
FROM nginx:stable-alpine

# Copiază build-ul în folderul Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expune portul pentru Nginx
EXPOSE 80

# Rulează serverul Nginx
CMD ["nginx", "-g", "daemon off;"]
