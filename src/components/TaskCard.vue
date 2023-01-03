<template>
  <div :class="`task ${task.done ? 'is-complete' : ''}`">
    <div>{{ task.title }}</div>
    <div>{{ task.description }}</div>
  </div>
</template>

<script>
export default {
  props: ["task"],
};
</script>
