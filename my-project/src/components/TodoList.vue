<template>
  <ol class="todo-list">
    <TodoListItem
      v-for="item in parsedGroceryList"
      v-bind:item="item"
      v-bind:key="item.id">
      <span v-if="item.tips">
        {{ item.tips }}
      </span>
    </TodoListItem>
  </ol>
</template>

<script>
import TodoListItem from './TodoListItem';

export default {
  name: 'TodoList',
  components: {
    TodoListItem,
  },
  computed: {
    parsedGroceryList: function () {
      return this.groceryList;
    }
  },
  data() {
    return {
      groceryList: [
        {id: 0, text: 'Drugstore', tips: 'Go to :'},
        {id: 1, text: 'Cheese', important: true},
        {id: 2, text: 'Whatever else humans are supposed to eat'}
      ]
    }
  }
}
</script>

<style scoped>
.todo-list {
  display: inline-block;
}
</style>
