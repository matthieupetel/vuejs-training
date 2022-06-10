<template>
  <li v-bind:class="item.important ? 'important' : ''">
    <slot>Don't forget to buy :</slot>
    {{ item.text }}
    <input type="checkbox"
           v-model="checked"
           @change="setDone"
    />
  </li>
</template>

<script>
export default {
  name: 'TodoListItem',
  data: function () {
    return {
      checked: false,
    }
  },
  props: {
    // checked: Boolean,
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setDone: function () {
      let index = null;


      // for (const i of this.parsedGroceryList) {
      //
      //   if (this.item.id === this.parsedGroceryList[i]) {
      //     index = this.parsedGroceryList[i];
      //     console.log(index);
      //   }
      // }

      // console.dir(this.item.id)
      // this.parsedGroceryList().splice(
      //
      // )
    }
  }
}
</script>

<style scoped>
.important {
  font-weight: bold;
  color: tomato;
}
</style>
