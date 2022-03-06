<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login View</h3>
    <div class="error" v-if="error">{{ error }}</div>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button v-if="!isPending">Log in</button>
    <button v-else disabled>Loading</button>
  </form>
</template>

<script>
// using @ means it start from src/
import useLogin from "@/composables/useLogin";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const { error, login, isPending } = useLogin();
    const router = useRouter();

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        // console.log("User logged in");
        router.push({ name: "UserPlaylists" });
      }
    };

    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style></style>
