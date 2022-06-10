<template>
    <div class="Movies">
        <Search @filter-movies="filterMovies($event)"/>

        <div v-if="!loading && movies.length > 0">
            <MovieCard
                v-for="movie in movies"
                :key="movie.id"
                :movie="movie"
                @update-movie="updateMovie($event)"/>
        </div>
        <span v-else>Your data are loading...</span>

        <AddMovie @add-movie="addMovie($event)"/>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import {useStore} from 'vuex';
import Search from '@/components/Search'
import MovieCard from '@/components/MovieCard'
import AddMovie from '@/components/AddMovie'
import {reactive, computed} from 'vue';

export default {
    components: {Search, MovieCard, AddMovie},

    setup() {
        const store = useStore();
        let initialMovies = reactive([]);

        // Data
        let filteredMovies = reactive([]);

        // Computed
        let movies = computed(() => {
            return store.state.movies.movies;
        });
        const loading = computed(() => {
            return store.state.movies.loading;
        });

        // Methods
        const getMovies = () => {
            axios.get('http://localhost:4000/rest/movies')
            .then(result => {
                initialMovies = result.data.map(movie => { return { ...movie, isEditing: false }});
                movies = initialMovies;
            });
        };
        const filterMovies = (search) => {
            filteredMovies.value = store.getters.filterMovies(search);
            console.log(filteredMovies.value);
        };
        const addMovie = (newMovie) => {
            initialMovies.push(newMovie);
            movies = initialMovies;
        };
        const updateMovie = (updatedMovie) => {
            axios.post(`http://localhost:4000/rest/movies/${updatedMovie.id}/favorites`, {
                isFavorite: !updatedMovie.favorited
            }).then(() => {
                const pos = initialMovies.findIndex(movie => movie.id === updatedMovie.id);
                this.$set(initialMovies, pos, { ...updatedMovie, favorited: !updatedMovie.favorited });
                movies = initialMovies;
            })
        };

        store.dispatch('movies/getMovies');

        return {
            filteredMovies,
            movies,
            loading,
            getMovies,
            filterMovies,
            addMovie,
            updateMovie,
        };
    }





    // components: {Search, MovieCard, AddMovie},

    // created() {
    //     this.$store.dispatch('movies/getMovies')
    // },

    // data() {
    //     return {
    //         filteredMovies: []
    //     }
    // },

    // computed: {
    //     movies() {
    //         return this.$store.state.movies.movies
    //     },
    //
    //     loading() {
    //         return this.$store.state.movies.loading
    //     }
    // },

    // methods: {
    //     getMovies() {
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
    //     // eslint-disable-next-line no-unused-vars
    //     addMovie(newMovie) {
    //         // this.initialMovies.push(newMovie)
    //         // this.movies = this.initialMovies
    //     },
    //
    //     // eslint-disable-next-line no-unused-vars
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
