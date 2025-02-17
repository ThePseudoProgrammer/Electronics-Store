import React, { useState } from 'react';
import { 
    Container, 
    Typography, 
    Grid, 
    TextField, 
    Button, 
    Card, 
    CardContent 
} from '@material-ui/core';
import { useCart } from '../context/CartContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Checkout() {
    const { cart, clearCart } = useCart();
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/orders', {
                items: cart,
                total,
                shippingDetails: formData
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            clearCart();
            history.push('/order-success');
        } catch (err) {
            console.error('Ошибка при оформлении заказа:', err);
            alert('Произошла ошибка при оформлении заказа');
        }
    };

    return (
        <Container>
            <Typography variant="h4" style={{ margin: '20px 0' }}>
                Оформление заказа
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="ФИО"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Телефон"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Адрес доставки"
                                            name="address"
                                            multiline
                                            rows={3}
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                        >
                                            Подтвердить заказ
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Ваш заказ</Typography>
                            {cart.map(item => (
                                <div key={item._id} style={{ margin: '10px 0' }}>
                                    <Typography>
                                        {item.name} x {item.quantity}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {item.price * item.quantity} ₽
                                    </Typography>
                                </div>
                            ))}
                            <Typography variant="h6" style={{ marginTop: '20px' }}>
                                Итого: {total} ₽
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Checkout; 