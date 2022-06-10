import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    movies: {
      namespaced: true,
      state: {
        movies: null,
        loading: false
      },
      getters: {
        filterMovies: (state, getters) => (search: any) => {
          return state.movies.filter((movie: any) => {
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
              const movies = result.data.map((movie: any) => { return { ...movie, isEditing: false } })
              context.commit('setMovies', movies)
              context.commit('toggleLoading')
            })
        }
      },
    }
  }
})
