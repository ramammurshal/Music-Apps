<template>
  <form @submit.prevent="handleSubmit">
    <h3>Create a new playlist</h3>
    <input type="text" required placeholder="Playlist title" v-model="title" />
    <textarea required placeholder="Playlist Description" v-model="description"></textarea>
    <!-- uploads playlist image -->
    <label>Upload Playlist Cover Image</label>
    <div class="error" v-if="fileError">{{ fileError }}</div>
    <!-- @change instead of v-model -->
    <input type="file" @change="handleChange" />
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useStorage from "../../composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";

export default {
  setup() {
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("playlists");
    const { user } = getUser();

    const router = useRouter();

    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        // console.log(title.value, description.value, file.value);
        await uploadImage(file.value);
        // console.log("Image uploaded, the url is:", url.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          username: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value, // so we can delete it later
          songs: [],
          createdAt: timestamp(),
        });
        isPending.value = false;
        if (!error.value) {
          // console.log("Playlist added");
          router.push({ name: "PlaylistDetails", params: { id: res.id } });
        }
      }
    };

    // allowed file types
    const types = ["image/png", "image/jpeg", "image/jpg", "image/PNG", "image/JPEG", "image/JPG"];

    const handleChange = (e) => {
      // e.target refer to the input file, .files to specify the input is file, [0] when only we input 1 file
      let selected = e.target.files[0];
      // console.log(selected);

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please selected an image file (png or jpg)";
      }
    };

    return { title, description, handleSubmit, handleChange, fileError, isPending };
  },
};
</script>

<style>
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>
