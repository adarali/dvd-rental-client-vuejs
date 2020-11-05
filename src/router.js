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
    },
    {
        path: '/admin/:view',
        name: 'view',
        component: () => import('./components/admin/Admin.vue'),
        props: true,
    }


];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
