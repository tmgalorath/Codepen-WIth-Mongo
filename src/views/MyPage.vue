<template>
<div>
  <!-- <br>
  <br>
  <br>
  <br>
  <br> -->


  <div class="text-xs-center">
    <div v-if="user">
      <div class="header">
        <div>
          <h1>Welcome {{user.name}}</h1>

          <v-btn @click="toggleUpload" :loading="loading3" :disabled="loading3" color="blue-grey" class="white--text" >
            Upload
            <v-icon right dark>cloud_upload</v-icon>
          </v-btn>

          <escape-event @escape="escape"></escape-event>
          <uploader :show="show" @escape="escape" @uploadFinished="uploadFinished" />
          <image-gallery :photos="photos" :canDelete="canDelete" />
        </div>
        <div>
          <p>


            <a href="#" @click="logout"><i class="fas fa-sign-out-alt"></i></a>
          </p>
        </div>
      </div>
      <uploader :show="show" @escape="escape" @uploadFinished="uploadFinished" />
    </div>
    <div v-else>
      <br>
      <br>
      <br>
      <br>
      <div class="text-xs-center">
      <p>If you would like to upload CodePens, please register for an account or login.</p>

      <v-btn to="/register" dark color="green">Register</v-btn> or
      <v-btn to="/login" dark color="blue">Login</v-btn>
    </div>
    </div>
  </div>
</div>
</template>


<script>
import EscapeEvent from '@/components/EscapeEvent.vue'
import Uploader from '@/components/Uploader.vue'
import ImageGallery from '@/components/ImageGallery.vue'
export default {
  name: 'mypage',
  components: {
    Uploader,
    ImageGallery,
    EscapeEvent,
  },
  data() {
    return {
      canDelete: true,
      loading3: false,
      show: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    photos() {

      return this.$store.state.photos;
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getMyPhotos");
  },
  methods: {
    escape() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    async uploadFinished() {
      this.show = false;
      try {
        this.error = await this.$store.dispatch("getMyPhotos");
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
