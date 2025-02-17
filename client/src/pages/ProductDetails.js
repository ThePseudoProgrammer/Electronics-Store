import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Typography,
    Button,
    Paper,
    Snackbar
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProduct(response.data);
        } catch (err) {
            console.error('Ошибка при загрузке товара:', err);
        }
    };

    const handleAddToCart = () => {
        addToCart(product);
        setOpenSnackbar(true);
    };

    if (!product) {
        return <Container><Typography>Загрузка...</Typography></Container>;
    }

    return (
        <Container>
            <Paper style={{ padding: 20, marginTop: 20 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', maxHeight: 400, objectFit: 'contain' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="h5" color="primary" gutterBottom>
                            {product.price} ₽
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {product.description}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Категория: {product.category}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            В наличии: {product.inStock}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleAddToCart}
                            disabled={product.inStock === 0}
                            style={{ marginTop: 20 }}
                        >
                            {product.inStock === 0 ? 'Нет в наличии' : 'Добавить в корзину'}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message="Товар добавлен в корзину"
            />
        </Container>
    );
}

export default ProductDetails; 