import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(
            /* webpackChunkName: "about" */
            '@/views/About.vue')
    },
    {
        path: '/movies',
        name: 'Movies',
        component: () => import(
            /* webpackChunkName: "movies" */
            /* webpackPrefetch: true */
            '@/views/Movies.vue')
    },
    {
        path: '/movie/:id',
        name: 'MovieDetails',
        component: () => import(
            /* webpackChunkName: "movieDetails" */
            /* webpackPrefetch: true */
            '@/views/MovieDetails.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
