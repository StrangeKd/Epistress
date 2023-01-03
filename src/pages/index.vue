<template>
  <div>
    <div>
      <h1>Welcome to Epistress</h1>
      <p>A simple and effective task management app</p>
    </div>
    <div>
      <TaskList v-if="loggedInUser" />
    </div>
  </div>
</template>

<script>
import TaskList from "../components/TaskList.vue";

export default {
  components: {
    TaskList,
  },
  data() {
    return {
      loggedInUser: this.$auth.loggedIn,
    };
  },
  name: "IndexPage",
};
</script>
