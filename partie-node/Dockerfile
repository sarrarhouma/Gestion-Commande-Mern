# Étape 1 : Utilisation d'une image Node.js Alpine pour un conteneur léger
FROM node:lts-alpine

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier uniquement les fichiers package.json et package-lock.json
# Cela permet de tirer parti du cache Docker si les dépendances n'ont pas changé
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste des fichiers du backend
COPY . .

# Étape 6 : Exposer le port utilisé par l'application Node.js
EXPOSE 9000

# Étape 7 : Définir les variables d'environnement nécessaires
ENV MONGO_URI=mongodb://mongodb:27017/mern-database

# Étape 8 : Commande pour démarrer l'application
CMD ["npm", "start"]
