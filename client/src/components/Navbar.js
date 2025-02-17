import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Badge,
    Menu,
    MenuItem
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
        history.push('/');
    };

    const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                        Электроника Store
                    </Link>
                </Typography>

                <Button color="inherit" component={Link} to="/products">
                    Товары
                </Button>

                <IconButton color="inherit" component={Link} to="/cart">
                    <Badge badgeContent={cartItemsCount} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>

                {user ? (
                    <>
                        <IconButton
                            color="inherit"
                            onClick={handleMenu}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {user.isAdmin && (
                                <MenuItem
                                    component={Link}
                                    to="/admin"
                                    onClick={handleClose}
                                >
                                    Админ панель
                                </MenuItem>
                            )}
                            <MenuItem
                                component={Link}
                                to="/orders"
                                onClick={handleClose}
                            >
                                Мои заказы
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                Выйти
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Button color="inherit" component={Link} to="/login">
                        Войти
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar; 