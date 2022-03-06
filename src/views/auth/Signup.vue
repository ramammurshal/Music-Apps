<template>
  <form @submit.prevent="handleSubmit">
    <h3>Signup View</h3>
    <div class="error" v-if="error">{{ error }}</div>
    <input type="text" placeholder="Display Name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button v-if="!isPending">Sign up</button>
    <button v-else disabled>Loading</button>
  </form>
</template>

<script>
import useSignup from "@/composables/useSignup";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, signup, isPending } = useSignup();
    const router = useRouter();

    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      // notes: we will us res in the future
      const res = await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        // console.log("User signup");
        router.push({ name: "UserPlaylists" });
      }
    };

    return { displayName, email, password, handleSubmit, error, isPending };
  },
};
</script>

<style></style>
