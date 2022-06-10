<template>
    <div class="field">
        <label class="label">{{mySearch}}</label>
        <div class="control">
            <input class="input" type="text" v-model="search" @keypress.enter="filterMovies()" placeholder="ex: Star wars, Indiana Jones">
        </div>
    </div>
</template>

<script>
import {ref, computed} from 'vue';

export default {
    setup(props, {emit}) {
        const search = ref('');
        const mySearch = computed(() => {
            return `my research is ${search.value}`
        });
        const filterMovies = () => {
            emit('filter-movies', search.value);
        };

        return {
            search,
            mySearch,
            filterMovies,
        }
    }

    // data() {
    //     return {
    //         search: ''
    //     }
    // },
    // computed: {
    //     mySearch() {
    //         return `my research is ${this.search}`
    //     },
    // },
    // methods: {
    //     filterMovies() {
    //         this.$emit('filter-movies', this.search)
    //     }
    // }
}
</script>
