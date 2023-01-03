<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" @click="showMenu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" :class="{ show: showMenu }">
      <ul class="navbar-nav mr-auto">
        <li v-for="item in items" :key="item.text" class="nav-item">
          <NuxtLink class="nav-link" :to="item.to">
            {{ item.text }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    showMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>
