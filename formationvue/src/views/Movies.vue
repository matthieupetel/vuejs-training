<template>
    <div class="Movies">
        <Search @filter-movies="filterMovies($event)"/>

        <MovieCard
            v-if="!loading && movies"
            v-for="movie in movies"
            :key="movie.id"
            :movie="movie"
            @update-movie="updateMovie($event)"/>
        <span v-else>Your data are loading...</span>

        <AddMovie @add-movie="addMovie($event)"/>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import axios from 'axios'
import Search from '@/components/Search.vue'
import MovieCard from '@/components/MovieCard.vue'
import AddMovie from '@/components/AddMovie.vue'

@Component({
    components: {Search, MovieCard, AddMovie},
})
export default class Movies extends Vue {
    // Data
    public filteredMovies:Array<any> = [];

    // Computed
    get movies(): any[] {
        return this.$store.state.movies.movies;
    }

    get loading(): boolean {
        return this.$store.state.movies.loading;
    }

    // Methods
    private getMovies(): void {
        // axios.get('http://localhost:4000/rest/movies')
        //     .then(result => {
        //         this.initialMovies = result.data.map(movie => { return { ...movie, isEditing: false }})
        //         this.movies = this.initialMovies
        //     })
    }

    private filterMovies(search: string): void {
        this.filteredMovies = this.$store.getters.filterMovies(search)
        console.log(this.filteredMovies)
    }

    private addMovie(newMovie: any): void {
        // this.initialMovies.push(newMovie)
        // this.movies = this.initialMovies
    }

    public updateMovie(updatedMovie:any): void {
        // axios.post(`http://localhost:4000/rest/movies/${updatedMovie.id}/favorites`, {
        //     isFavorite: !updatedMovie.favorited
        // }).then(result => {
        //     const pos = this.initialMovies.findIndex(movie => movie.id === updatedMovie.id)
        //     this.$set(this.initialMovies, pos, { ...updatedMovie, favorited: !updatedMovie.favorited })
        //     this.movies = this.initialMovies
        // })
    }

    // Created
    created(): void {
        this.$store.dispatch('movies/getMovies')
    }






    // components: {Search, MovieCard, AddMovie},

    // created() {
    //     this.$store.dispatch('movies/getMovies')
    // }

    // data() {
    //     return {
    //         filteredMovies: []
    //     }
    // }

    // computed: {
    //     movies() {
    //         return this.$store.state.movies.movies
    //     },
    //
    //     loading() {
    //         return this.$store.state.movies.loading
    //     }
    // }

    // methods: {
    //     public getMovies() {
    //         // axios.get('http://localhost:4000/rest/movies')
    //         //     .then(result => {
    //         //         this.initialMovies = result.data.map(movie => { return { ...movie, isEditing: false }})
    //         //         this.movies = this.initialMovies
    //         //     })
    //     },
    //
    //     filterMovies(search) {
    //         this.filteredMovies = this.$store.getters.filterMovies(search)
    //         console.log(this.filteredMovies)
    //     },
    //
    //     addMovie(newMovie) {
    //         // this.initialMovies.push(newMovie)
    //         // this.movies = this.initialMovies
    //     },
    //
    //     updateMovie(updatedMovie) {
    //         // axios.post(`http://localhost:4000/rest/movies/${updatedMovie.id}/favorites`, {
    //         //     isFavorite: !updatedMovie.favorited
    //         // }).then(result => {
    //         //     const pos = this.initialMovies.findIndex(movie => movie.id === updatedMovie.id)
    //         //     this.$set(this.initialMovies, pos, { ...updatedMovie, favorited: !updatedMovie.favorited })
    //         //     this.movies = this.initialMovies
    //         // })
    //     },
    // }
}
</script>
