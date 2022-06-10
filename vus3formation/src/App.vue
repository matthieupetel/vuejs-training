<template>
  <div id="app">
    <div class="container" style="background: #fdcb6e;">
      <Navbar :title="title"/>
    </div>
    <section class="hero" style="background: #fdcb6e;">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{title}}</h1>
          <router-view></router-view>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'

export default {
  components: { Navbar },

  data() {
    return {
      title: 'Hello Ciné',
    }
  },
}
</script>


<style lang="scss">
.navbar-item.is-active {
  color: #fdcb6e !important;
}

.card-result {
  margin-bottom: 20px;
}

.is-128x200 {
  height: 200px;
  width: 128px;
}

.is-favorite {
  color: #FFDD57;
}
</style>
