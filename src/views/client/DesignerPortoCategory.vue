<template>
  <div class="vh-100">
    <div class="nav-bg bg-info">
      <Navbar />
    </div>
    <div class="container mw-75 mt-4 pb-5">
      <p class="h2 mb-1 fw-bold text-start">
        {{ this.$route.params.category }}
      </p>
      <p class="h5 text-start">
        Here are some designer for {{ this.$route.params.category }}
      </p>
      <div
        v-if="dataNotFound"
        class="border border-danger rounded-pill py-2"
        style="margin-top: 80px"
      >
        <span>Data Not Found</span>
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
                  <div>
                    <p class="h-6 max-line fw-bold align-self-start m-0 p-0">
                      {{ designer.portoTitle }}
                    </p>
                  </div>
                  <p class="h-6 category fw-light align-self-start m-0 p-0">
                    {{ designer.designerName }}
                  </p>
                </div>
                <div class="overflow-hidden card-img bg-info my-2">
                  <embed
                    :src="designer.photosOrVideos"
                    alt="category"
                  />
                </div>
              </div>
            </router-link>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import db from "../../firebase/firebase-init";
export default {
  name: "DesignerPortoCategory",
  components: { VueperSlides, VueperSlide, Navbar },
  data() {
    return {
      listDesigner: [],
      dataNotFound: null,
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
    };
  },
  created() {
    db.collection("portofolio")
      .where("category", "==", this.$route.params.category)
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          this.listDesigner.push({
            docId: doc.data().designerId,
            designerName: doc.data().designerName,
            photosOrVideos: doc.data().photosOrVideos[0],
            portoTitle: doc.data().portoTitle,
          });
        });
        if (this.listDesigner == 0) {
          this.dataNotFound = true;
        }
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
  margin: 3px;
  padding: 10px 20px;
  background: #737373;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  color: #fff;
  border-radius: 15px;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: start;
}

.max-line {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
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
}

.card-img embed {
  width: inherit;
  height: 100%;
  object-fit: cover;
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