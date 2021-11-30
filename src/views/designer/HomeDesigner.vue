<template>
  <div class="vh-100">
    <div class="nav-bg bg-info">
      <Navbar />
    </div>
    <BottomNavbar />
    <div class="container mt-4 home-designer-content">
      <div class="h2 text-start d-flex justify-content-between">
        <h2>Your Portofolio</h2>
        <div>
          <router-link to="/addportofolio">
            <button
              type="button"
              class="btn btn-outline-dark rounded-pill py-0"
            >
              <span class="bi bi-plus fs-5 align-middle" />
              Add
            </button>
          </router-link>
          <button type="button" class="btn btn-dark rounded-pill py-0" disabled>
            <span class="bi bi-people-fill fs-5 align-middle" />
            {{ follower }}
          </button>
          <!-- <span class="border border-dark rounded-pill py-0 px-3 fs-4">
            <span class="bi bi-people-fill fs-5 align-middle" />
            Follower
          </span> -->
        </div>
      </div>
      <div
        v-if="portoNotFound"
        class="border border-danger rounded-pill py-2"
        style="margin-top: 80px"
      >
        <span>Data Not Found, Please Upload Your Portofolio</span>
      </div>
      <vueper-slides
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
              <div class="overflow-hidden card-img bg-info rounded mb-3">
                <embed
                  class="card-img"
                  :src="portofolio.thumbnail"
                  alt="portofolio"
                />
              </div>
              <p class="h-6 fw-bold">{{ portofolio.title }}</p>
              <router-link :to="'/portofoliodetails/' + portofolio.docId">
                <button class="btn btn-secondary">More Info</button>
              </router-link>
            </div>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>
    <br /><br /><br /><br />
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
      portoNotFound: null,
      follower: null,
      breakpoints: {
        // 670: {
        //   slideRatio: 1/1.5,
        //   visibleSlides: 2,
        //   arrows: false,
        // },
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
      .where("designerId", "==", firebase.auth().currentUser.uid)
      .get()
      .then((querysnapshot) => {
        this.getFollower();
        querysnapshot.forEach((doc) => {
          this.portofolios.push({
            docId: doc.id,
            thumbnail: doc.data().photosOrVideos[0],
            title: doc.data().portoTitle,
          });
          //   this.chat.docId(doc.id);
        });
        if (this.portofolios.length < 1) {
          this.portoNotFound = true;
        }
      });
  },
  methods: {
    getFollower() {
      db.collection("users")
        .doc(this.$store.state.profileId)
        .get()
        .then((snapshot) => {
          this.follower = snapshot.data().follower.length;
        });
    },
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

.home-designer-content {
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
.btn.btn-dark[disabled] {
  margin-left: 20px;
  background-color: #0b3985;
}
@media only screen and (max-width: 700px) {
  .home-designer-content {
    max-width: 100%;
  }
}
</style>