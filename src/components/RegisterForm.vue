<template>
  <form method="post" @submit.prevent="register">
    <div>
      <label>Username</label>
      <div>
        <input v-model="username" type="text" name="username" required />
      </div>
    </div>
    <div>
      <label>Password</label>
      <div>
        <input v-model="password" type="password" name="password" required />
      </div>
    </div>
    <div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        await this.$axios.post("/user/register", {
          username: this.username,
          password: this.password,
        });
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        this.$toast.success("Account created successfully");
        this.$router.push("/");
      } catch (error) {
        console.error(error);
        this.$toast.error("Error creating account");
      }
    },
  },
};
</script>
