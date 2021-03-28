import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import jwtDecode from 'jwt-decode';
import login from '../pages/login';
import signup from '../pages/signup';
import dashboard from '../pages/dashboard';
import classroom from '../pages/classroom';
import lessons from '../pages/lessons';
import students from '../pages/students';
import chat from '../pages/chat';
import grades from '../pages/grades';
import calendar from '../pages/calendar';
import LessonCard from '../components/lessons/LessonCard';

const checkAuth = () => {
    const token = localStorage.cache;
    if (token) {
        const decodedToken = jwtDecode(token)
        const auth = decodedToken.exp * 1000 > Date.now()
        return auth ? true : false
    }
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => checkAuth() ? (
            <Component {...props} />
        ) : (
            <Redirect to="/" />
        )}
        />
    )
}

const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={login} />
            <Route exact path="/signup" component={signup} />
            <ProtectedRoute exact path="/dashboard" component={dashboard} />
            <ProtectedRoute exact path="/classroom" component={classroom} />
            <ProtectedRoute exact path="/lessons" component={lessons} />
            <ProtectedRoute exact path="/students" component={students} />
            <ProtectedRoute exact path="/chat" component={chat} />
            <ProtectedRoute exact path="/grades" component={grades} />
            <ProtectedRoute exact path="/calendar" component={calendar} />
            <ProtectedRoute exact path="/lesson/:id" component={LessonCard} />
        </Switch>
    );
};

export default Router;