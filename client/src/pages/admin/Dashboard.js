import React from 'react';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.action.hover
        }
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));

function Dashboard() {
    const classes = useStyles();

    return (
        <Container>
            <Typography variant="h4" gutterBottom style={{ margin: '20px 0' }}>
                Панель администратора
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Link to="/admin/products" className={classes.link}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5">Управление товарами</Typography>
                            <Typography color="textSecondary">
                                Добавление, редактирование и удаление товаров
                            </Typography>
                        </Paper>
                    </Link>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Link to="/admin/orders" className={classes.link}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5">Управление заказами</Typography>
                            <Typography color="textSecondary">
                                Просмотр и обработка заказов
                            </Typography>
                        </Paper>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Dashboard; 