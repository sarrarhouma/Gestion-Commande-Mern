# 📦 MERN Stack Application - Customer Order Management

## 📝 Description
A web application designed to manage customer orders efficiently. Built using the **MERN stack** (MongoDB, Express, React, Node.js), the application provides features such as adding, tracking, and managing client orders with a user-friendly interface and a robust backend.

---

## 🚀 Features
- **Client Management:** Add, update, delete, and view customer details.
- **Order Management:** Create and manage orders for clients.
- **Product Management:** Manage product inventory.
- **Supplier Management:** Keep track of suppliers.
- **Authentication:** Secure login and registration for users.
- **Error Handling:** Custom error pages for a better user experience.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Containerization with Docker**: Simplified deployment using Docker containers.
- **Continuous Integration with Jenkins**: Automated builds, tests, and Docker image publishing.
- **Deployment with Kubernetes**: Scalable and reliable deployment with Kubernetes.

---

## 🛠️ Tech Stack
### **Frontend**
- **React.js** with TailwindCSS/Bootstrap
- **React Router:** For navigation
- **Axios:** For API calls

### **Backend**
- **Node.js** with Express.js
- **MongoDB:** Database for storing all data
- **Mongoose:** Object Data Modeling (ODM) for MongoDB
- **JWT Authentication**

### **Containerization and Orchestration**
- **Docker**: Dockerize the application for better portability and consistency across environments.
- **Kubernetes**: Manage deployment, scaling, and operations of application containers.

### **CI/CD**
- **Jenkins**: Automate the deployment pipeline, including testing, building Docker images, and deploying to Kubernetes.

---

## 📂 Project Structure

### **Frontend**
Located in the `/frontend` folder:
src/ ├── components/ # Shared React components ├── pages/ # Individual page views (Auth, Clients, Orders, etc.) ├── services/ # API service calls └── App.js # Main application entry point

### **Backend**
Located in the `/backend` folder:
controllers/ ├── clientsController.js ├── ordersController.js ├── productController.js └── suppliersController.js

### **Kubernetes Configuration**
Located in the `/k8s` folder:
- `backend-deployment.yaml`: Kubernetes configuration for the backend deployment
- `frontend-deployment.yaml`: Kubernetes configuration for the frontend deployment
- `mongo-deployment.yaml`: Kubernetes configuration for the MongoDB service

```bash
git clone https://github.com/sarrarhouma/Gestion-Commande-Mern.git
```
## 📂 Install Dependencies

1. **Navigate to the backend folder**:

```bash
cd backend
npm install
```

2. **Navigate to the frontend folder**:

```bash
cd ../frontend
npm install
```

## 📂 Start the Application

1. **Start the backend server**:

```bash
cd backend
npm start
```

2. **Start the React frontend**:

```bash
cd ../frontend
npm start
```

## 🌐 Usage
Access the frontend at: http://localhost:3000
Access the backend API at: http://localhost:5000/api

## 🔑 Default Users

**Admin**
Username: admin
Password: admin123

---

## 📦 Docker Setup

### Dockerize the Application
1. **Backend Dockerfile**: In the `/backend` folder, create a `Dockerfile` that builds the backend application image.

2. **Frontend Dockerfile**: In the `/frontend` folder, create a `Dockerfile` for the frontend.

3. **Build Docker Images**

```bash
# Build backend image
docker build -t gestion_commande_mern-backend ./backend

# Build frontend image
docker build -t gestion_commande_mern-frontend ./frontend
```
![Capture d'écran 2025-01-10 130438](https://github.com/user-attachments/assets/dc906f79-2e37-46f4-b38a-adeb8eb3cc31)
![Capture d'écran 2025-01-10 130447](https://github.com/user-attachments/assets/dc1ea2c9-d22d-4c28-841b-d6b3182f072b)
![Capture d'écran 2025-01-10 130451](https://github.com/user-attachments/assets/0cf3d68d-70c9-49c0-8529-a905ac5a23e2)



4. **Run Docker Containers**

```bash
docker run -p 5000:5000 gestion_commande_mern-backend
docker run -p 3000:3000 gestion_commande_mern-frontend
```

### Docker Compose
To simplify multi-container management, use Docker Compose for the entire application.

1. **docker-compose.yml**:


2. **Start All Services**

```bash
docker-compose up --build
```

---

## 🤖 Jenkins Setup

1. **Install Jenkins**: Follow the Jenkins installation instructions for your environment (https://www.jenkins.io/doc/book/installing/).

2. **Jenkins Pipeline for CI/CD**:



3. **Jenkins Job**: Create a Jenkins pipeline job and point it to the repository containing your `Jenkinsfile`. Configure the job to run the above pipeline script.
![image](https://github.com/user-attachments/assets/93a8727b-6cb9-4faf-a739-d213371d3468)
![image](https://github.com/user-attachments/assets/d592312a-784c-4252-a2ad-b418867c0892)

---

## 🚢 Kubernetes Deployment

1. **Kubernetes Configurations**:

2. **Apply Kubernetes Configurations**:
![Capture d'écran 2025-01-10 130500](https://github.com/user-attachments/assets/ad3a3a88-9b73-4d32-a5ec-7baba7141e97)

```bash
kubectl apply -f ./k8s/backend-deployment.yaml
kubectl apply -f ./k8s/frontend-deployment.yaml
kubectl apply -f ./k8s/mongo-deployment.yaml
```

3. **Check Pod Status**:

```bash
kubectl get pods
```
![Capture d'écran 2025-01-11 174633](https://github.com/user-attachments/assets/4018f7e4-5d85-4921-82da-1ce9d30a821e)

---

# 📝 Conclusion
This application allows efficient management of customer orders with features like client and order management, product inventory tracking, and more. With Docker and Kubernetes support, the app is easily deployable and scalable. Jenkins CI/CD pipeline ensures continuous delivery with automated testing and deployment.

