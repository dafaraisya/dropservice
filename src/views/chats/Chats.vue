<template>
  <div class="container vh-100">
    <div class="row h-100">
      <!-- Profile -->
      <div class="col d-none d-lg-flex flex-column justify-content-center align-items-center">
        <div
          class="
            profile-shape
            d-flex
            justify-content-center
            align-items-center
            rounded-circle
            bg-black
          "
        >
          <p class="m-0 display-1">{{ this.$store.state.profileInitials }}</p>
        </div>
        <div class="">
          <p class="fs-1 fw-bold m-0 mt-2">
            {{ this.$store.state.profileName }}
          </p>
          <p
            v-if="this.$store.state.profileRole == 'designer'"
            class="fs-3 m-0 lh-1"
          >
            Designer
          </p>
          <p v-if="this.$store.state.profileRole == 'client'" class="fs-3">
            Client
          </p>
        </div>
      </div>
      <!-- Chats List -->
      <div class="col my-2 d-flex flex-column justify-content-center align-items-center">
        <!-- list chat content -->
          <div class="col w-100 list-chat-messages">
            <div class="py-2 px-4 border-bottom">
              <div class="d-flex flex-row align-items-center py-1">
                <!-- Back Button -->
                <router-link v-if="this.$store.state.profileRole == 'designer'" class="text-black" to="/homedesigner">
                  <p class="fs-4 m-0 p-0 lh-base bi bi-arrow-left-circle-fill me-3"></p>
                </router-link>
                <router-link v-if="this.$store.state.profileRole == 'client'" class="text-black" to="/homeclient">
                  <p class="fs-4 m-0 p-0 lh-base bi bi-arrow-left-circle-fill me-3"></p>
                </router-link>
                <p class="m-0 p-0 lh-base">All Messages</p>
              </div>
            </div>
            <div v-for="(chat, i) in chats" :key="i">
              <router-link
                v-if="this.$store.state.profileRole == 'designer'"
                :to="'/chatroom/' + chat.clientName + '/' + chat.docId"
                class="
                  list-group-item list-group-item-action
                  mt-2
                  border-start-0 border-end-0 border-top-0
                "
              >
                <div class="d-flex align-items-start">
                  <img
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Black&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                    class="rounded-circle mr-5"
                    alt="profile photo"
                    width="40"
                    height="40"
                  />
                  <div class="px-4 py-1">
                    <p class="fs-5">{{ chat.clientName }}</p>
                  </div>
                </div>
              </router-link>

              <router-link
                v-if="this.$store.state.profileRole == 'client'"
                :to="'/chatroom/' + chat.designerName + '/' + chat.docId"
                class="
                  list-group-item list-group-item-action
                  mt-2
                  border-start-0 border-end-0 border-top-0
                "
              >
                <div class="d-flex align-items-start">
                  <img
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Black&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                    class="rounded-circle mr-5"
                    alt="profile photo"
                    width="40"
                    height="40"
                  />
                  <div class="px-4 py-1">
                    <p class="fs-5">{{ chat.designerName }}</p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../../firebase/firebase-init";
export default {
  name: "Profile",
  data() {
    return {
      chats: [],
    };
  },
  methods: {
    async signOut() {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    },
  },
  created() {
    setTimeout(() => {
      if (this.$store.state.profileRole == "designer") {
        console.log("ini designer");
        db.collection("chats")
          .where("designerId", "==", firebase.auth().currentUser.uid)
          .get()
          .then((querysnapshot) => {
            querysnapshot.forEach((doc) => {
              this.chats.push({
                docId: doc.id,
                designerName: doc.data().designerName,
                clientName: doc.data().clientName,
              });
            });
          });
      }

      if (this.$store.state.profileRole == "client") {
        console.log("ini client");
        db.collection("chats")
          .where("clientId", "==", firebase.auth().currentUser.uid)
          .get()
          .then((querysnapshot) => {
            querysnapshot.forEach((doc) => {
              this.chats.push({
                docId: doc.id,
                designerName: doc.data().designerName,
                clientName: doc.data().clientName,
              });
            });
          });
      }
    }, 1000);
  },
};
</script>
<style scoped>
.profile-shape {
  height: 9em;
  width: 9em;
  color: #fff;
}

.btn-profile-option {
  width: 600px;
}

.list-chat-messages {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.back-home {
  position: absolute;
  top: 100px;
  left: 120px;
}
</style>