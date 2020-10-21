/* eslint-disable no-unused-vars */
<template>
  <div class="birthday">
    <div>
      <h2>Happy Birthday {{ name }}!</h2>
      <div class="video-container">
        <video controls>
          <source type="video/mp4" />Your browser does not support the video tag.
        </video>
      </div>
      <p>{{ wish }}</p>
      <router-link v-if="isLoggedIn" class="btn" :to="projectPageLink">Manage Birthday page</router-link>
    </div>
  </div>
</template>

<script>
// import * as firebase from "firebase/app";
// import "firebase/auth";

export default {
  name: "birthday",
  components: {},
  data() {
    return {
      name: "Emily",
      videoSrc: "",
      wish:
        "Emily, we wanted to wish you a happy birthday together at once so we all recordded ourselves singing to you. Hope it makes you feel special. We love you and hope you have a wonderful day!",
      height: 720,
      width: 1200,
      secret: null,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    projectPageLink() {
      return { name: "project", params: { id: this.$route.params.id } };
    },
  },
  methods: {
    getBirthdayData() {
      let url = `${this.$store.state.apiRoot}/${this.$route.params.id}/compiled-video`;
      this.$axios
        .get(url)
        .then((response) => {
          if (response.data.status == 200) {
            let data = response.data;
            this.videoSrc = data.compiledVideo.url;
            document.querySelector("video").src = this.videoSrc;
            this.name = data.projectName;
            this.wish = data.wishText;
          } else
            this.$modal.show(
              {
                template: `
              <div style="padding: 1rem">
                <h1>{{ title }}</h1>
                <p>{{ text }}</p>
                <button style="text-align: right" class="btn btn-secondary btn-sm" @click="$emit('close')">Close</button>
              </div>
            `,
                props: ["title", "text"],
              },
              {
                title: "Error!",
                text: "Something went wrong while accessing the video.",
              },
              { height: "auto" }
            );
        })
        .catch((error) => this.$modal.show(
              {
                template: `
              <div style="padding: 1rem">
                <h1>{{ title }}</h1>
                <p>{{ text }}</p>
                <button style="text-align: right" class="btn btn-secondary btn-sm" @click="$emit('close')">Close</button>
              </div>
            `,
                props: ["title", "text"],
              },
              {
                title: "Error!",
                text: error,
              },
              { height: "auto" }
            ));
    },
  },
  beforeMount() {
    this.getBirthdayData();
  },
  mounted() {
    // storing current route for next use
    this.$store.state.targetRoute = this.$router.currentRoute.path;
  },
};
</script>
<style lang="scss" scoped>
@import "../styles/style.scss";

.birthday {
  @extend %proper-height;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .video-container {
    width: 800px;
    margin: 1rem 0;
    @include responsive(big-desktop) {
      max-width: 1000px;
    }
    @include responsive(tablet-portrait) {
      width: 90vw;
    }
    video {
      width: 100%;
      height: 450px;
      background: black;
    }
    video:focus {
      outline: none;
    }
  }
  h2 {
    margin-bottom: 2rem;
  }
  p {
    max-width: 800px;
    line-height: 150%;
    margin-bottom: 2rem;
    font-size: 1.3rem;
    @include responsive(tablet-portrait) {
      max-width: 90vw;
    }
  }
  a {
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    border-radius: 6px;
    padding: 0.6rem 2rem;
    font-weight: normal;
    color: black;
    &:hover {
      background: rgba(gray, 0.1);
      transition: all 0.3s;
    }
  }
}
</style>
