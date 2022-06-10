<template>
    <div class="Movie">
        <MovieCard

            :movie="movie"
            @update-movie="updateMovie($event)"/>
    </div>
</template>

<script>
import axios from 'axios'
import MovieCard from '@/components/MovieCard'
import {reactive} from "vue";

export default {
    name: 'Movie',

    props: ['id'],

    components: { MovieCard },

    setup(props) {
        let movie = reactive({});
    }

    // beforeMount() {
    //     this.getMovie()
    // },
    //
    // data() {
    //     return {
    //         initialMovie: null,
    //         movie: null
    //     }
    // },
    //
    // methods: {
    //     getMovie() {
    //         axios.get(`http://localhost:4000/rest/movies/${this.id}`)
    //             .then(result => {
    //                 this.initialMovie = { ...result.data, isEditable: false }
    //                 this.movie = this.initialMovie
    //             })
    //     },
    //
    //     updateMovie(updatedMovie) {
    //         axios.post(`http://localhost:4000/rest/movies/${updatedMovie.id}/favorites`, {
    //             isFavorite: !updatedMovie.favorited
    //           // eslint-disable-next-line no-unused-vars
    //         }).then(result => {
    //             this.initialMovie = { ...updatedMovie, favorited: !updatedMovie.favorited }
    //             this.movie = this.initialMovie
    //         })
    //     },
    // }
}
</script>
