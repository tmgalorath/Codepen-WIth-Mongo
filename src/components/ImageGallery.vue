<template>
<div>
  <div class="image" v-for="photo in photos" v-bind:key="photo._id">
    <!-- <img @click="singlePhoto" :src="photo.path" /> -->

    <div class="cp_embed_wrapper"><iframe name="cp_embed_2" :src="photo.path" scrolling="no" frameborder="0" height="565" allowtransparency="true" allowfullscreen="true" allowpaymentrequest="true" title="Click and draw some flowers" class="cp_embed_iframe "
        style="width: 100%; overflow:hidden; display:block;" id="cp_embed_apwMwM"></iframe></div>

    <!-- <router-link :to="{ name: 'photo', params: { id: photo._id }}"><img :src="photo.path" /></router-link> -->
    <p class="photoTitle">{{photo.title}}</p>
    <p class="photoDate">
      <span v-if="photo.user.name">{{photo.user.name}}, </span>
      {{formatDate(photo.created)}}
    </p>
    <p>{{photo.description}}</p>

    <div v-if="canDelete">
      <v-btn flat icon color="red lighten-2">
        <v-icon color="error" @click="deletePen(photo)" large>delete</v-icon>
      </v-btn>
    </div>


  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ImageGallery',
  props: {
    photos: Array,
    canDelete: Boolean,

  },

  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },

    async deletePen(photo) {
      console.log(photo)
      await this.$store.dispatch("deleteOne", photo._id)
      await this.$store.dispatch("getMyPhotos");
      // await this.$store.dispatch("getAllPhotos");
    }
  },
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
