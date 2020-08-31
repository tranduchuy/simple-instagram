import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Confirm } from '../pages/Confirm';
import { Home } from '../pages/Home';

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/confirm',
        name: 'Confirm',
        component: Confirm
    }
];

