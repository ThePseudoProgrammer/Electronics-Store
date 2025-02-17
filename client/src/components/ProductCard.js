import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
    const history = useHistory();
    const { addToCart } = useCart();

    return (
        <Card>
            <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {product.description}
                </Typography>
                <Typography variant="h6" style={{ marginTop: 10 }}>
                    {product.price} ₽
                </Typography>
            </CardContent>
            <CardActions>
                <Button 
                    size="small" 
                    color="primary"
                    onClick={() => history.push(`/products/${product._id}`)}
                >
                    Подробнее
                </Button>
                <Button 
                    size="small" 
                    color="primary"
                    onClick={() => addToCart(product)}
                >
                    В корзину
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard; 