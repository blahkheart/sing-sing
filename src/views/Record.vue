<template>
  <div class="record">
    <!-- <div>
      <BottomVideo identifier="7CBW0HD7Am4"></BottomVideo>

    </div> -->
    <div class="record-container">
      <div class="video-container">
        <video id="recorded-video" controls></video>
        <video id="camera-video" muted="muted"></video>
        <h1 id="count">3</h1>
        <div class="play-icon">
          <div class="border"></div>
        </div>
      </div>
      <div class="progressbar">
        <k-progress v-if="uploading" :percent="percent" :color="'#34763A'" :active="true" />
        <p v-if="uploadCompleted" class="uploaded">Video Uploaded!</p>
      </div>
      <div class="bottom-video-control">
        <div class="bottom-video">
          <BottomVideo :identifier="fetchYoutubeVideo"></BottomVideo>
          <!-- <video preload height="180px" class="stockVideo" id="stockVideo" controls>
            <source :src="fetchYoutubeVideo" type="video/webm" />
          </video> -->
        </div>
        <div class="control-container">
          <div class="control">
            <div class="control-buttons">
              <button id="cameraStart" @click="startCamera" class="btn btn-secondary">Turn on camera</button>
              <button
                @click="showQrCodePopUp()"
                id="appRecord"
                class="btn btn-primary"
              >Record on app</button>
              <button id="cameraStop" @click="stopCamera" class="btn btn-secondary">Turn off camera</button>
              <button id="btnStart" class="btn btn-quarternary">Play song and record</button>
              <button id="btnStop" class="btn btn-secondary">Stop recording & review</button>
            </div>
            <div class="control-right">
              <router-link
                v-if="loggedIn"
                :to="projectId"
                class="btn btn-tertiary"
              >Manage birthday page</router-link>
              <button @click="upload" id="btnSubmit" class="btn btn-primary">Submit video</button>
              <div id="checkbox">
                <input
                  type="checkbox"
                  @click="constraintObj.audio = !constraintObj.audio"
                  id="todo"
                  name="todo"
                  value="todo"
                />
                <label for="todo" data-content="Do not Record Audio">Do not Record Audio</label>
              </div>
            </div>
          </div>
          <div class="help-text">
            Record yourself singing happy birthday to your friend or family
            member in rhythm to this birthday song. Invite your friends or
            family to do the same and then share the birthday page with your
            loved one on their birthday!
          </div>
        </div>
      </div>
    </div>
    <div v-if="state.showQrCodePopUp" class="qrCodeContainer">
      <img
        @click="state.showQrCodePopUp = !state.showQrCodePopUp"
        src="../assets/delete.png"
        alt
        srcset
      />
      <div id="qrcode"></div>
      <h4>
        Please download our app from app store and scan this QR code to sing for
        your friend.
      </h4>
    </div>
  </div>
</template>

<script>
// import CloudflareVideoPlayer from "vue-cloudflare-video-player";
import "firebase/auth";
import BottomVideo from '@/components/BottomVideo'

