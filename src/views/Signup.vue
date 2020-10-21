<template>
  <div class="signup">
    <h2>Sign up to get started</h2>
    <div class="error" v-if="error">{{ error }} Hello</div>
    <form @submit.prevent="signUpWithEmail">
      <div class="email">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="email" />
      </div>
      <div class="password">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>

      <p>Or</p>

      <p @click="signInWithGoogle()" class="btn btn-tertiary google">
        <img src="../assets/google.webp" /> <span>Continue with Google</span>
      </p>
      <p @click="signInWithFacebook()" class="btn btn-primary facebook">
        <img src="../assets/facebook.svg" />
        <span>Continue with Facebook</span>
      </p>

      <p>
        Already have account?
        <router-link to="/signin">Sign In</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    signUpWithEmail() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          let email = data.user.email;
          this.$store.commit("setUserEmail", email);
          
          this.redirectingAfterLogin();
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
    signInWithGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((data) => {
          let name = data.user.displayName;
          let email = data.user.email;
          let image = data.user.photoURL;

          this.$store.commit("setUserName", name);
          this.$store.commit("setUserEmail", email);
          this.$store.commit("setUserImage", image);

          this.redirectingAfterLogin();
        })
        .catch(() => {
          this.error = "Sorry, something went wront. Please try again";
        });
    },
    signInWithFacebook() {
      let provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function() {
          // var token = result.credential.accessToken;
          // console.log(result.user);
          this.redirectingAfterLogin();
        })
        .catch(() => {
          this.error = "Sorry, something went wront. Please try again";
        });
    },
    redirectingAfterLogin() {
      let target = this.$store.state.targetRoute;
      if (
        target == "/signin" ||
        target == "/signup" ||
        target == "/reset-password" ||
        target == "/new-password"
      ) {
        this.$router.replace({ path: "/sing" });
      } else {
        this.$router.replace({ path: target });
      }
    },
  },
  mounted() {
    // storing current route for next use
    this.$store.state.targetRoute = this.$router.currentRoute.path;
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/style.scss";

.signup {
  @extend %proper-height;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  box-sizing: border-box;
  h2 {
    margin-bottom: 2rem;
    font-size: 2.5rem;
    @include responsive(phone) {
      margin-top: 1rem;
    }
  }
  .error {
    margin-bottom: 1rem;
    color: red;
    max-width: 500px;
    line-height: 1.6;
  }
  form {
    display: flex;
    flex-direction: column;
    padding: 4rem 8rem;
    margin-bottom: 2rem;
    @include responsive(phone) {
      padding: 2rem;
    }
    border-radius: 0.5rem;
    background: white;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    .email,
    .password {
      display: flex;
      flex-direction: column;
      text-align: left;
      margin-bottom: 1rem;
      label {
        margin-bottom: 0.5rem;
      }
    }
    p.btn {
      display: flex;
      align-items: center;
      img {
        height: 1.5rem;
        margin-right: 0.5rem;
      }
    }
    .google {
      color: black;
      margin-bottom: 0;
      margin-top: 0;
      &:hover {
        color: white;
      }
    }
    .facebook {
      background-color: #3a559f;
      margin-bottom: 1rem;
      &:hover {
        opacity: 0.9;
      }
    }
    p {
      a {
        display: inline;
        text-decoration: none;
        color: $color-primary;
      }
    }
  }
}
</style>
