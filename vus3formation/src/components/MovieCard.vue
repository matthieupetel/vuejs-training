<template>
    <div class="card card-result" v-if="movieCpy">
        <div class="card-header">
            <p class="card-header-title">
                <router-link :to="{ name: 'movie', params: { id: movie.id }}" v-if="!movieCpy.isEditing">
                    {{ isFavorited }}
                </router-link>
                <input type="text" v-model="movieCpy.title" v-else>
                &nbsp;<i style="font-size: 14px" @click="updateMovie()" class="fa fa-pencil"></i>
            </p>
            <a class="card-header-icon">
                <span class="icon" :class="{'is-favorite' : movieCpy.favorited}">
                    <i @click="updateFavorites()" class="fa fa-star"></i>
                </span>
            </a>
        </div>

        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure v-if="!movieCpy.isEditing" class="image is-128x200">
                        <img :src="movieCpy.value.image" alt="Image">
                    </figure>
                    <input type="text" v-else v-model="movieCpy.image">
                </div>
                <div class="media-content">
                    <p>{{ movieCpy.value.date }}</p>
                    <p class="tags">
                        <span
                            v-for="genre in movieCpy.genres"
                            :key="genre"
                            class="tag">{{ genre }}</span>
                    </p>
                    <div class="content" v-if="!movieCpy.isEditing">
                        {{ movieCpy.value.description }}
                    </div>
                    <textarea name="description" v-model="movieCpy.description" v-else cols="30" rows="10"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive, computed, watch} from 'vue';

export default {
    props: ['movie'],
    setup(props, {emit}) {
        let movieCpy = reactive(props.movie);
        const isFavorited = computed(() => {
            return movieCpy.value.favorited ? `${movieCpy.value.title} is starred` : `${movieCpy.value.title} is NOT starred`;
        });
        const updateMovie = () => {
            if (props.movie.isEditing) {
                movieCpy.value.isEditing = !movieCpy.value.isEditing;
                emit('update-movie', movieCpy.value);
            } else {
                movieCpy.value.isEditing = !movieCpy.value.isEditing;
            }
        };
        const updateFavorites = () => {
            emit('update-movie', movieCpy.value)
        };

      // eslint-disable-next-line vue/no-setup-props-destructure
        movieCpy.value = props.movie;

        watch(props.movie, (to) => {
            movieCpy.value = to;
        });

        return {
            movieCpy,
            isFavorited,
            updateMovie,
            updateFavorites,
        };
    }

    // props: ['movie'],
    //
    // data() {
    //     return {
    //         movieCpy: null
    //     }
    // },
    // computed: {
    //     isFavorited() {
    //         return this.movieCpy.favorited ? `${this.movieCpy.title} is starred` : `${this.movieCpy.title} is NOT starred`
    //     }
    // },
    //
    // created() {
    //     this.movieCpy = this.movie
    // },
    //
    // methods: {
    //     updateMovie() {
    //         if (this.movie.isEditing) {
    //             this.movieCpy.isEditing = !this.movieCpy.isEditing
    //             this.$emit('update-movie', this.movieCpy)
    //         } else {
    //             this.movieCpy.isEditing = !this.movieCpy.isEditing
    //         }
    //     },
    //
    //     updateFavorites() {
    //         this.$emit('update-movie', this.movieCpy)
    //     }
    // },
    //
    // watch: {
    //     movie() {
    //         this.movieCpy = this.movie
    //     }
    // }
}
</script>
