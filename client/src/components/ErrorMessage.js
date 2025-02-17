import React from 'react';
import { Typography, Paper, makeStyles } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.contrastText
    },
    icon: {
        marginRight: theme.spacing(2),
        fontSize: 40
    }
}));

function ErrorMessage({ message }) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <ErrorIcon className={classes.icon} />
            <Typography variant="h6">
                {message || 'Произошла ошибка. Попробуйте позже.'}
            </Typography>
        </Paper>
    );
}

export default ErrorMessage; 