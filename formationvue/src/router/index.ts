import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Movie from '@/views/Movie.vue'
import Movies from '@/views/Movies.vue'
import Favorites from '@/views/Favorites.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/movies', component: Movies, alias: '/', name: 'movies' },
  { path: '/movies/:id', component: Movie, props: true, name: 'movie' },
  { path: '/favorites', component: Favorites, alias: '/starred', name: 'favorites' },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
