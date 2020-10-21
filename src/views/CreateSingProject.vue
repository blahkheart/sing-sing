<template>
  <div class="create">
    <h2>Whose birthday is it?</h2>
    <form @submit.prevent="pressed">
      <div class="name">
        <label for="name">First Name</label>
        <input type="text" id="name" v-model="name" placeholder="Recipient’s first name" />
      </div>
      <button type="submit" class="btn btn-primary">Next</button>
    </form>
  </div>
</template>

<script>
// import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      secrets: [],
      name: "",
    };
  },
  methods: {
    async pressed() {
        this.$router.replace({
              name: "video",
              params: { name: this.name, },
            });
    }
    // async pressed() {
    //   const token = await firebase.auth().currentUser.getIdToken();
    //   let config = {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   };
    //   this.$store.state.pageLoading = true;

    //   let url = `${this.$store.state.apiRoot}/create-project`;
    //   this.secrets = await this.$axios
    //     .post(url, { projectName: this.name }, config)
    //     .then((response) => {
    //       this.$store.state.pageLoading = false;

    //       if (response.data.status == 200) {
    //         this.$store.state.projectId = response.data.projectId;
    //         // console.log(this.$store.state.projectId);
          
    //       } else
    //         this.$modal.show(
    //           {
    //             template: `
    //           <div style="padding: 1rem">
    //             <h1>{{ title }}</h1>
    //             <p>{{ text }}</p>
    //             <button style="text-align: right" class="btn btn-secondary btn-sm" @click="$emit('close')">Close</button>
    //           </div>
    //         `,
    //             props: ["title", "text"],
    //           },
    //           {
    //             title: "Error!",
    //             text: "Something went wrong!",
    //           },
    //           { height: "auto" }
    //         );
    //     })
    //     .catch((error) =>
    //       this.$modal.show(
    //         {
    //           template: `
    //           <div style="padding: 1rem">
    //             <h1>{{ title }}</h1>
    //             <p>{{ text }}</p>
    //             <button style="text-align: right" class="btn btn-secondary btn-sm" @click="$emit('close')">Close</button>
    //           </div>
    //         `,
    //           props: ["title", "text"],
    //         },
    //         {
    //           title: "Error!",
    //           text: error,
    //         },
    //         { height: "auto" }
    //       )
    //     );
    // },
  },
  mounted() {
    // storing current route for next use
    this.$store.state.targetRoute = this.$router.currentRoute.path;
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/style.scss";

.create {
  @extend %proper-height;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    margin-bottom: 2rem;
    font-size: 2.5rem;
    @include responsive(phone) {
      margin-top: 8rem;
    }
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
    .name {
      display: flex;
      flex-direction: column;
      text-align: left;
      margin-bottom: 1rem;
      label {
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
