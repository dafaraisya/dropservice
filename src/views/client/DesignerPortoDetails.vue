<template>
  <div v-if="loading">
    <Loading />
  </div>
  <div class="container d-flex justify-content-center">
    <div class="row w-100 vh-100" :class="isMobile() ? 'row-cols-1' : ''">
      <div
        class="col d-flex flex-column justify-top text-start"
        :class="isMobile() ? 'mb-5' : ''"
      >
        <div class="d-flex justify-content-between">
          <p class="h4 fw-bold m-0">Portofolio Details</p>
        </div>
        <!-- <div class="porto-img bg-black mt-3 mb-2"></div> -->
        <Carousel
          class="porto-img bg-black mt-3 mb-2 overflow-hidden"
          :assets="photosOrVideos"
        />
        <!-- <p class="h3 fw-bold">{{ this.$route.params.titleporto }}</p> -->
        <div
          type="text"
          class="border-0 m-0 p-0 fs-3 fw-bold"
          placeholder="Your Portofolio"
        >
          {{ portoTitle }}
        </div>
        <div type="text" class="border-0 m-0 p-0 fs-6">
          {{ price }}
        </div>
        <!-- <p class="h6">Rp500.000,00/item(approximately)</p> -->
      </div>
      <div class="col d-flex flex-column justify-bottom">
        <!-- <p class="m-0 fs-6">Video intro 3-5 minutes full HD</p>
                <p class="m-0 fs-6">Contact for more information</p> -->
        <p
          class="px-5 align-self-center text-center lh-sm w-75 border-0"
          placeholder="Write a description of your &#10;service in this section"
          rows="2"
        >
          {{ description }}
        </p>
        <TabNav
          class="mt-4 w-75"
          :tabs="['Provision', 'How to Order']"
          :selected="selected"
          @selected="setSelected"
        >
          <Tab class="mt-1" :isSelected="selected === 'Provision'">
            <p
              class="form-control px-2 border-0 shadow-none fw-light"
              placeholder="Your provision here"
              rows="3"
            >
              {{ provision }}
            </p>
          </Tab>
          <Tab class="mt-1" :isSelected="selected === 'How to Order'">
            <p
              class="form-control px-2 border-0 shadow-none fw-light"
              placeholder="How to order your service"
              rows="3"
            >
              {{ howToOrder }}
            </p>
          </Tab>
        </TabNav>
        <div class="row w-75 mt-3 align-self-center">
          <div class="col">
            <p class="h3 bi bi-share-fill"></p>
          </div>
          <div class="col">
            <p class="h3 bi bi-heart-fill"></p>
          </div>
          <div class="col">
            <button
              @click.prevent="createChat"
              style="padding: 0; border: none; background: none"
            >
              <p class="h3 bi bi-chat-right-text-fill"></p>
            </button>
          </div>
          <div class="col-6">
            <button
              @click.prevent="createTransaction"
              class="btn btn-dark w-100"
            >
              Order
            </button>
          </div>
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
import db from "../../firebase/firebase-init";
import Loading from "../../components/Loading.vue";

export default {
  name: "Portofolio Details",
  components: { TabNav, Tab, Carousel, Loading },
  data() {
    return {
      loading: null,
      windowWidth: 0,
      selected: "Provision",
      description: "",
      photosOrVideos: [],
      category: "",
      portoTitle: "",
      price: "",
      provision: "",
      howToOrder: "",
      designerId: "",
      designerName: "",
      assets: [
        "https://i.picsum.photos/id/1066/600/400.jpg?hmac=UuVv5829ZbdNQNaZ_UA0tbS15_xKJQTmH0inYMH_wOs",
        "https://i.picsum.photos/id/609/600/400.jpg?hmac=r-IiITWKZ2Q_t4oL01WKmqixoWMI-QJ7LDooJ-JiJ9c",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      ],
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    db.collection("portofolio")
      .doc(this.$route.params.portoId)
      .get()
      .then((snapshot) => {
        this.description = snapshot.data().description;
        this.photosOrVideos = snapshot.data().photosOrVideos;
        this.category = snapshot.data().category;
        this.portoTitle = snapshot.data().portoTitle;
        this.price = snapshot.data().price;
        this.provision = snapshot.data().provision;
        this.howToOrder = snapshot.data().howToOrder;
        this.designerId = snapshot.data().designerId;
        this.designerName = snapshot.data().designerName;
      });
  },
  methods: {
    setSelected(tab) {
      this.selected = tab;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    isMobile() {
      if (this.windowWidth <= 1000) return true;
      else return false;
    },
    async createChat() {
      const dataBase = db
        .collection("chats")
        .doc(this.$store.state.profileId + this.designerId);
      await dataBase
        .set({
          clientId: firebase.auth().currentUser.uid,
          clientName: this.$store.state.profileName,
          designerId: this.designerId,
          designerName: this.designerName,
        })
        .then(() => {
          this.$router.push(
            "/chatroom/" +
              this.designerName +
              "/" +
              this.$store.state.profileId +
              this.designerId
          );
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
    async createTransaction() {
      const dataBase = db.collection("transactions");
      await dataBase
        .add({
          description: this.description,
          photosOrVideos: this.photosOrVideos,
          category: this.category,
          portoTitle: this.portoTitle,
          price: this.price,
          provision: this.provision,
          howToOrder: this.howToOrder,
          designerId: this.designerId,
          designerName: this.designerName,
          clientId: this.$store.state.profileId,
          clientName: this.$store.state.profileName,
        })
        .then((docRef) => {
          this.sendNotification(docRef.id);
          this.$router.push("/detailstransaction/" + docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
    sendNotification(docId) {
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
      db.collection("notifications")
        .doc()
        .set({
          to: this.designerId,
          sender: this.$store.state.profileName,
          senderId: this.$store.state.profileId,
          notificationType: "transaction",
          notificationText: "new transaction",
          time: dateTime,
          link: "/detailstransaction/" + docId,
        });

      db.collection("users")
        .doc(this.$route.params.receiverId)
        .update({
          unreadNotifications: firebase.firestore.FieldValue.increment(1),
        });
    },
  },
};
</script>

<style>
#circle-profile {
  width: 50px;
  height: 50px;
}

.porto-img {
  height: fit-content;
}

.justify-top,
.justify-bottom {
  justify-content: center;
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

@media only screen and (max-width: 1000px) {
  .justify-top {
    justify-content: end !important;
  }

  .justify-bottom {
    justify-content: start !important;
  }
}
</style>