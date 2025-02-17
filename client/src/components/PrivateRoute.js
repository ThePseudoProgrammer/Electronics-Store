import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ component: Component, adminOnly = false, ...rest }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <Route
            {...rest}
            render={props => {
                if (!user) {
                    return <Redirect to="/login" />;
                }

                if (adminOnly && !user.isAdmin) {
                    return <Redirect to="/" />;
                }

                return <Component {...props} />;
            }}
        />
    );
}

export default PrivateRoute; 