import React from 'react';
import { CircularProgress, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px'
    }
}));

function Loading() {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <CircularProgress />
        </Container>
    );
}

export default Loading; 