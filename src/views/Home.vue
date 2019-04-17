<template>
<div class="home">
  <br>
  <br>
  <br>
  <br>
  <br>
  <image-gallery :photos="photos" />
</div>
</template>
<script>
// @ is an alias to /src
import ImageGallery from '@/components/ImageGallery.vue'

export default {
  name: 'home',
  components: {
    ImageGallery
  },
  computed: {
    photos() {
      console.log(this.$store.state.photos)
      return this.$store.state.photos;
    }
  },
  async created() {
    await this.$store.dispatch("getAllPhotos");
  },
}
</script>
