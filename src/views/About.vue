<template>
  <div class="about">
    <div class="how-to">
      <h2>How it works</h2>
      <div class="how-to-step-container">
        <div class="how-to-step">
          <img src="../assets/pathways-step1.svg" />
          <h3>Create a birthday <br />project</h3>
          <p>
            Start by record yourself singing Happy Birthday to the camer
          </p>
        </div>
        <div class="how-to-step">
          <img src="../assets/pathways-step2.svg" />
          <h3>
            Invite friends to <br />
            sing along
          </h3>
          <p>
            Send the project link to your friends to submit their singing video
          </p>
        </div>
        <div class="how-to-step">
          <img src="../assets/pathways-step3.svg" />
          <h3>Send the video to <br />someone special</h3>
          <p>
            Send out the link of the compiled group video to your loved one
          </p>
        </div>
      </div>

      <div class="about-text">
        <h2>About this project</h2>
        <p>
          Birthdays are a tradition for a group of people to get together to
          celebrate someone’s special day. Replicating that same experience of
          getting together online is not the same and a challenge when we can’t
          all get infront of a screen at the same time. Birthdays were an
          inspiration for the perfect opportunity for Pathways to bring joy to
          people’s lives with a simple online tool and a special birthday page.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // storing current route for next use
    this.$store.state.targetRoute = this.$router.currentRoute.path;
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/style.scss";
.about {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem 0;
  box-sizing: border-box;
  &-text {
    margin-top: 3rem;
    h2{
      margin-bottom: 3rem;
    }
    p {
      font-style: normal;
      font-weight: normal;
      font-size: 1.3rem;
      line-height: 2.3rem;
      text-align: left;
      color: black;
      max-width: 1000px;
      margin: 1rem auto;
      // text-align: left;
    }
  }
  .how-to {
    box-sizing: border-box;
    width: 90%;
    margin: 0 auto;
    @include responsive(tablet-portrait) {
      margin: auto;
    }
    padding: 1rem;
    max-width: 1000px;
    .how-to-learn {
      position: relative;
      display: inline;
      color: white;
      font-weight: bold;
      padding: 0.2rem 0.5rem;
      box-sizing: border-box;
      &::before {
        background: $color-primary;
        content: "";
        position: absolute;
        z-index: -1;
        top: 0.0125rem;
        right: -0.5625rem;
        bottom: 0.0125rem;
        left: -0.5625rem;
        border-radius: 32px 4px/9px 12px;
        -webkit-transform: skewX(0deg) skewY(2deg);
        -ms-transform: skewX(-5deg) skewY(2deg);
        transform: skewX(1deg) skewY(3deg);
      }
    }
    h2 {
      margin-top: 1.5rem;
    }
    &-step-container {
      width: 100%;
      @include responsive(except-mobile) {
        display: grid;
        grid-template-columns: repeat(3, 2fr);
        grid-gap: 3rem;
        justify-content: center;
      }
      margin-bottom: 1rem;
      .how-to-step {
        margin: 1rem auto;
        max-width: 300px;

        img {
          width: 10rem;
        }
        h3 {
          font-family: Lora;
          font-style: normal;
          font-weight: bold;
          font-size: 1.5rem;
          line-height: 2rem;
          margin-top: 0;
        }
        p {
          font-style: normal;
          font-weight: normal;
          font-size: 1rem;
          line-height: 1.5rem;
          color: black;
        }
      }
    }
  }
}
</style>