export default {
  components: {
    BottomVideo
  },
  data() {
    return {
      state: {
        showQrCodePopUp: false,
      },
      videoBlob: {},
      uploading: false,
      uploadCompleted: false,
      percent: 0,
      // stockVideoUrl:
      //   "https://storage.googleapis.com/sing_video_bucket/hbd_small.webm",
        stockVideoUrl: this.$route.url,
      constraintObj: {
        audio: true,
        video: {
          facingMode: "user",
          width: {
            min: 640,
            ideal: 1280,
            max: 1920,
          },
          height: {
            min: 480,
            ideal: 720,
            max: 1080,
          },
        },
      },
    };
  },
  // components: {},
  methods: {
    startCamera() {
      document.getElementById("cameraStart").style.display = "none";
      document.getElementById("checkbox").style.display = "none";
      document.getElementById("btnStart").style.display = "block";
      document.getElementById("cameraStop").style.display = "block";
      document.getElementById("btnStart").disabled = true;
      document.getElementById("cameraStop").disabled = true;
      document.getElementById("recorded-video").style.zIndex = "0";
      document.getElementById("appRecord").style.display = "none";

      setTimeout(() => {
        document.getElementById("btnStart").disabled = false;
        document.getElementById("cameraStop").disabled = false;
      }, 3000);

      this.recording();
    },
    stopCamera() {
      document.getElementById("btnStart").style.display = "none";
      document.getElementById("btnStop").style.display = "none";
      document.getElementById("cameraStart").style.display = "block";
      document.getElementById("cameraStop").style.display = "none";
      document.getElementById("checkbox").style.display = "flex";
      document.getElementById("btnSubmit").style.display = "none";
      document.getElementById("appRecord").style.display = "block";

      const cameraVideo = document.getElementById("camera-video");
      const mediaStream = cameraVideo.srcObject;
      const tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop());
    },

    recording() {
      const cameraStop = document.getElementById("cameraStop");
      const start = document.getElementById("btnStart");
      const stop = document.getElementById("btnStop");
      const submit = document.getElementById("btnSubmit");
      const recordedVideo = document.getElementById("recorded-video");
      const cameraVideo = document.getElementById("camera-video");
      const stockVideo = document.getElementById("stockVideo");
      const counter = document.getElementById("count");
      const playIcon = document.querySelector(".play-icon");

      navigator.mediaDevices
        .getUserMedia(this.constraintObj)
        .then((mediaStreamObj) => {
          if ("srcObject" in cameraVideo) {
            cameraVideo.srcObject = mediaStreamObj;
          } else {
            //old version
            cameraVideo.src = window.URL.createObjectURL(mediaStreamObj);
          }

          cameraVideo.onloadedmetadata = function () {
            cameraVideo.play();
          };

          let mediaRecorder = new MediaRecorder(mediaStreamObj);
          let chunks = [];

          start.addEventListener("click", () => {
            // console.log("loaded");
            recordedVideo.style.zIndex = "0";
            cameraStop.style.display = "none";
            start.style.display = "none";
            cameraStop.style.display = "none";
            stop.style.display = "block";
            stop.disabled = true;

            countDown();

            setTimeout(() => {
              stop.disabled = false;
              counter.style.opacity = "0";
              counter.innerHTML = "3";
              playIcon.style.opacity = "1";
              stockVideo.currentTime = 0;
              stockVideo.play();
              stockVideo.addEventListener("playing", function () {
                mediaRecorder.start();
              });
            }, 3000);
          });

          stop.addEventListener("click", () => {
            mediaRecorder.stop();
            stockVideo.pause();
            stockVideo.currentTime = 0;
            playIcon.style.opacity = "0";
            stop.style.display = "none";
            start.style.display = "block";
            submit.style.display = "block";
            cameraStop.style.display = "block";
            start.innerHTML = "Play song & record";
          });
          mediaRecorder.ondataavailable = function (ev) {
            chunks.push(ev.data);
          };
          mediaRecorder.onstop = () => {
            let blob = new Blob(chunks, {
              type: "video/webm;",
            });
            this.videoBlob = blob;
            chunks = [];
            let videoURL = window.URL.createObjectURL(blob);
            recordedVideo.src = videoURL;
            recordedVideo.style.zIndex = "1";
            start.innerHTML = "Delete & re-record";
            recordedVideo.currentTime = 0;
            recordedVideo.play();
          };
        });

      function countDown() {
        counter.style.opacity = "1";
        setTimeout(function () {
          counter.innerHTML = "2";
        }, 1000);
        setTimeout(function () {
          counter.innerHTML = "1";
        }, 2000);
      }
    },
    async upload() {
      this.stopCamera();
      this.uploading = true;

      let url = `${this.$store.state.apiRoot}/${this.$route.params.id}/submit-video`;
      let uploadURL = "";
      this.$axios
        .get(url)
        .then((response) => {
          if (response.data.status == 200) {
            uploadURL = response.data.uploadURL;

            if (this.videoBlob.size > 0) {
              var request = new XMLHttpRequest();
              request.addEventListener("load", this.videUploaded);
              request.upload.addEventListener("progress", this.videUploading);
              request.open("PUT", uploadURL);
              request.send(this.videoBlob);
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
                  text: response.error,
                },
                { height: "auto" }
              );
            }
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
    videUploading(event) {
      this.percent = Math.floor(100 * (event.loaded / this.videoBlob.size));
    },
    videUploaded() {
      this.uploading = false;
      this.uploadCompleted = true;
      setTimeout(() => {
        this.uploadCompleted = false;
      }, 5000);
    },
    showQrCodePopUp() {
      this.state.showQrCodePopUp = true;
      setTimeout(() => {
        // eslint-disable-next-line no-undef
        var qrcode = new QRCode("qrcode", {
          text: "http://jindo.dev.naver.com/collie",
          width: 160,
          height: 160,
          colorDark: "#000000",
          colorLight: "#ffffff",
          // eslint-disable-next-line no-undef
          correctLevel: QRCode.CorrectLevel.H,
        });
        qrcode.makeCode(this.$route.params.id);
      }, 1);
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.isLoggedIn;
    },
    projectId() {
      // console.log(this.$route.params.id);
      return { name: "project", params: { id: this.$route.params.id } };
    },
    fetchYoutubeVideo(){
      let url = this.$store.getters.fetchYoutubeVideoUrl
      console.log(url)
      return this.$store.getters.fetchYoutubeVideoUrl
    }
  },
  mounted() {
    // storing current route for next use
    this.$store.state.targetRoute = this.$router.currentRoute.path;
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/style.scss";
$video-width: 1000px;
$video-height: calc(#{$video-width} * 9 / 16);

.progressbar {
  width: 600px;
  margin-top: -2.5rem;
}
.uploaded {
  margin: 0;
  color: $color-primary;
  font-weight: bold;
}
.record {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7rem 0;
  &-container {
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .video-container {
    box-sizing: border-box;
    width: $video-width;
    @include responsive(small-desktop) {
      width: 800px;
    }
    position: relative;
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 562px;
      @include responsive(small-desktop) {
        height: 450px;
      }
      @include responsive(tablet-portrait) {
        width: 750px;
        height: auto;
        left: auto;
        // right: 0;
      }
      background: black;
    }
    #count {
      color: white;
      position: absolute;
      z-index: 6;
      top: calc(450px / 2 + 3rem);
      @include responsive(small-desktop) {
        top: calc(450px / 2);
      }
      left: calc(50% - 1.5rem);
      opacity: 0;
    }
    .play-icon {
      box-sizing: border-box;
      border-radius: 50%;
      text-align: center;
      animation: animate 2s linear infinite;
      cursor: pointer;
      width: 1.3rem;
      height: 1.3rem;
      position: absolute;
      right: 3vh;
      top: 4vh;
      @include responsive(tablet-portrait) {
        right: 3vh;
      }
      transform: translate(-50%, -50%);
      display: flex;
      opacity: 0;
      border: 2px solid red;
      .border {
        background: red;
        width: 0.9rem;
        height: 0.9rem;
        margin: auto;
        border-radius: 50%;
      }
    }
  }
}
.bottom-video-control {
  margin: 0 auto;
  position: absolute;
  width: 1000px;
  top: calc(#{$video-height} + 9rem);
  @include responsive(small-desktop) {
    top: calc(450px + 8rem);
    width: 800px;
  }
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 2rem;
  justify-content: space-between;
  @include responsive(tablet-portrait) {
    width: 750px;
  }
  .bottom-video {
    text-align: left;
    width: 320px;
    .stockVideo,
    video {
      height: 180px;
      @include responsive(phone) {
        max-height: auto;
        width: 100%;
      }
    }
  }
  .control-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .control {
      display: flex;
      justify-content: space-between;
      &-right {
        width: 220px;
      }
    }
    .help-text {
      text-align: left;
    }
    .btn {
      display: block;
      margin-bottom: 1rem;
      @include responsive(phone) {
        margin: 1rem 0;
      }
    }
    button {
      width: 220px;
    }
    #btnStart,
    #btnStop,
    #cameraStop,
    #btnSubmit {
      display: none;
    }
    #checkbox {
      display: flex;
      align-items: center;

      $black: $color-dark;
      $lightgray: #9c9e9f;
      $gray: #bdc1c6;
      $white: #fff;
      $green: #06842c;
      input[type="checkbox"] {
        position: relative;
        width: 1rem;
        height: 1rem;
        color: $black;
        border: 1px solid $black;
        border-radius: 4px;
        appearance: none;
        outline: 0;
        cursor: pointer;
        transition: all 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
        &::before {
          position: absolute;
          content: "";
          display: block;
          top: -1px;
          left: 3px;
          width: 6px;
          height: 10px;
          border-style: solid;
          border-color: $white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
          opacity: 0;
        }
        &:checked {
          color: $white;
          border-color: red;
          background: red;
          &::before {
            opacity: 1;
          }
          ~ label {
            color: red;
          }
          ~ label::before {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
        }
      }

      label {
        position: relative;
        cursor: pointer;
        font-size: 1rem;
        padding: 0 0.25rem;
        user-select: none;
        text-transform: capitalize;
        color: $black;
        &::before {
          position: absolute;
          content: attr(data-content);
          color: red;
          clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
          text-decoration-color: $black;
          transition: clip-path 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      }
    }
  }
}
.qrCodeContainer {
  width: 40vw;
  height: 30vw;
  position: fixed;
  left: 28.5vw;
  top: calc((100vh - 30vw) / 2);
  z-index: 100;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  -webkit-box-shadow: 0px 0px 21px -3px rgba(0, 0, 0, 0.47);
  -moz-box-shadow: 0px 0px 21px -3px rgba(0, 0, 0, 0.47);
  box-shadow: 0px 0px 21px -3px rgba(0, 0, 0, 0.47);
  img {
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 1.5rem;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h4 {
    max-width: 400px;
    line-height: 1.8;
  }
}
#qrcode {
  width: 160px;
  height: 160px;
}
.help-text {
  line-height: 1.5;
}
@keyframes animate {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
  }
  40% {
    box-shadow: 0 0 0 1.5rem rgba(255, 0, 0, 0);
  }
  80% {
    box-shadow: 0 0 0 1.5rem rgba(255, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 rgba(255, 0, 0, 0);
  }
}
</style>
