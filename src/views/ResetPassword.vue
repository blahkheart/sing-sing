<template>
  <div class="login">
    <h2>Reset password</h2>
    <div class="error" v-if="error">{{ error }}</div>

    <form @submit.prevent="resetPassword()">
      <div class="email">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Enter your email" />
      </div>
      <button type="submit" class="btn btn-primary">Send</button>
      <p>We will send you a reset link on your mail.</p>
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
      error: "",
    };
  },
  methods: {
    resetPassword() {
      let auth = firebase.auth();
      let emailAddress = this.email;

      auth
        .sendPasswordResetEmail(emailAddress)
        .then(() => {
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
              title: "Alert!",
              text: "Password reset email sent!",
            },
            { height: "auto" }
          );
          this.$router.replace({ name: "signin" });
          // console.log(response)
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/style.scss";

.login {
  @extend %proper-height;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;

  h2 {
    margin-bottom: 2rem;
    font-size: 2.5rem;
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
      color: red;
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
