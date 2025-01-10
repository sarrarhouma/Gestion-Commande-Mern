# Assurez-vous que la version de Node.js et npm sont installées
FROM node:latest

WORKDIR /app

# Copiez les fichiers de votre application
COPY package*.json ./

# Installez les dépendances
RUN npm install --build-from-source

# Copiez le reste de votre application
COPY . .

# Exposez le port de l'application
EXPOSE 5000

# Lancer l'application
CMD ["npm", "start"]
