import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function OrderSuccess() {
    const history = useHistory();

    return (
        <Container style={{ textAlign: 'center', marginTop: '50px' }}>
            <CheckCircleIcon style={{ fontSize: 100, color: 'green' }} />
            <Typography variant="h4" style={{ margin: '20px 0' }}>
                Заказ успешно оформлен!
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '20px' }}>
                Спасибо за ваш заказ. Мы отправили подтверждение на вашу почту.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => history.push('/')}
            >
                Вернуться на главную
            </Button>
        </Container>
    );
}

export default OrderSuccess; 