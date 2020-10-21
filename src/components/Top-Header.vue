<template>
  <header>
    <nav>
      <router-link class="nav-link logo" to="/">Sing Together</router-link>

      <router-link class="nav-link" to="/about">About</router-link>
      <router-link class="nav-link" to="/sing">Sing</router-link>
      <router-link v-if="loggedIn" class="nav-link" to="/my-projects">My Projects</router-link>
      <!-- <router-link v-if="!loggedIn" to="/signin">Sign In</router-link>
      <router-link v-if="!loggedIn" to="/signup">Sign Up</router-link> -->
      <p class="nav-link" v-if="loggedIn" @click="signOut">
        Sign out
      </p>
      <!-- <div class="dropdown">
        <button class="dropbtn">Manage</button>
        <div class="dropdown-content">
          <router-link v-if="loggedIn" to="fg/profile">Profile</router-link>
          <router-link v-if="!loggedIn" to="/login">Login</router-link>
          <router-link v-if="!loggedIn" to="/signup">Sign Up</router-link>
          <p v-if="loggedIn" @click="signOut">
            Log Out
          </p>
        </div>
      </div> -->
    </nav>
  </header>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "top-header",
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "signin" });
        });
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/style.scss";

header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  // background: white;
  width: 100%;
  padding: 1rem 0;
  display: grid;
  place-items: center;
  @include responsive(phone) {
    padding: 0.5rem 0;
  }
  // box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2);
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 1200px;
    @include responsive(tablet-portrait) {
      width: 90vw;
    }
    .logo {
      // font-family: $font-secondary;
      font-size: 1.2rem;
      color: $color-primary;
      margin-right: auto;
      margin-left: 0;
      font-weight: bold;

      @include responsive(phone) {
        width: 100%;
      }
    }
    a {
      // font-weight: bold;
      color: $color-gray;
      margin: 0 1rem;
      @include responsive(phone) {
        margin: 0.5rem;
      }
      text-decoration: none;

      &.router-link-exact-active {
        color: $color-primary;
      }
    }
    p {
      padding: 0.7rem;
      padding-left: 1.5rem;
      // font-weight: 600;
      color: $color-gray;
      text-align: left;
      margin: 0;
      cursor: pointer;
    }

    .dropbtn {
      font-weight: bold;
      outline: none;
      border: none;
      background: transparent;
      color: $color-gray;
      margin: 0 1rem;
      margin-right: 0;
      @include responsive(phone) {
        margin-left: 0.5rem;
      }
    }

    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f1f1f1;
      min-width: 120px;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
    }

    .dropdown-content a {
      font-weight: 500;
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      margin: 0;
      padding-left: 1.5rem;
      text-align: left;
    }

    .dropdown-content a:hover,
    .dropdown-content p:hover {
      background-color: #ddd;
    }

    .dropdown:hover .dropdown-content {
      display: block;
    }
    .dropdown-content a:hover {
      background-color: #ddd;
    }

    .dropdown:hover .dropdown-content {
      display: block;
    }
  }
}
</style>
