<template>
  <div class="home">
    <h1>Home Page View</h1>
    <div v-if="error" class="error">Couldn't fetch the data</div>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
  </div>
</template>

<script>
import ListView from "../components/ListView.vue";
import getCollection from "../composables/getCollection";
export default {
  name: "Home",
  components: {
    ListView,
  },
  setup() {
    const { error, documents } = getCollection("playlists");

    return { error, documents };
  },
};
</script>
