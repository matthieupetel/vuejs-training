<template>
  <div id="app">
    <!-- Menu -->
    <Menu />

    <!-- View of the current route-->
    <router-view/>
  </div>
</template>

<style>
    * {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        box-sizing: border-box;
    }

    body {
        margin: 0;
    }
</style>

<script>
  import Menu from './components/global/Menu'

  export default {
    Menu,
  }
</script>