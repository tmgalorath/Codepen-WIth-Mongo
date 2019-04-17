<template>

<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">Upload CodePen to Shared Repository</h1>
          <h1 class="modal-title">Go to <a href= "https://codepen.io/">codepen.io</a> to find the 6 character ID of pens you would like to add! This Id is at then end of each URL</h1>
        </div>
        <div class="modal-body">
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="upload">
            <v-text-field v-model="title" label="Title"></v-text-field>
            <v-text-field v-model="pen" label="CodepenID" ></v-text-field>
            <p></p>
            <v-textarea v-model="description" placeholder="Description"></v-textarea>
            <p></p>

            <p></p>
            <v-btn  color="error" @click="close" class="pure-button">Close</v-btn>
            <v-btn color="success" type="submit" class="pure-button pure-button-secondary">Upload</v-btn>
          </form>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'Uploader',
  props: {
    show: Boolean,
  },
  data() {
    return {
      title: '',
      description: '',
      pen: '',
      error: '',
    }
  },

  methods: {
    close() {
      this.$emit('escape');
    },
    async upload() {
      try {

        var first = "https://codepen.io/giaco/embed/"
        var half = "?height=765&amp;theme-id=0&amp;default-tab=js%2Cresult&amp;user=giaco&amp;slug-hash=apwMwM&amp;pen-title=Click%20and%20draw%20some%20flowers&amp;name=cp_embed_2"
        console.log(first + this.pen + half)
        let penURL = first + this.pen + half

        let data = {
          title: this.title,
          description: this.description,
          path: penURL
        }
        this.error = await this.$store.dispatch("upload", data);
        if (!this.error) {
          this.title = '';
          this.description = '';
          this.pen = '';
          this.$emit('uploadFinished');
        }
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
input {
  width: 100%;
}

textarea {
  width: 100%;
  height: 100px
}

.pure-button-secondary {
  float: right;
}
</style>
