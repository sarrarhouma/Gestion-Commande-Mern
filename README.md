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

---

## 📂 Project Structure

### **Frontend**
Located in the `/frontend` folder:
src/ ├── components/ # Shared React components ├── pages/ # Individual page views (Auth, Clients, Orders, etc.) ├── services/ # API service calls └── App.js # Main application entry point

### **Backend**
Located in the `/backend` folder:
controllers/ ├── clientsController.js ├── ordersController.js ├── productController.js └── suppliersController.js

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
## 📂Start the Application

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
