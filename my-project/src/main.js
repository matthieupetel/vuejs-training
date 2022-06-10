import Vue from 'vue'
import App from './App.vue'

// Components
// Vue.component('todo-item', {
//   props: ['todo'],
//   template: '<li>{{ todo.text }}</li>',
// });

// Directives
Vue.directive('focus', {
  inserted: function (element) {
    element.focus();
  }
});

const vm = new Vue({
  el: '#app',
  render: h => h(App),
  created() {
    console.log(`vm created !`)
  }
});


