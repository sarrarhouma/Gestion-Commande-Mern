import axios from 'axios';

// Create an axios instance with the base URL of the API
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Client management
export const getClients = () => api.get('/clients');
export const addClient = (data) => api.post('/clients', data);
export const updateClient = (id, data) => api.put(`/clients/${id}`, data);
export const deleteClient = (id) => api.delete(`/clients/${id}`);
export const loginClient = (data) => api.post('/clients/login', data);

// Order management
export const getOrders = () => api.get('/orders');
export const addOrder = (data) => api.post('/orders', data);
export const updateOrder = (id, data) => api.put(`/orders/${id}`, data);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

// Product management
export const getProducts = () => api.get('/products');
export const addProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Supplier management
export const getSuppliers = () => api.get('/suppliers');
export const addSupplier = (data) => api.post('/suppliers', data);
export const updateSupplier = (id, data) => api.put(`/suppliers/${id}`, data);
export const deleteSupplier = (id) => api.delete(`/suppliers/${id}`);

// Authentication management
export const loginUser = (data) => api.post('/login', data);
export const registerUser = (data) => api.post('/register', data);

export const logout = (data) => api.post('/logout', data);

export default api;
