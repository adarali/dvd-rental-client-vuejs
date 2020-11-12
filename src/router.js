import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'movie',
        component: () => import(/* webpackChunkName: "movie" */'./components/movie/Movie.vue')
    },
    {
        path: '/movie',
        name: 'movie2',
        component: () => import(/* webpackChunkName: "movie" */'./components/movie/Movie.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */'./components/LoginForm.vue')
    },
    {
        path: '/admin/:view',
        name: 'view',
        component: () => import(/* webpackChunkName: "admin" */'./components/admin/Admin.vue'),
        props: true,
    }


];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
