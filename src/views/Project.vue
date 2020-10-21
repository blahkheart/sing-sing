<template>
  <div class="project-container">
    <!-- <div class="error" v-if="success">{{ success }}</div>
    <div class="error" v-if="error">{{ error }}</div>-->

    <div class="singing-data">
      <div class="video-edit">
        <h1>Sing Together for {{ personName }}'s birthday!</h1>
        <video class="compiledVideo" controls></video>
        <div v-if="submittedVideos" class="submitted-video-container">
          <div
            class="submitted-video"
            v-for="video in submittedVideos"
            :key="video.id"
          >
            <video :src="video.videoUrl" controls></video>
            <h4>
              <span
                @click="muteVideo(video.id)"
                v-html="video.muted ? mutedSVG : notMutedSVG"
                :class="{ backgroundRed: video.muted }"
              ></span>

              <span
                @click="deleteVideo(video.id)"
                v-html="video.deleted ? deletedSVG : notDeletedSVG"
                :class="{ backgroundRed: video.deleted }"
              ></span>
            </h4>
          </div>
        </div>
        <button @click="compileVideo" class="btn btn-secondary">
          Compile Video
        </button>
      </div>
    </div>

    <div class="invite">
      <h3 class="invite-title">Invite to sing together for {{ personName }}</h3>
      <div class="invite-list-container">
        <div class="form">
          <div class="name">
            <label for="name">First Name</label>
            <input
              type="text"
              id="name"
              v-model="temporaryNameHolder"
              placeholder="Enter First Name"
            />
          </div>
          <div class="email">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="temporaryEmailHolder"
              placeholder="Email Your Email"
            />
          </div>
          <button class="btn btn-primary" @click="addPeople()">ADD</button>
        </div>
        <div class="invite-list">
          <p v-for="(people, i) in invited" :key="i">
            <span>{{ people.firstName }}</span>
            <span>{{ people.email }}</span>
            <img src="../assets/delete.png" @click="deletePeople(i)" />
          </p>
        </div>
        <button @click="invitePeople" class="btn btn-primary invite-btn">
          Send invite via email
        </button>
      </div>

      <h4 class="link-help-text">
        Copy and send this link out to your friends or family to collect their
        recordings
      </h4>
      <div class="link-container">
        <p class="link" id="link" @click="copyLink()">{{ shareAbleLink }}</p>
        <button class="btn btn-primary" @click="copyLink()">Copy</button>
      </div>

      <h3 class="message-title">
        Add a message for {{ personName }} from the group
      </h3>
      <textarea v-model="wish" class="message"></textarea>
      <button @click="postWishMessage" class="btn btn-primary submit">
        Submit
      </button>
      <router-link to="birthday" class="btn btn-secondary birthday-link"
        >Go to Birthday Page</router-link
      >
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      personName: "",
      compiledVideo: false,
      wish: "",
      // success: null,
      // error: null,
      submittedVideos: null,
      invited: [
        {
          firstName: "Demo Name",
          email: "demo@mail.com",
        },
      ],
      temporaryNameHolder: "",
      temporaryEmailHolder: "",
    };
  },
  computed: {
    shareAbleLink() {
      return `${this.$store.state.frontEndRoot}/${this.$route.params.id}/record`;
    },
    mutedSVG() {
      return `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 10C15 8.0389 13.8667 6.34442 12.2222 5.52776V7.98333L14.95 10.7111C14.9833 10.4778 15 10.2389 15 10Z" fill="white"/>
              <path d="M17.7778 10C17.7778 11.0444 17.55 12.0278 17.1778 12.9333L18.8611 14.6167C19.5833 13.2333 20 11.6667 20 10C20 5.24442 16.6722 1.26666 12.2222 0.255569V2.55C15.4333 3.50557 17.7778 6.47776 17.7778 10Z" fill="white"/>
              <path d="M10 1.1111L7.67776 3.43334L10 5.75558V1.1111Z" fill="white"/>
              <path d="M1.41667 0L0 1.41667L5.25 6.66667H0V13.3333H4.44443L10 18.8889V11.4167L14.7278 16.1444C13.9833 16.7167 13.1444 17.1778 12.2222 17.4555V19.75C13.7499 19.4 15.1444 18.7 16.3166 17.7389L18.5833 20L20 18.5833L10 8.58333L1.41667 0Z" fill="white"/>
              </svg>`;
    },
    notMutedSVG() {
      return `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 10C15 7.98747 13.8667 6.24855 12.2222 5.41046V14.5952C13.8667 13.7514 15 12.0125 15 10Z" fill="black"/>
              <path d="M0 6.57924V13.4208H4.44443L10 19.122V0.87796L4.44443 6.57924H0Z" fill="black"/>
              <path d="M12.2222 0V2.3546C15.4333 3.33524 17.7778 6.38538 17.7778 10C17.7778 13.6146 15.4333 16.6648 12.2222 17.6454V20C16.6722 18.9624 20 14.886 20 10C20 5.11403 16.6722 1.03761 12.2222 0Z" fill="black"/>
              </svg>`;
    },
    deletedSVG() {
      return `<svg width="16" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                <path d="M2.24998 17.5C2.24998 18.8781 3.25906 20 4.49997 20H13.5C14.7409 20 15.75 18.8781 15.75 17.5V5H2.24998V17.5Z" fill="white"/>
                <path d="M11.25 1.24999V0H6.74998V1.24999H1.12498V3.74997H16.875V1.24999H11.25Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0">
                <rect width="18" height="20" fill="white"/>
                </clipPath>
                </defs>
              </svg>`;
    },
    notDeletedSVG() {
      return `<svg width="16" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0)">
              <path d="M2.24998 17.5C2.24998 18.8781 3.25906 20 4.49997 20H13.5C14.7409 20 15.75 18.8781 15.75 17.5V5H2.24998V17.5Z" fill="black"/>
              <path d="M11.25 1.24999V0H6.74998V1.24999H1.12498V3.74997H16.875V1.24999H11.25Z" fill="black"/>
              </g>
              <defs>
              <clipPath id="clip0">
              <rect width="18" height="20" fill="white"/>
              </clipPath>
              </defs>
              </svg>`;
    },
  },
  methods: {
    copyLink() {
      const el = document.createElement("textarea");
      el.value = document.querySelector("#link").innerHTML;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      document.querySelector("#link").innerHTML = "Copied";
      setTimeout(() => {
        document.querySelector("#link").innerHTML = this.shareAbleLink;
      }, 3000);
    },
    addPeople() {
      if (this.temporaryNameHolder && this.temporaryEmailHolder) {
        if (this.validEmail(this.temporaryEmailHolder)) {
          this.invited.push({
            firstName: this.temporaryNameHolder,
            email: this.temporaryEmailHolder,
          });
          this.temporaryNameHolder = "";
          this.temporaryEmailHolder = "";
        } else {
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
              text: "Email is not valid!",
            },
            { height: "auto" }
          );
        }
      }
    },
    deletePeople(i) {
      this.invited = this.invited.filter(function (value, index) {
        return index != i;
      });
    },
    muteVideo(id) {
      this.submittedVideos.map(function (value) {
        if (value.id == id) {
          value.muted = !value.muted;
        }
        return value;
      });
    },
    deleteVideo(id) {
      this.submittedVideos.map(function (value) {
        if (value.id == id) {
          value.deleted = !value.deleted;
        }
        return value;
      });
    },
    getProjectData() {
      let url = `${this.$store.state.apiRoot}/${this.$route.params.id}/compiled-video`;
      this.$axios
        .get(url)
        .then((response) => {
          if (response.data.status == 200) {
            let data = response.data;
            if (data.compiledVideo.url) {
              this.compiledVideo = data.compiledVideo.url;
              document.querySelector(".compiledVideo").src = this.compiledVideo;
            } 
            // else {
            //   this.$modal.show(
            //     {
            //       template: `
            //   <div style="padding: 1rem">
            //     <h1>{{ title }}</h1>
            //     <p>{{ text }}</p>
            //     <button style="text-align: right" class="btn btn-secondary btn-sm" @click="$emit('close')">Close</button>
            //   </div>
            // `,
            //       props: ["title", "text"],
            //     },
            //     {
            //       title: "Error!",
            //       text:
            //         "Sorry there is no compiled video. Video need to be recorded first!",
            //     },
            //     { height: "auto" }
            //   );
            // }
            this.personName = data.projectName;
            this.wish = data.wishText;
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
                text: "Something went wrong while accessing the video.",
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
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async invitePeople() {
      if (!this.invited[0]) {
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
            text: "List is empty. Please add name & email to the list!",
          },
          { height: "auto" }
        );
        return;
      }
      this.$store.state.pageLoading = true;

      const token = await firebase.auth().currentUser.getIdToken();
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let url = `${this.$store.state.apiRoot}/${this.$route.params.id}/invite`;
      let payload = JSON.stringify({ invitees: this.invited });
      this.$axios
        .post(url, payload, config)
        .then((response) => {
          this.$store.state.pageLoading = false;

          if (response.status == 200) {
            setTimeout(() => {
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
                  text: "Email invitations sent!",
                },
                { height: "auto" }
              );
            }, 500);
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
                text: "something went wrong",
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
    async postWishMessage() {
      this.$store.state.pageLoading = true;

      const token = await firebase.auth().currentUser.getIdToken();
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let url = `${this.$store.state.apiRoot}/${this.$route.params.id}/message`;
      let payload = JSON.stringify({ message: this.wish });
      this.$axios
        .post(url, payload, config)
        .then((response) => {
          this.$store.state.pageLoading = false;

          if (response.data.status == 200) {
            setTimeout(() => {
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
                  text: "The birthday message has been updated!",
                },
                { height: "auto" }
              );
            }, 500);
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
                text: "something went wrong",
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
    async getSubmittedVideos() {
      const token = await firebase.auth().currentUser.getIdToken();
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let url = `${this.$store.state.apiRoot}/${this.$route.params.id}/submitted-videos`;
      this.$axios
        .get(url, config)
        .then((response) => {
          if (response.data.status == 200) {
            this.submittedVideos = response.data.submittedVideos;
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
                text: "something went wrong",
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
    async compileVideo() {
      if (!this.submittedVideos[0]) {
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
            text: "Sorry there is no compiled video. Video need to be recorded first!",
          },
          { height: "auto" }
        );
      } else {
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
            text: "Your compile request is sent to the server.",
          },
          { height: "auto" }
        );
        const token = await firebase.auth().currentUser.getIdToken();
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        let url = `${this.$store.state.apiRoot}/${this.$route.params.id}/compile-video-async`;
        let payload = JSON.stringify({ submittedVideos: this.submittedVideos });
        this.$axios
          .post(url, payload, config)
          .then((response) => {
            if (response.data.status != 200) {
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
                  text: "something went wrong",
                },
                { height: "auto" }
              );
            }
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
      }
    },
    checkForNewCompiledVideo() {
      let url = `${this.$store.state.apiRoot}/${this.$route.params.id}/compiled-video`;
      this.$axios
        .get(url)
        .then((response) => {
          if (response.data.status == 200) {
            let data = response.data;
            if (data.compiledVideo.url) {
              if (this.compiledVideo !== data.compiledVideo.url) {
                this.compiledVideo = data.compiledVideo.url;
                document.querySelector(
                  ".compiledVideo"
                ).src = this.compiledVideo;
              }
            }
          }
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
  beforeMount() {
    this.getProjectData();
    this.getSubmittedVideos();
  },
  mounted() {
    // storing current route for next use
    this.$store.state.targetRoute = this.$router.currentRoute.path;
    setInterval(() => {
      this.checkForNewCompiledVideo();
    }, 10000);
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/style.scss";

$video-width: 800px;
$video-height: calc(#{$video-width} * 9 / 16);
.backgroundRed {
  transition: all 0.5s;
  background: $color-quarternary;
}
.project-container {
  width: 98vw;
  padding-top: 4rem;
}
.singing-data {
  margin: 1.5rem 0;
  margin-left: 1vw;
  .singing-description {
    font-family: $font-primary;
    font-weight: normal;
    line-height: 2.5rem;
    padding: 0 15%;
    @include responsive(tablet-portrait) {
      padding: 0;
    }
    text-align: left;
  }
  button {
    width: 200px;
    margin: auto;
  }
  .video-edit {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: auto;

    h1 {
      margin-bottom: 1.5rem;
      font-size: 2rem;
      @include responsive(small-desktop) {
        display: none;
      }
    }
    .compiledVideo {
      width: $video-width;
      @include responsive(tablet-portrait) {
        width: 90vw;
        height: auto;
        margin: auto;
      }
      background: black;
      height: $video-height;
      margin-bottom: 1rem;
    }
    .submitted-video-container {
      // width: 1000px;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .submitted-video {
        margin-bottom: 1rem;
        video {
          width: 250px;
          margin: 1rem;
          margin-bottom: 0;
        }
        h4 {
          margin: 1rem;
          @include responsive(phone) {
            margin: 0.5rem;
          }
          span {
            margin: 0 1rem;
            padding: 0.5rem;
            border: 1px solid rgba($color-gray, 0.4);
            display: inline-grid;
            place-items: center;
            border-radius: 0.2rem;
            transition: all 0.5s;
            svg {
              width: 20px;
              height: 20px;
              opacity: 0.8;
            }
          }
        }
      }
    }
  }
}
video:focus {
  outline: none;
}
.invite {
  width: 800px;
  @include responsive(tablet-portrait) {
    width: 90%;
  }
  margin: 4rem auto;
  .invite-title {
    font-family: $font-secondary;
    font-weight: normal;
    color: black;
    margin-bottom: 2rem;
    font-weight: bold;
    font-size: 2rem;
  }
  .invite-list-container {
    max-width: 100%;
    .form {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      @include responsive(phone) {
        grid-template-columns: 1fr;
      }
      grid-gap: 1rem;
      align-items: flex-end;
      .email,
      .name {
        display: flex;
        flex-direction: column;
        text-align: left;
        label {
          margin-bottom: 0.5rem;
        }
      }
    }
    .invite-list {
      p {
        text-align: left;
        padding: 0.7rem 1rem;
        border: 1px solid #cccccc;
        border-radius: 5px;
        display: grid;
        grid-template-columns: 1fr 1fr 6rem;
        align-items: center;
        margin-bottom: 0;
        img {
          width: 1rem;
          margin-left: auto;
        }
      }
    }
    .invite-btn {
      margin-top: 1rem;
      background: rgba(#adadad, 0.5);
      color: #504f4f;
      &:hover {
        transition: all 0.3s;
        background: #e7e7e7;
        color: #2b2929;
      }
    }
  }
  .link-help-text {
    text-align: left;
    @include responsive(tablet-portrait) {
      max-width: 90vw;
    }
  }
  .link-container {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-column-gap: 1rem;
    align-items: center;
    border: 1px solid #cccccc;
    padding: 0.5rem;
    border-radius: 5px;
    @include responsive(phone) {
      border: none;
      grid-template-columns: 1fr;
    }
    .link {
      text-align: left;
      color: $color-dark-light;
      margin-left: 0.5rem;
      @include responsive(phone) {
        border: 1px solid #cccccc;
        padding: 1rem;
        border-radius: 5px;
        margin-left: 0;
      }
    }
    button {
      height: 2.8rem;
      box-sizing: border-box;
    }
  }
  .message-title {
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-weight: 500;
    font-family: $font-primary;
  }
  .message {
    line-height: 2rem;
    text-align: left;
    color: $color-gray;
    font-size: 1.2rem;
    height: 213px;
    box-sizing: border-box;
  }
  .submit {
    margin-top: 1rem;
    margin-bottom: 4rem;
    margin-left: auto;
    display: block;
    @include responsive(phone) {
      width: 100%;
    }
  }
}
</style>
