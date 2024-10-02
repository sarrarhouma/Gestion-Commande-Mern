import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Clients from './pages/Clients/Clients';
import Products from './pages/Products/Products';
import Orders from './pages/Orders/Orders';
import Suppliers from './pages/Suppliers/Suppliers';
import NotFound from './pages/Error/NotFound';
import Navbar from './components/Navigation/NavBar'; // Importez la barre de navigation si vous l'utilisez
import Login from './pages/Auth/Login'; // Corrigez l'import de Login
import Register from './pages/Auth/Register'; // Corrigez l'import de Register
import './App.css'; // Importez le fichier de styles de l'application
import AddClient from './pages/Clients/AddClient';
import AddProduct from './pages/Products/AddProduct';
import AddSupplier from './pages/Suppliers/AddSupplier';
import AddOrder from './pages/Orders/AddOrder';

const App = () => {
    return (
        <Router>
            <div className="app">
                {/* Ajoutez la barre de navigation ici si vous en avez une */}
                <Navbar />
                {/* Routes de l'application */}
                <Routes>
                    <Route path="/home" element={<Home />} />   
                    <Route path="/" element={<Login/>} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                     {/* Corrigez la route Login */}
                    <Route path="/register" element={<Register />} /> {/* Corrigez la route Register */}

                    <Route path="/addclient" element={<AddClient />} /> {/* Route pour ajouter un client */}
                    <Route path="/addproduct" element={<AddProduct />} /> {/* Route pour ajouter un produit */}
                    <Route path="/addsupplier" element={<AddSupplier />} /> {/* Route pour ajouter un fournisseur*/}
                    <Route path="/addorder" element={<AddOrder />} /> {/* Route pour ajouter une commmande  */}
                    
                    {/* Ajoutez d'autres routes ici si nécessaire */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
