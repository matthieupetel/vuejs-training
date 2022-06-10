<template>
    <div class="field">
        <label class="label">{{mySearch}}</label>
        <div class="control">
            <input class="input" type="text" v-model="search" @keypress.enter="filterMovies()" placeholder="ex: Star wars, Indiana Jones">
        </div>
    </div>
</template>

<script lang="ts">
import {ref, reactive, computed} from '@vue/composition-api';
import {Emit, Vue} from "vue-property-decorator";

export default class Search extends Vue {
    // setup(props, {emit}) {
    //     const search = ref('');
    //     const mySearch = computed(() => {
    //         return `my research is ${search.value}`
    //     });
    //     const filterMovies = () => {
    //         emit('filter-movies', search.value);
    //     };
    //
    //     return {
    //         search,
    //         mySearch,
    //         filterMovies,
    //     }
    // }


    // Data
    search: string = '';

    // Computed
    get mySearch(): string {
        return `my research is ${this.search}`
    }

    // Methods
    @Emit()
    filterMovies(): void {
        this.$emit('filter-movies', this.search)
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
