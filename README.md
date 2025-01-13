# 📦 MERN Stack Application - Customer Order Management

## 🖍 Description
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
- **Monitoring with Prometheus and Grafana:** Real-time cluster monitoring with dashboards.
- **Application Deployment with ArgoCD:** GitOps approach for Kubernetes deployment.

---

## 🔧 Tech Stack
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
- **ArgoCD**: Automate Kubernetes deployments using GitOps principles.

### **Monitoring**
- **Prometheus**: Metrics collection and alerting.
- **Grafana**: Data visualization and dashboarding.

---

## 📂 Project Structure

### **Frontend**
Located in the `/frontend` folder:
```
src/
├── components/        # Shared React components
├── pages/             # Individual page views (Auth, Clients, Orders, etc.)
├── services/          # API service calls
└── App.js             # Main application entry point
```

### **Backend**
Located in the `/backend` folder:
```
controllers/
├── clientsController.js
├── ordersController.js
├── productController.js
└── suppliersController.js
```

### **Kubernetes Configuration**
Located in the `/k8s` folder:
```
- `backend-deployment.yaml`: Kubernetes configuration for the backend deployment
- `frontend-deployment.yaml`: Kubernetes configuration for the frontend deployment
- `mongo-deployment.yaml`: Kubernetes configuration for the MongoDB service
```

---

## 🔠 Installation and Usage

### Clone the Repository

```bash
git clone https://github.com/sarrarhouma/Gestion-Commande-Mern.git
```

### Install Dependencies

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

### Start the Application

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

### Access the Application
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`

---

## 🔑 Default Users

**Admin**
- Username: `admin`
- Password: `admin123`

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
![Capture d'écran 2025-01-10 130438](https://github.com/user-attachments/assets/dc906f79-2e37-46f4-b38a-adeb8eb3cc31)
![Capture d'écran 2025-01-10 130447](https://github.com/user-attachments/assets/dc1ea2c9-d22d-4c28-841b-d6b3182f072b)
![Capture d'écran 2025-01-10 130451](https://github.com/user-attachments/assets/0cf3d68d-70c9-49c0-8529-a905ac5a23e2)
---

## 🤖 Jenkins Setup

1. **Install Jenkins**: Follow the Jenkins installation instructions for your environment (https://www.jenkins.io/doc/book/installing/).

2. **Jenkins Pipeline for CI/CD**:

3. **Jenkins Job**: Create a Jenkins pipeline job and point it to the repository containing your `Jenkinsfile`. Configure the job to run the above pipeline script.
![image](https://github.com/user-attachments/assets/93a8727b-6cb9-4faf-a739-d213371d3468)
![image](https://github.com/user-attachments/assets/d592312a-784c-4252-a2ad-b418867c0892)
---

## 🛥️ Kubernetes Deployment

1. **Kubernetes Configurations**:

2. **Apply Kubernetes Configurations**:

```bash
kubectl apply -f ./k8s/backend-deployment.yaml
kubectl apply -f ./k8s/frontend-deployment.yaml
kubectl apply -f ./k8s/mongo-deployment.yaml
```

3. **Check Pod Status**:

```bash
kubectl get pods
```
![Capture d'écran 2025-01-10 130500](https://github.com/user-attachments/assets/ad3a3a88-9b73-4d32-a5ec-7baba7141e97)

![Capture d'écran 2025-01-11 174633](https://github.com/user-attachments/assets/4018f7e4-5d85-4921-82da-1ce9d30a821e)
---

## 🔹 Helm and ArgoCD Integration

### Install Prometheus and Grafana using Helm

1. **Add Helm Repositories**:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
```

2. **Install Prometheus**:

```bash
helm install prometheus prometheus-community/prometheus --namespace monitoring --create-namespace
```

3. **Install Grafana**:

```bash
helm install grafana grafana/grafana --namespace monitoring --set admin.password=admin
```

### Set Up ArgoCD

1. **Install ArgoCD**:

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

2. **Access ArgoCD**:

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Login to `https://localhost:8080` using the ArgoCD credentials.
![Capture d'écran 2025-01-13 184759](https://github.com/user-attachments/assets/6cb2b55f-1e93-4ebf-80cd-cea06e233bff)
![Capture d'écran 2025-01-13 185937](https://github.com/user-attachments/assets/67a54655-8d16-4ee7-a173-5b3143dea01a)
![Capture d'écran 2025-01-13 194328](https://github.com/user-attachments/assets/2b3ce178-7ddc-4ffb-8da0-5e616439be82)

---

## 🔄 Monitoring with Prometheus and Grafana

1. **Access Prometheus**:

```bash
kubectl port-forward svc/prometheus-server -n monitoring 9090:80
```

Navigate to `http://localhost:9090` to access Prometheus.
![Capture d'écran 2025-01-13 200912](https://github.com/user-attachments/assets/de338e04-f3b6-4803-a449-cda4f706f3df)

2. **Access Grafana**:

```bash
kubectl port-forward svc/grafana -n monitoring 3000:3000
```

Navigate to `http://localhost:3000` and login using the username `admin` and the configured password.
![Capture d'écran 2025-01-13 202046](https://github.com/user-attachments/assets/b8ef424d-3062-4e4a-b5d6-9c91c4ceb892)

3. **Add Prometheus as a Data Source in Grafana**:

- Name: `Prometheus`
- URL: `http://prometheus-server`
![image](https://github.com/user-attachments/assets/f96b3c99-44ad-42ac-a3de-790184c71bb7)

4. **Create a Dashboard in Grafana**:

- Add a panel with the following PromQL query:

```promql
sum(rate(http_requests_total[5m])) by (job)
```
![Capture d'écran 2025-01-13 203338](https://github.com/user-attachments/assets/52a3ed2d-4ff3-4214-b7f4-3f0f91f0a0f1)

---

## 🖍 Conclusion
This application enables efficient customer order management with robust features, scalable deployment using Kubernetes, real-time monitoring with Grafana and Prometheus, and GitOps deployment with ArgoCD. The integration of Docker and CI/CD pipelines ensures seamless development and deployment.
