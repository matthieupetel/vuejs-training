// import { createStore } from 'vuex'
//
// export default createStore({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })

// import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        movies: {
            namespaced: true,
            state: {
                movies: null,
                loading: false
            },
            getters: {
                // eslint-disable-next-line no-unused-vars
                filterMovies: (state, getters) => (search) => {
                    return state.movies.filter((movie) => {
                        return !(movie.title.toLowerCase().indexOf(search.toLowerCase()) === -1)
                    })
                }
            },

            mutations: {
                setMovies(state, movies) {
                    state.movies = movies
                },

                toggleLoading(state) {
                    state.loading = !state.loading
                }
            },

            actions: {
                getMovies(context) {
                    context.commit('toggleLoading')
                    axios.get('http://localhost:4000/rest/movies')
                        .then(result => {
                            const movies = result.data.map((movie) => { return { ...movie, isEditing: false } })
                            context.commit('setMovies', movies)
                            context.commit('toggleLoading')
                        })
                }
            },
        }
    }
})
