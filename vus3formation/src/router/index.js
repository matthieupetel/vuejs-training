import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import Movie from '@/views/Movie.vue'
import Movies from '@/views/Movies.vue'
import Favorites from '@/views/Favorites.vue'


const routes = [
  { path: '/movies', component: Movies, alias: '/', name: 'movies' },
  { path: '/movies/:id', component: Movie, props: true, name: 'movie' },
  { path: '/favorites', component: Favorites, alias: '/starred', name: 'favorites' },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
