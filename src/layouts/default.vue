<template>
  <div>
    <nav class="nav-container">
      <NavBar :items="menuItems" />
    </nav>
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import SideMenu from "../components/SideMenu.vue";

export default {
  components: {
    NavBar,
    SideMenu,
  },
  data() {
    return {
      menuItems: [
        { to: "/", text: "Home", active: true },
        { to: "/login", text: "Login" },
        { to: "/register", text: "Register" },
        { to: "/task", text: "Tasks" },
      ],
    };
  },
};
</script>
