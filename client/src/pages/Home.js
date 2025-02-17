import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Grid,
    Paper,
    Button,
    makeStyles
} from '@material-ui/core';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    hero: {
        padding: theme.spacing(8),
        marginBottom: theme.spacing(4),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: theme.shape.borderRadius,
        position: 'relative',
        overflow: 'hidden'
    },
    heroContent: {
        position: 'relative',
        zIndex: 1
    },
    heroBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: 'url(/hero-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    section: {
        marginBottom: theme.spacing(4)
    }
}));

function Home() {
    const classes = useStyles();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            const products = response.data;
            
            // Получаем последние добавленные продукты
            const latest = [...products].sort((a, b) => 
                new Date(b.createdAt) - new Date(a.createdAt)
            ).slice(0, 3);
            
            // Для демонстрации берем случайные продукты как рекомендуемые
            const featured = [...products]
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            
            setNewProducts(latest);
            setFeaturedProducts(featured);
        } catch (err) {
            console.error('Ошибка при загрузке продуктов:', err);
        }
    };

    return (
        <Container>
            <Paper className={classes.hero}>
                <div className={classes.heroBackground} />
                <div className={classes.heroContent}>
                    <Typography variant="h2" gutterBottom>
                        Добро пожаловать в Electronics Store
                    </Typography>
                    <Typography variant="h5" paragraph>
                        Лучшие цены на электронику и гаджеты
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        component={Link}
                        to="/products"
                    >
                        Перейти в каталог
                    </Button>
                </div>
            </Paper>

            <div className={classes.section}>
                <Typography variant="h4" gutterBottom>
                    Рекомендуемые товары
                </Typography>
                <Grid container spacing={3}>
                    {featuredProducts.map(product => (
                        <Grid item xs={12} sm={6} md={4} key={product._id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </div>

            <div className={classes.section}>
                <Typography variant="h4" gutterBottom>
                    Новые поступления
                </Typography>
                <Grid container spacing={3}>
                    {newProducts.map(product => (
                        <Grid item xs={12} sm={6} md={4} key={product._id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </div>

            <Paper className={classes.section} style={{ padding: 24 }}>
                <Typography variant="h4" gutterBottom>
                    Почему выбирают нас
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Быстрая доставка
                        </Typography>
                        <Typography>
                            Доставляем заказы по всей России в кратчайшие сроки
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Гарантия качества
                        </Typography>
                        <Typography>
                            Только оригинальная продукция от официальных поставщиков
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Поддержка 24/7
                        </Typography>
                        <Typography>
                            Наши специалисты всегда готовы помочь вам с выбором
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default Home; 