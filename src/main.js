import Vue from 'vue/dist/vue.js';
// import Vue from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import axios from "axios";
import KProgress from 'k-progress';
import LogRocket from 'logrocket';
import VModal from 'vue-js-modal'
import VueYoutube from 'vue-youtube'
 
Vue.use(VueYoutube)
Vue.use(VModal)

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.component('k-progress', KProgress);

const firebaseConfig = {
  apiKey: "AIzaSyB0bkhY0eej5K5knWpmCL9Y3xibSuRq8lY",
  authDomain: "sing-pathways.firebaseapp.com",
  databaseURL: "https://sing-pathways.firebaseio.com",
  projectId: "sing-pathways",
  storageBucket: "sing-pathways.appspot.com",
  messagingSenderId: "1050274978421",
  appId: "1:1050274978421:web:c07471314c771bcce7363c",
  measurementId: "G-PF5B1TF6Y2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged((user) => {
  // Mutating application user state
  if (user) {
    store.state.isLoggedIn = true;
  } else store.state.isLoggedIn = false;

  if (!app) {
    app = new Vue({
      router,
      store,
      beforeCreate() { this.$store.commit('initialiseStore');},
      render: (h) => h(App),
    }).$mount("#app");
  }
});

LogRocket.init('yc9w3t/birthday-sing-together');
