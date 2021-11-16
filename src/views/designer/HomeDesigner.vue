<template>
  <div class="vh-100">
    <div class="nav-bg bg-info">
      <Navbar/>
    </div>
    <BottomNavbar/>
    <div class="container mw-75 mt-4">
      <p class="h2 text-start">Your Portofolio</p>
      <vueper-slides
        class="no-shadow  arrows-outside"
        :bullets="false"
        :visible-slides="4"
        slide-multiple
        :gap="3"
        :slide-ratio="1 / 4"
        :dragging-distance="70"
        :breakpoints="breakpoints">
        <vueper-slide v-for="(slide, i) in slides" :key="i">
            <template #content>
              <div class="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
                <div class="overflow-hidden card-img bg-info rounded mb-3">
                  <img class="center" :src="slide.img" alt="portofolio">
                </div>
                <p class="h-6 fw-bold">{{ slide.title }}</p>
                <router-link :to="'/portofoliodetails/' + slide.title">
                  <button class="btn btn-secondary">More Info</button>
                </router-link>
              </div>
            </template>
        </vueper-slide>
      </vueper-slides>
      <!-- <div class="row mt-3">
        <div class="col">
          <div class="card pt-4 pb-2">
            <div class="card-img card-img-top bg-info rounded"></div>
            <div class="card-body">
              <p class="card-title fw-bold">Object Design</p>
              <router-link to="/portofoliodetails/Object Design">
                <button type="button" class="btn btn-secondary mt-2">
                  More Info
                </button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card pt-4 pb-2">
            <div class="card-img card-img-top bg-info rounded"></div>
            <div class="card-body">
              <p class="card-title fw-bold">Video Intro</p>
              <router-link to="/portofoliodetails/Video Intro">
                <button type="button" class="btn btn-secondary mt-2">
                  More Info
                </button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card pt-4 pb-2">
            <div class="card-img card-img-top bg-info rounded"></div>
            <div class="card-body">
              <p class="card-title fw-bold">Video Bumper</p>
              <router-link to="/portofoliodetails/Video Bumper">
                <button type="button" class="btn btn-secondary mt-2">
                  More Info
                </button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card pt-4 pb-2">
            <div class="card-img card-img-top bg-info rounded"></div>
            <div class="card-body">
              <p class="card-title fw-bold">Video Animasi</p>
              <router-link to="/portofoliodetails/Video Animasi">
                <button type="button" class="btn btn-secondary mt-2">
                  More Info
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import BottomNavbar from "@/components/BottomNavbar.vue"
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  name: "Home Designer",
  components: { Navbar, VueperSlides, VueperSlide, BottomNavbar },
  data() {
    return {
      breakpoints: {
        // 670: {
        //   slideRatio: 1/1.5,
        //   visibleSlides: 2,
        //   arrows: false,
        // },
        800: {
          slideRatio: 1/1,
          visibleSlides: 2,
          arrows: false,
        },
        1430: {
          slideRatio: 1/3.5
        },
        1180: {
          slideRatio: 1/2.7,
          visibleSlides: 3,
        },
        1000: {
          slideRatio: 1/2,
          visibleSlides: 2,
        }
      },
      slides: [
        {
          title: 'Object Design',
          img: 'https://picsum.photos/600/400.jpg',
          content: '<button classname="btn btn-dark">More Info</button>'
        },
        {
          title: 'Object Design',
          img: 'https://picsum.photos/600/400.jpg',
          content: '<button classname="btn btn-dark">More Info</button>'
        },
        {
          title: 'Object Design',
          img: 'https://picsum.photos/600/400.jpg',
          content: '<button classname="btn btn-dark">More Info</button>'
        },
        {
          title: 'Object  Design',
          img: 'https://picsum.photos/600/400.jpg',
          content: '<button classname="btn btn-dark">More Info</button>'
        },
        {
          title: 'Object  Design',
          img: 'https://picsum.photos/600/400.jpg',
          content: '<button classname="btn btn-dark">More Info</button>'
        },
      ]
    }
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
};
</script>

<style>
.nav-bg {
  height: 40%;
  background-image: url('../../assets/bg_designer.png');
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
  background: #DDDCD8;
  color: #000;
  border: 1px solid #DDDCD8;
}

.center {
  object-position: center;
}
</style>