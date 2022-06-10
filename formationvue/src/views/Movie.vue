<template>
    <div class="Movie">
        <MovieCard

            :movie="movie"
            @update-movie="updateMovie($event)"/>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import MovieCard from '@/components/MovieCard.vue'
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
    components: { MovieCard },
})
export default class Movie extends Vue {
    @Prop() id?: string;

    // Data
    initialMovie: any;
    movie: any;

    private beforeMount():void {
        this.getMovie()
    }

    // Methods
    private getMovie() {
        axios.get(`http://localhost:4000/rest/movies/${this.id}`)
            .then(result => {
                this.initialMovie = { ...result.data, isEditable: false }
                this.movie = this.initialMovie
            })
    }

    private updateMovie(updatedMovie: any) {
        axios.post(`http://localhost:4000/rest/movies/${updatedMovie.id}/favorites`, {
            isFavorite: !updatedMovie.favorited
        }).then(result => {
            this.initialMovie = { ...updatedMovie, favorited: !updatedMovie.favorited }
            this.movie = this.initialMovie
        })
    }








    // name: 'Movie',
    //
    // props: ['id'],
    //
    // components: { MovieCard },
    //
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
    //         }).then(result => {
    //             this.initialMovie = { ...updatedMovie, favorited: !updatedMovie.favorited }
    //             this.movie = this.initialMovie
    //         })
    //     },
    // }
}
</script>
