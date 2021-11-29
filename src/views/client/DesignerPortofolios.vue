<template>
  <div class="vh-100">
    <div class="nav-bg bg-info">
      <Navbar />
    </div>
    <BottomNavbar />
    <div class="container mw-75 mt-4">
      <div class="h2 text-start d-flex justify-content-between">
        <h2>{{ designerName }}'s Portofolios</h2>
        <div v-if="following">
          <button
            @click="follow"
            type="button"
            class="btn btn-dark rounded-pill py-0 px-3"
          >
            <span class="bi bi-check2-circle fs-5 align-middle" />
            Following
          </button>
        </div>
        <div v-if="!following">
          <button
            @click="follow"
            type="button"
            class="btn btn-outline-dark rounded-pill py-0 px-3"
          >
            <span class="bi bi-plus fs-5 align-middle" />
            Follow
          </button>
        </div>
      </div>
      <vueper-slides
        v-if="portofolios.length > 0"
        class="no-shadow arrows-outside"
        :bullets="false"
        :visible-slides="4"
        slide-multiple
        :gap="3"
        :slide-ratio="1 / 4"
        :dragging-distance="70"
        :breakpoints="breakpoints"
      >
        <vueper-slide v-for="(portofolio, i) in portofolios" :key="i">
          <template #content>
            <div
              class="
                h-100
                w-100
                d-flex
                flex-column
                justify-content-center
                align-items-center
              "
            >
              <div
                class="
                  overflow-hidden
                  card-img
                  bg-info
                  rounded
                  mb-3
                  thumbnail-img
                "
              >
                <embed
                  class="card-img"
                  :src="portofolio.thumbnail"
                  alt="portofolio"
                />
              </div>
              <p class="h-6 fw-bold">{{ portofolio.title }}</p>
              <router-link
                :to="
                  '/designerportofolios/' +
                  this.$route.params.designerId +
                  '/' +
                  portofolio.docId
                "
              >
                <button class="btn btn-secondary">More Info</button>
              </router-link>
            </div>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../../firebase/firebase-init";

export default {
  name: "Home Designer",
  components: { Navbar, VueperSlides, VueperSlide, BottomNavbar },
  data() {
    return {
      portofolios: [],
      designerName: "",
      following: null,
      breakpoints: {
        800: {
          slideRatio: 1 / 1,
          visibleSlides: 2,
          arrows: false,
        },
        1430: {
          slideRatio: 1 / 3.5,
        },
        1180: {
          slideRatio: 1 / 2.7,
          visibleSlides: 3,
        },
        1000: {
          slideRatio: 1 / 2,
          visibleSlides: 2,
        },
      },
      slides: [
        {
          title: "Object Design",
          img: "https://picsum.photos/600/400.jpg",
          content: '<button classname="btn btn-dark">More Info</button>',
        },
        {
          title: "Object Design",
          img: "https://picsum.photos/600/400.jpg",
          content: '<button classname="btn btn-dark">More Info</button>',
        },
        {
          title: "Object Design",
          img: "https://picsum.photos/600/400.jpg",
          content: '<button classname="btn btn-dark">More Info</button>',
        },
        {
          title: "Object  Design",
          img: "https://picsum.photos/600/400.jpg",
          content: '<button classname="btn btn-dark">More Info</button>',
        },
        {
          title: "Object  Design",
          img: "https://picsum.photos/600/400.jpg",
          content: '<button classname="btn btn-dark">More Info</button>',
        },
      ],
    };
  },
  methods: {
    follow() {
      if (this.following == false) {
        db.collection("users")
          .doc(this.$route.params.designerId)
          .update({
            follower: firebase.firestore.FieldValue.arrayUnion(
              this.$store.state.profileId
            ),
          });
        this.getFollower();
        this.sendNotification();
      } else {
        db.collection("users")
          .doc(this.$route.params.designerId)
          .update({
            follower: firebase.firestore.FieldValue.arrayRemove(
              this.$store.state.profileId
            ),
          });
        this.getFollower();
      }
    },
    getFollower() {
      db.collection("users")
        .doc(this.$route.params.designerId)
        .get()
        .then((snapshot) => {
          if (snapshot.data().follower.includes(this.$store.state.profileId)) {
            this.following = true;
          } else {
            this.following = false;
          }
          console.log(this.following);
        });
    },
    sendNotification() {
      const today = new Date();
      let seconds = "";
      if (today.getSeconds() < 10) {
        console.log("0" + today.getSeconds().toString());
        seconds = "0" + today.getSeconds().toString();
      }
      if (today.getSeconds() >= 10) {
        console.log(today.getSeconds().toString());
        seconds = today.getSeconds().toString();
      }
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + seconds;
      const dateTime = date + " " + time;
      db.collection("notifications").doc().set({
        to: this.$route.params.designerId,
        sender: this.$store.state.profileName,
        senderId: this.$store.state.profileId,
        notificationType: "follow",
        notificationText: "following you",
        time: dateTime,
        link: "/homedesigner",
      });

      db.collection("users")
        .doc(this.$route.params.receiverId)
        .update({
          unreadNotifications: firebase.firestore.FieldValue.increment(1),
        });
    },
  },
  mounted() {
    if (localStorage.getItem("reloadedhomedesigner")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloadedhomedesigner");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloadedhomedesigner", "1");
      location.reload();
    }
  },
  created() {
    db.collection("portofolio")
      .where("designerId", "==", this.$route.params.designerId)
      .get()
      .then((querysnapshot) => {
        this.getFollower();
        querysnapshot.forEach((doc) => {
          (this.designerName = doc.data().designerName),
            this.portofolios.push({
              docId: doc.id,
              thumbnail: doc.data().photosOrVideos[0],
              title: doc.data().portoTitle,
            });
        });
      });
  },
};
</script>

<style>
.nav-bg {
  height: 40%;
  background-image: url("../../assets/bg_designer.png");
  background-position: bottom left;
  background-size: cover;
}

.mw-75 {
  max-width: 75%;
}

.card-img {
  width: 120px;
  height: 120px;
}

.vueperslide {
  margin: 3px;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.btn-secondary {
  background: #dddcd8;
  color: #000;
  border: 1px solid #dddcd8;
}

.center {
  object-position: center;
}

.thumbnail-img embed {
  object-fit: cover;
}
</style>