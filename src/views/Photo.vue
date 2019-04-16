<template>
<div>
  <img class="image" :src="photo.path" />
  <p class="photoTitle">{{photo.title}}</p>
  <p class="photoDate">
    <span v-if="photo.user.name">{{photo.user.name}}, </span>
    {{formatDate(photo.created)}}
  </p>
  <p>{{photo.description}}</p>

  <h3>Add a Comment</h3>
  <textarea v-model="addedComment"></textarea>
  <br />
  <button @click="addComment" >Comment</button>

  <div v-for="comment in comments">
    <hr>
    <p><i>{{formatDate(comment.created)}}</i></p>
    <p>{{comment.comment}}</p>
    <p><i>-- {{comment.userName}}</i></p>

  </div>

</div>
</template>
<script>
import moment from 'moment';
export default {
  data() {
    return {
      addedComment: "",
      comment : {
        user : {
          name : "",
        },
      },
    }
  },

  computed: {
    photo() {
      console.log(this.$store.state.singlePhoto)
      return this.$store.state.singlePhoto;
    },
    comments() {
      console.log(this.$store.state.singlePhoto)
      return this.$store.state.comments;
    },
  },
  async created() {
    console.log(this.$route.params.id)
    await this.$store.dispatch("getSinglePhoto", this.$route.params.id);
    await this.$store.dispatch("getComments", this.$route.params.id)
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },

    async addComment() {
      let data = {photo_id : this.photo._id, comment : this.addedComment }
      await this.$store.dispatch("uploadComment", data)
      await this.$store.dispatch("getComments", this.$route.params.id)
    },
  }
}
</script>

<style scoped>
.photoTitle {
  margin: 0px;
  font-size: 1.2em;
}

.photoDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

p {
  margin: 0px;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  max-width: 600px;
  max-height: 600px;
  image-orientation: from-image;
}
</style>
