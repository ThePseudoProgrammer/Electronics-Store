import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
} from '@material-ui/core';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
            
            // Получаем уникальные категории
            const uniqueCategories = [...new Set(response.data.map(p => p.category))];
            setCategories(uniqueCategories);
        } catch (err) {
            console.error('Ошибка при загрузке товаров:', err);
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <Container>
            <Typography variant="h4" style={{ margin: '20px 0' }}>
                Каталог товаров
            </Typography>
            
            <Grid container spacing={3} style={{ marginBottom: 20 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Поиск"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Категория</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <MenuItem value="">Все категории</MenuItem>
                            {categories.map(category => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {filteredProducts.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Products; 