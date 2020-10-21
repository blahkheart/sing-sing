<template>
  <div class="home">
    <div class="landing">
      <div class="landing-content">
        <h1>Sing Together</h1>
        <h4>
          Make a birthday more special with a group of friends and family
          singing happy birthday together in one video!
        </h4>
        <span>
          <router-link class="btn btn-secondary" to="/sing">
            Start singing!
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    // storing current route for next use
    this.$store.state.targetRoute = this.$router.currentRoute.path;

    // changing navbar link style on home page
    let navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.style.color = "white";
      link.style.textShadow = "0px 1px 3px rgba(0, 0, 0, 0.25)";
    });
  },
  beforeDestroy() {
    // reverting back to default style
    let navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.style.color = "black";
      link.style.textShadow = "none";
    });
    document.querySelector(".logo").style.color = "#34763B";
  },
};
</script>
<style lang="scss" scoped>
@import "../styles/style.scss";
.page-spinner {
  height: 100vh;
  display: grid;
  place-items: center;
  background: white !important;
}
.home {
  // width: 100vw;
  height: 100vh;
  position: absolute;
  // top: 56px;
  right: 0;
  width: 100%;
  overflow: hidden !important;
  background: url("../assets/background-pc.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  @include responsive(phone) {
    background: url("../assets/background-mobile.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .landing {
    width: 100%;
    margin: 0 auto;
    height: 100%;
    max-width: 960px;
    &-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      max-width: 400px;
      text-align: left;
      @include responsive(tablet-landscape) {
        margin-left: 4rem;
      }
      h1 {
        color: white;
        font-size: 46px;
        text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
      }
      h4 {
        color: white;
        font-weight: normal;
        font-size: 24px;
        line-height: 36px;
        margin-bottom: 3rem;
        text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
        @include responsive(tablet-portrait) {
          font-size: 1.5rem;
        }
      }
    }
  }
}
</style>
