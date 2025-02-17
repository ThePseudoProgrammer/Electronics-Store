import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Link
} from '@material-ui/core';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            history.push('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper style={{ padding: 20, marginTop: 50 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Вход в систему
                </Typography>
                {error && (
                    <Typography color="error" align="center" paragraph>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Пароль"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Войти
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Typography align="center" style={{ marginTop: 20 }}>
                    Нет аккаунта?{' '}
                    <Link component={RouterLink} to="/register">
                        Зарегистрироваться
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
}

export default Login; 