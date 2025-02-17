const router = require('express').Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Создать заказ
router.post('/', auth, async (req, res) => {
    try {
        const order = new Order({
            user: req.userData.userId,
            items: req.body.items,
            total: req.body.total,
            shippingDetails: req.body.shippingDetails,
            status: 'pending'
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Получить заказы пользователя
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userData.userId });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Получить все заказы (только для админа)
router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 