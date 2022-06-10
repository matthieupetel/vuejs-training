<template>
  <div id='app'>
    <img src='./assets/logo.png'>
    <h1>{{ msg }}</h1>
    <p>{{ reverseMsg }}</p>
    <div>
      <input v-model='msg' v-focus>
    </div>

    <div>
      <TodoList/>
    </div>
  </div>
</template>

<script>
import TodoList from './components/TodoList';

export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  components: {
    TodoList,
  },
  computed: {
    reverseMsg: function () {
      return this.msg.split('').reverse().join('');
    },
  },
  methods: {},
  created() {
    console.log(`app created !`)
  }
}
</script>

<style lang='scss'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
