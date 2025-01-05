# Utiliser une image Node.js Alpine pour un build léger
FROM node:lts-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application React
RUN npm run build

# Installer "serve" pour servir les fichiers statiques
RUN npm install -g serve

# Exposer le port 3000
EXPOSE 3000

# Lancer l'application avec "serve"
CMD ["serve", "-s", "build", "-l", "3000"]
