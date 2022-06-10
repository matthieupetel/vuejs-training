<template>
    <div class="Favorites">
        <MovieCard
            v-for="movie in movies"
            :key="movie.id"
            :movie="movie"
            @update-movie="updateMovie($event)"/>
    </div>
</template>

<script>
import axios from 'axios'
import MovieCard from '@/components/MovieCard'

export default {
    components: { MovieCard },

    beforeMount() {
        this.getMovies()
    },

    data() {
        return {
            movies: [],
            initialMovies: []
        }
    },

    methods: {
        getMovies() {
            axios.get('http://localhost:4000/rest/movies')
                .then(result => {
                    this.initialMovies = result.data.filter(movie => movie.favorited)
                    this.initialMovies = this.initialMovies.map(movie => { return { ...movie, isEditing: false }})
                    this.movies = this.initialMovies
                })
        },

        updateMovie(updatedMovie) {
            axios.post(`http://localhost:4000/rest/movies/${updatedMovie.id}/favorites`, {
                isFavorite: !updatedMovie.favorited
            }).then(result => {
                const pos = this.initialMovies.findIndex(movie => movie.id === updatedMovie.id)
                this.$set(this.initialMovies, pos, { ...updatedMovie, favorited: !updatedMovie.favorited })
                this.movies = this.initialMovies
            })
        },
    }
}
</script>
