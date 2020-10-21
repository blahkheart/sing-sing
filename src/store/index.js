import Vue from 'vue/dist/vue.js';
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    token: "",
    user: {
      name: "Anonymouse User",
      email: "mail@imaginary.com",
      image: "",
    },
    pageLoading: false,
    projectId: "",
    targetRoute: "",
    blobVideo: null,
    apiRoot: "https://b43mgjru23.execute-api.ca-central-1.amazonaws.com/Prod",
    frontEndRoot: "https://sing-app.netlify.app",
    youtubeVideo: ''
  },
  mutations: {
    setUserName(state, name) {
      localStorage.setItem("name", name);
      state.user.name = name;
      // console.log(name, "localstorage");
    },
    setUserEmail(state, email) {
      localStorage.setItem("email", email);
      state.user.email = email;
      // console.log(email, "localstorage");
    },
    setUserImage(state, image) {
      localStorage.setItem("image", image);
      state.user.image = image;
      // console.log(image, "localstorage");
    },
    initialiseStore(state) {
      if (localStorage.getItem("name")) {
        state.user.name = localStorage.getItem("name");
      }
      if (localStorage.getItem("email")) {
        state.user.email = localStorage.getItem("email");
      }
      if (localStorage.getItem("image")) {
        state.user.image = localStorage.getItem("image");
      }
    },
    setYoutubeVideo (state, url){
      state.youtubeVideo = url.substring(32)
    }
  },
  actions: {
    setYoutubeVideoUrl(context, url) {
      // url.substring(32)
      context.commit('setYoutubeVideo', url)
    }
  },
  getters: {
    fetchYoutubeVideoUrl(state){
      return state.youtubeVideo
    }
  },
  modules: {},
});
