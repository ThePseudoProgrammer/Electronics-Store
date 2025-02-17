import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Dashboard from './pages/admin/Dashboard';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProductDetails from './pages/ProductDetails';
import OrderHistory from './pages/OrderHistory';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Navbar />
                    <Container>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/products" component={Products} />
                            <Route path="/products/:id" component={ProductDetails} />
                            <Route path="/cart" component={Cart} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <PrivateRoute path="/checkout" component={Checkout} />
                            <Route path="/order-success" component={OrderSuccess} />
                            <PrivateRoute path="/admin" exact component={Dashboard} adminOnly />
                            <PrivateRoute path="/admin/products" component={ProductManagement} adminOnly />
                            <PrivateRoute path="/admin/orders" component={OrderManagement} adminOnly />
                            <PrivateRoute path="/orders" component={OrderHistory} />
                        </Switch>
                    </Container>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App; 