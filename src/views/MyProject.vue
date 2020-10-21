<template>
  <div class="profile">
    <img v-if="image" :src="image" alt class="image" />
    <img v-if="!image" src="../assets/user.svg" alt />
    <h3>{{ name }}</h3>
    <h4>{{ email }}</h4>

    <p class="btn btn-secondary" v-if="loggedIn" @click="signOut">Sign out</p>

    <h2 class="title">Project list</h2>
    <loading-spinner v-if="!projects"></loading-spinner>
    <div class="project-list" v-if="projects">
      <p v-if="!projects[0]">
        You dont' have any project. Create new
        <router-link :to="{ name: 'sing' }">here</router-link>
      </p>
      <div v-for="project in projects" :key="project.id" class="project">
        <p>{{ project.projectName }}'s Birthday</p>
        <router-link
          class="btn btn-primary"
          :to="{ name: 'project', params: { id: project.id } }"
        >Manage Project</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

import LoadingSpinner from "../components/Loading-Spinner";

export default {
  data() {
    return {
      projects: null,
    };
  },
  components: {
    "loading-spinner": LoadingSpinner,
  },
  computed: {
    loggedIn() {
      return this.$store.state.isLoggedIn;
    },
    name() {
      return this.$store.state.user.name;
    },
    email() {
      return this.$store.state.user.email;
    },
    image() {
      return this.$store.state.user.image;
    },
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("setUserName", "Captain Anonymous");
          this.$store.commit("setUserEmail", "mail@imaginary.com");

          this.$router.replace({ name: "signin" });
        });
    },
    async getProjectList() {
      const token = await firebase.auth().currentUser.getIdToken();
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let url = `${this.$store.state.apiRoot}/admin/projects`;
      this.$axios
        .get(url, config)
        .then((response) => {
          this.$store.state.pageLoading = false;

          if (response.data.status == 200) {
            this.projects = response.data.projectId;
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
                text: "Something went wrong!",
              },
              { height: "auto" }
            );
        })
        .catch((error) =>
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
              text: error,
            },
            { height: "auto" }
          )
        );
    },
  },
  beforeMount() {},
  mounted() {
    // storing current route for next use
    this.$store.state.targetRoute = this.$router.currentRoute.path;
    this.getProjectList();
  },
};
</script>

<style lang="scss" scoped>
.profile {
  overflow: hidden;
  width: 800px;
  margin: 0 auto;
  padding-top: 8rem;
}
img {
  height: 150px;
}
.image {
  border-radius: 50%;
}
h3 {
  margin-top: 1rem;
}
h4 {
  margin: 1rem;
}
.btn {
  width: 100px;
  margin: 0 auto;
  padding: 0.5rem 2rem;
}
.title {
  margin-top: 3rem;
  margin-bottom: 2rem;
}
.project-list {
  display: grid;
  place-items: center;
  .project {
    display: flex;
    justify-content: space-between;
    width: 600px;
    align-items: center;
    margin: 1rem, auto;
  }
  .btn {
    margin: 0;
  }
}
a {
  text-decoration: none;
}
</style>
