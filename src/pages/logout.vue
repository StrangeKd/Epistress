<template>
  <div>Logging out...</div>
</template>

<script>
export default {
  async beforeMount() {
    // Handle the logout process here
    // - delete login tokens or user session data from the app's state or cookies
    // - make a request to the server to log the user out

    this.$router.push("/home");
  },
};
</script>
