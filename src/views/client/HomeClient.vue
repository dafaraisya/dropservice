<template>
  <div class="vh-100">
    <div class="nav-bg bg-info">
      <Navbar />
    </div>
    <BottomNavbar />
    <div class="container mw-75 mt-5">
      <p class="h2 mb-1 fw-bold text-start">Design For You</p>
      <p class="h5 text-start">Type of Design is Here for Your Idea!!</p>
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
        <vueper-slide v-for="(slide, i) in slidesCategory" :key="i">
          <template #content>
            <router-link
              :to="slide.link"
              style="text-decoration: none; color: inherit"
            >
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
                <div class="min-width">
                  <p class="h-6 fw-bold align-self-start">
                    {{ slide.title.toUpperCase() }}
                  </p>
                </div>
                <div class="card-img">
                  <img :src="slide.img" alt="category" />
                </div>
              </div>
            </router-link>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>

    <div class="container mw-75 mt-4 pb-5">
      <p class="h2 mb-1 fw-bold text-start">Designer You Might Need</p>
      <p class="h5 text-start">Here are some designer based on your interest</p>
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
        <vueper-slide v-for="(designer, i) in listDesigner" :key="i">
          <template #content>
            <router-link
              :to="'/designerportofolios/' + designer.docId"
              style="text-decoration: none; color: inherit"
            >
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
                <div class="min-width mb-3">
                  <p class="h-6 fw-bold align-self-start m-0 p-0">
                    {{ designer.name }}
                  </p>
                  <p class="h-6 category fw-light align-self-start m-0 p-0">
                    {{ designer.specialization }}
                  </p>
                </div>
                <div class=" card-img">
                  <img
                    :src="designer.profilePicture"
                    alt="category"
                  />
                </div>
              </div>
            </router-link>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>
    <br /><br />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import BottomNavbar from "@/components/BottomNavbar.vue";
import "vueperslides/dist/vueperslides.css";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
import db from "../../firebase/firebase-init";

export default {
  name: "Home Client",
  components: { Navbar, VueperSlides, VueperSlide, BottomNavbar },
  mounted() {
    if (localStorage.getItem("reloadedhomeclient")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloadedhomeclient");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloadedhomeclient", "1");
      location.reload();
    }
  },
  data() {
    return {
      listDesigner: [],
      breakpoints: {
        // 670: {
        //   slideRatio: 1/1.5,
        //   visibleSlides: 2,
        //   arrows: false,
        // },
        800: {
          slideRatio: 1 / 1.6,
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
          slideRatio: 1 / 2.6,
          visibleSlides: 3,
        },
      },
      slidesCategory: [
        {
          title: "Web Design",
          img: "https://firebasestorage.googleapis.com/v0/b/dropservice-99b2d.appspot.com/o/assets%2Fweb_design.jpg?alt=media&token=283a49d6-797d-4951-8b45-ad9e344cb510",
          link: "/designerportofolioscategory/Web Design",
        },
        {
          title: "Video Editing",
          img: "https://firebasestorage.googleapis.com/v0/b/dropservice-99b2d.appspot.com/o/assets%2Fvideo_editing.jpg?alt=media&token=daaad03d-027d-4338-9c74-c0d39b2a0f8a",
          link: "/designerportofolioscategory/Video Editing",
        },
        {
          title: "Animation",
          img: "https://firebasestorage.googleapis.com/v0/b/dropservice-99b2d.appspot.com/o/assets%2Fanimation.jpg?alt=media&token=b7c08235-35fc-495f-a43e-76900a91ec19",
          link: "/designerportofolioscategory/Animation",
        },
        {
          title: "App Development",
          img: "https://firebasestorage.googleapis.com/v0/b/dropservice-99b2d.appspot.com/o/assets%2Fapp_development.jpg?alt=media&token=1d5f1ef6-472a-4426-a776-573c302d392a",
          link: "/designerportofolioscategory/App Development",
        },
      ],
      slidesDesigner: [
        {
          name: "Gabriel",
          category: "Content Creator Specialist",
          img: "https://picsum.photos/600/400.jpg",
        },
        {
          name: "Anselma",
          category: "Photo Editing Specialist",
          img: "https://picsum.photos/600/400.jpg",
        },
        {
          name: "Jeff Bezos",
          category: "App Development Specialist",
          img: "https://picsum.photos/600/400.jpg",
        },
        {
          name: "David",
          category: "Photo and Video Editing",
          img: "https://picsum.photos/600/400.jpg",
        },
      ],
    };
  },
  created() {
    db.collection("users")
      .where("role", "==", "designer")
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          this.listDesigner.push({
            docId: doc.id,
            name: doc.data().name,
            specialization: doc.data().specialization,
            profilePicture: doc.data().profilePicture,
          });
          //   this.chat.docId(doc.id);
        });
      });
  },
};
</script>

<style>
.nav-bg {
  height: 40%;
  background-image: url("../../assets/bg_client.png");
  background-position: bottom left;
  background-size: cover;
}

.mw-75 {
  max-width: 75%;
}

.vueperslide {
  padding: 10px 20px;
  background: #737373;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  color: #fff;
  border-radius: 15px;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: start;
}

.min-width {
  width: 100%;
  height: 35%;
}

.card-img {
  width: 100%;
  height: 120px;
  align-self: center;
  border-radius: 10px;
  overflow: hidden;
}

.card-img img {
  width: inherit;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.category {
  font-size: 1.1rem;
}

@media only screen and (max-width: 700px) {
  .card-img {
    height: 50%;
  }

  .vueperslide {
    font-size: 0.8rem;
  }

  .category {
    font-size: 0.7rem;
  }
}
</style>