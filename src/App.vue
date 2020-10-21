<template>
  <div id="app">
    <top-header></top-header>
    <page-spinner v-if="isLoading" />

    <div v-if="!isLoading" class="router-container">
      <router-view class="router-view" />
    </div>
  </div>
</template>

<script>
import Header from "./components/Top-Header";
import PageSpinner from "./components/Page-Spinner";

export default {
  components: {
    "top-header": Header,
    "page-spinner": PageSpinner,
  },
  computed: {
    isLoading() {
      return this.$store.state.pageLoading;
    },
  },
};
</script>

<style lang="scss">
@import "./styles/style.scss";

#app {
  font-family: $font-primary;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-dark;
  max-width: 100vw!important;
  .page-spinner {
    height: calc(100vh - 56px) !important;
    display: grid;
    place-items: center;
    background: white !important;
  }
  .router-container {
    max-width: 100vw!important;
    min-height: 100vh;
  }
}
</style>
