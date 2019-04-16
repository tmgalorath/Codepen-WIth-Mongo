<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">Upload</h1>
        </div>
        <div class="modal-body">
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="upload">
            <input v-model="title" placeholder="Title">
            <p></p>
            <textarea v-model="description" placeholder="Description"></textarea>
            <p></p>
            <input placeholder="CodepenID" v-model="pen">
            <p></p>
            <button type="button" @click="close" class="pure-button">Close</button>
            <button type="submit" class="pure-button pure-button-secondary">Upload</button>
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
        // const formData = new FormData();
        // formData.append('photo', this.file, this.file.name);
        // formData.append('title', this.title);
        // formData.append('description', this.description);
        var first = "https://codepen.io/giaco/embed/"
        var half = "?height=765&amp;theme-id=0&amp;default-tab=js%2Cresult&amp;user=giaco&amp;slug-hash=apwMwM&amp;pen-title=Click%20and%20draw%20some%20flowers&amp;name=cp_embed_2"
        console.log(first + this.pen + half)
        let penURL =  first + this.pen + half

        let data = {title : this.title, description : this.description, path : penURL}
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
