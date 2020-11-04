import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'movie',
        component: () => import('./components/movie/Movie.vue')
    },
    {
        path: '/movie',
        name: 'movie2',
        component: () => import('./components/movie/Movie.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./components/LoginForm.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
