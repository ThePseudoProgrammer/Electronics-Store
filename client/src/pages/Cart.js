import React from 'react';
import { 
    Container, 
    Typography, 
    Grid, 
    Card, 
    CardContent, 
    Button, 
    IconButton,
    TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useCart } from '../context/CartContext';
import { useHistory } from 'react-router-dom';

function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const history = useHistory();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Корзина пуста');
            return;
        }
        history.push('/checkout');
    };

    return (
        <Container>
            <Typography variant="h4" style={{ margin: '20px 0' }}>
                Корзина
            </Typography>
            {cart.length === 0 ? (
                <Typography>Корзина пуста</Typography>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {cart.map(item => (
                            <Grid item xs={12} key={item._id}>
                                <Card>
                                    <CardContent>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={12} sm={3}>
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    style={{ width: '100%', maxWidth: '150px' }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography variant="h6">{item.name}</Typography>
                                                <Typography>{item.price} ₽</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => {
                                                        const value = parseInt(e.target.value);
                                                        if (value > 0) {
                                                            updateQuantity(item._id, value);
                                                        }
                                                    }}
                                                    inputProps={{ min: 1 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <Typography>
                                                    Итого: {item.price * item.quantity} ₽
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={1}>
                                                <IconButton 
                                                    onClick={() => removeFromCart(item._id)}
                                                    color="secondary"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Card style={{ marginTop: '20px' }}>
                        <CardContent>
                            <Typography variant="h5">
                                Общая сумма: {total} ₽
                            </Typography>
                            <div style={{ marginTop: '20px' }}>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={handleCheckout}
                                    style={{ marginRight: '10px' }}
                                >
                                    Оформить заказ
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="secondary" 
                                    onClick={clearCart}
                                >
                                    Очистить корзину
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </Container>
    );
}

export default Cart; 