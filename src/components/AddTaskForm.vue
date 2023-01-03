<template>
  <form @submit.prevent="addTask">
    <input type="text" v-model="title" />
    <input type="text" v-model="description" />
    <button type="submit">Add Task</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {},
};
</script>
