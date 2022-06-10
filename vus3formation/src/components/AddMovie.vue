<template>
    <div class="card card-result">
        <div class="card-content">
            <div>
                <label for="title">Titre</label>
                <input v-model="newMovie.title" type="text">
            </div>
            <div>
                <label for="description">Description</label>
                <input v-model="newMovie.description" type="text">
            </div>
            <div>
                <label for="date">Date</label>
                <input v-model="newMovie.date" type="text">
            </div>
            <div>
                <label for="image">Image</label>
                <input v-model="newMovie.image" type="text">
            </div>
            <div>
                <label for="genres">Genres</label>
                <input v-model="newMovie.genres" type="text">
            </div>
            <button @click="addMovie()">Ajouter un film</button>
        </div>
    </div>
</template>

<script>
import {reactive} from 'vue';

export default {
    setup(props, {emit}) {
        const newMovie = reactive({
            title: '',
            description: '',
            image: '',
            date: '',
            genres: [],
            isEditing: false,
            isFavorite: false
        });

        const addMovie = () => {
            emit('add-movie', newMovie)
        };

        return {
            newMovie,
            addMovie,
        };
    }


    // data() {
    //     return {
    //         newMovie: { title: '', description: '', image: '', date: '', genres: [], isEditing: false, isFavorite: false },
    //     }
    // },
    // methods: {
    //     addMovie() {
    //         this.$emit('add-movie', this.newMovie)
    //     }
    // }
}
</script>
