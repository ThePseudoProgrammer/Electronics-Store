import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import axios from 'axios';

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/orders', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(response.data);
        } catch (err) {
            console.error('Ошибка при загрузке заказов:', err);
        }
    };

    const handleStatusChange = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/api/orders/${selectedOrder._id}/status`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchOrders();
            setOpen(false);
        } catch (err) {
            console.error('Ошибка при обновлении статуса:', err);
        }
    };

    const handleOpen = (order) => {
        setSelectedOrder(order);
        setStatus(order.status);
        setOpen(true);
    };

    return (
        <Container>
            <Typography variant="h4" style={{ margin: '20px 0' }}>
                Управление заказами
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID заказа</TableCell>
                            <TableCell>Клиент</TableCell>
                            <TableCell>Сумма</TableCell>
                            <TableCell>Статус</TableCell>
                            <TableCell>Дата</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>{order.shippingDetails.name}</TableCell>
                                <TableCell>{order.total} ₽</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleOpen(order)}
                                    >
                                        Изменить статус
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Изменить статус заказа</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Статус</InputLabel>
                        <Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="pending">В обработке</MenuItem>
                            <MenuItem value="processing">Обрабатывается</MenuItem>
                            <MenuItem value="shipped">Отправлен</MenuItem>
                            <MenuItem value="delivered">Доставлен</MenuItem>
                            <MenuItem value="cancelled">Отменен</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Отмена
                    </Button>
                    <Button onClick={handleStatusChange} color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default OrderManagement; 