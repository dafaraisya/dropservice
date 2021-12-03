<template>
  <div v-if="loading">
    <Loading />
  </div>
  <div class="container d-flex justify-content-center vh-100">
    <div class="row w-100 h-100">
      <div
        class="col h-100 d-flex flex-column justify-content-center text-start"
      >
        <div class="d-flex justify-content-between">
          <p class="h4 fw-bold m-0">Portofolio Details</p>
          <label class="custom-file-upload">
            <input @change="uploadFile" type="file" />
            Add Photo Or Video
          </label>
        </div>
        <!-- <div class="porto-img bg-black mt-3 mb-2"></div> -->
        <Carousel
          v-if="photosOrVideos.length > 0"
          class="porto-img bg-black mt-3 mb-2 overflow-hidden"
          :assets="photosOrVideos"
        />
        <div
          v-else
          class="porto-img bg-black mt-3 mb-2 overflow-hidden position-relative"
        >
          <h6
            class="
              text-white
              position-absolute
              top-50
              start-50
              translate-middle
            "
          >
            Silahkan Upload Foto atau Video Anda
          </h6>
        </div>
        <div class="d-flex">
          <div
            v-for="(photoOrVideo, index) in photosOrVideos"
            :key="photoOrVideo"
            class="p-1"
          >
            <div @click="deleteImage(photoOrVideo, index)" class="delete-img">
              <i class="bi bi-x-square-fill"></i>
            </div>
            <embed
              :src="photoOrVideo"
              class="container-img"
              alt=""
              width="100"
            />
          </div>
        </div>
        <div class="dropdown">
          <button
            class="btn border border-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ category }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <button
                @click="chooseCategory('Web Design')"
                class="dropdown-item"
              >
                Web Design
              </button>
            </li>
            <li>
              <button
                @click="chooseCategory('Video Editing')"
                class="dropdown-item"
              >
                Video Editing
              </button>
            </li>
            <li>
              <button
                @click="chooseCategory('Animation')"
                class="dropdown-item"
              >
                Animation
              </button>
            </li>
            <li>
              <button
                @click="chooseCategory('App Development')"
                class="dropdown-item"
              >
                App Development
              </button>
            </li>
          </ul>
        </div>
        <!-- <p class="h3 fw-bold">{{ this.$route.params.titleporto }}</p> -->
        <input
          v-model="portoTitle"
          type="text"
          class="border-0 m-0 p-0 fs-3 fw-bold"
          placeholder="Your Portofolio Title Here..."
        />
        <input
          v-model="price"
          type="text"
          class="border-0 m-0 p-0 fs-6"
          placeholder="Write Your Price Here... (Example : Rp500.000,00/item)"
        />
        <!-- <p class="h6">Rp500.000,00/item(approximately)</p> -->
      </div>
      <div class="col h-100 d-flex flex-column justify-content-center">
        <!-- <p class="m-0 fs-6">Video intro 3-5 minutes full HD</p>
                <p class="m-0 fs-6">Contact for more information</p> -->
        <textarea
          v-model="description"
          class="px-5 align-self-center text-center lh-sm w-75 border-0"
          placeholder="Write a description of your &#10;service in this section..."
          rows="2"
        ></textarea>
        <TabNav
          class="mt-4 w-75"
          :tabs="['Provision', 'How to Order']"
          :selected="selected"
          @selected="setSelected"
        >
          <Tab class="mt-1" :isSelected="selected === 'Provision'">
            <textarea
              v-model="provision"
              class="form-control px-2 border-0 shadow-none fw-light"
              placeholder="Your provision here..."
              rows="3"
            ></textarea>
          </Tab>
          <Tab class="mt-1" :isSelected="selected === 'How to Order'">
            <textarea
              v-model="howToOrder"
              class="form-control px-2 border-0 shadow-none fw-light"
              placeholder="How to order your service..."
              rows="3"
            ></textarea>
          </Tab>
        </TabNav>
        <div class="w-75 mt-3 align-self-center">
          <button @click.prevent="addPorto" class="btn btn-dark w-100">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabNav from "@/components/TabNav.vue";
import Tab from "@/components/Tab.vue";
import Carousel from "@/components/CarouselDetails.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import db from "../../firebase/firebase-init";
import Loading from "../../components/Loading.vue";

export default {
  name: "Add Porto",
  components: { TabNav, Tab, Carousel, Loading },
  data() {
    return {
      loading: null,
      selected: "Provision",
      category: "Category",
      description: "",
      photosOrVideos: [],
      portoTitle: "",
      price: "",
      provision: "",
      howToOrder: "",
      assets: [
        "https://i.picsum.photos/id/1066/600/400.jpg?hmac=UuVv5829ZbdNQNaZ_UA0tbS15_xKJQTmH0inYMH_wOs",
        "https://i.picsum.photos/id/609/600/400.jpg?hmac=r-IiITWKZ2Q_t4oL01WKmqixoWMI-QJ7LDooJ-JiJ9c",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      ],
    };
  },
  methods: {
    chooseCategory(value) {
      this.category = value;
    },
    setSelected(tab) {
      this.selected = tab;
    },
    uploadFile(e) {
      this.loading = true;
      let file = e.target.files[0];
      var storageRef = firebase.storage().ref("portofolios/" + file.name);
      let uploadTask = storageRef.put(file);
      uploadTask
        .then(() => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.photosOrVideos.push(downloadURL);
            this.loading = false;
            console.log(downloadURL);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async addPorto() {
      if (
        this.description !== "" &&
        this.photosOrVideos !== "" &&
        this.category !== "" &&
        this.portoTitle !== "" &&
        this.price !== "" &&
        this.provision !== "" &&
        this.howToOrder !== ""
      ) {
        const dataBase = db.collection("portofolio").doc();
        await dataBase.set({
          description: this.description,
          photosOrVideos: this.photosOrVideos,
          category: this.category,
          portoTitle: this.portoTitle,
          price: this.price,
          provision: this.provision,
          howToOrder: this.howToOrder,
          designerId: this.$store.state.profileId,
          designerName: this.$store.state.profileName,
        });

        if (this.$store.state.profileRole == "designer") {
          this.$router.push("/homedesigner");
        }

        if (this.$store.state.profileRole == "client") {
          this.$router.push("/homeclient");
        }
        return;
      } else {
        console.log("error");
      }
    },
    deleteImage(photoOrVideo, index) {
      let file = firebase.storage().refFromURL(photoOrVideo);

      this.photosOrVideos.splice(index, 1);
      file
        .delete()
        .then(function () {
          console.log("image deleted");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  // props: {
  //     portoName: {
  //         type: String,
  //         required: true
  //     }
  // }
};
</script>

<style>
#circle-profile {
  width: 50px;
  height: 50px;
}

.porto-img {
  height: 45%;
}

textarea {
  resize: none;
  outline: none;
}

.form-control {
  background: transparent !important;
  border-radius: 0 !important;
  height: 100% !important;
}

input {
  outline: none;
}

input[type="file"] {
  display: none;
}

.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
.delete-img {
  position: absolute;
  margin-left: 75px;
  color: white;
  font-size: 20px;
}

.delete-img:hover {
  cursor: pointer;
}
</style>