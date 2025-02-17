import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';

function OrderHistory() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/orders/my-orders', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(response.data);
        } catch (err) {
            console.error('Ошибка при загрузке заказов:', err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return '#ffa726';
            case 'processing':
                return '#29b6f6';
            case 'shipped':
                return '#66bb6a';
            case 'delivered':
                return '#43a047';
            case 'cancelled':
                return '#e53935';
            default:
                return '#000';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'В обработке';
            case 'processing':
                return 'Обрабатывается';
            case 'shipped':
                return 'Отправлен';
            case 'delivered':
                return 'Доставлен';
            case 'cancelled':
                return 'Отменен';
            default:
                return status;
        }
    };

    return (
        <Container>
            <Typography variant="h4" style={{ margin: '20px 0' }}>
                История заказов
            </Typography>

            {orders.length === 0 ? (
                <Typography>У вас пока нет заказов</Typography>
            ) : (
                orders.map(order => (
                    <Accordion key={order._id} style={{ marginBottom: 10 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={3}>
                                    <Typography>
                                        Заказ №{order._id.slice(-6)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography style={{ color: getStatusColor(order.status) }}>
                                        {getStatusText(order.status)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography>
                                        {order.total} ₽
                                    </Typography>
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div style={{ width: '100%' }}>
                                <Typography variant="h6" gutterBottom>
                                    Товары:
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Название</TableCell>
                                                <TableCell>Количество</TableCell>
                                                <TableCell>Цена</TableCell>
                                                <TableCell>Сумма</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {order.items.map(item => (
                                                <TableRow key={item._id}>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell>{item.price} ₽</TableCell>
                                                    <TableCell>
                                                        {item.price * item.quantity} ₽
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <Typography variant="h6" style={{ marginTop: 20 }}>
                                    Адрес доставки:
                                </Typography>
                                <Typography>
                                    {order.shippingDetails.name}
                                </Typography>
                                <Typography>
                                    {order.shippingDetails.address}
                                </Typography>
                                <Typography>
                                    Телефон: {order.shippingDetails.phone}
                                </Typography>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))
            )}
        </Container>
    );
}

export default OrderHistory; 