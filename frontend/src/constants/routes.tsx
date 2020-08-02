import {Register} from "../pages/Register";
import {Login} from "../pages/Login";

export const routes = [
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
];

