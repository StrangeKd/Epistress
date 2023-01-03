<template>
  <form @submit.prevent="login">
    <div>
      <label>Username</label>
      <div>
        <input v-model="form.username" type="text" required />
      </div>
    </div>
    <div>
      <label>Password</label>
      <div>
        <input v-model="form.password" type="password" required />
      </div>
    </div>
    <div>
      <div>
        <button type="submit">Login</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        await this.$axios.post("/user/login", this.form);
        this.$toast.success("Login successful");
        this.$emit("loginSuccess");
      } catch (error) {
        console.error(error);
        this.$toast.error("Error login");
      }
    },
  },
};
</script>
