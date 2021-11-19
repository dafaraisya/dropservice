<template>
  <div class="profile vh-100">
    <div class="container h-100">
      <div class="back-home">
        <router-link
          v-if="this.$store.state.profileRole == 'designer'"
          to="/homedesigner"
        >
          <button style="padding: 0; border: none; background: none">
            <p class="h3 bi bi-arrow-left-circle-fill"> Back To Home</p>
          </button>
        </router-link>
        <router-link
          v-if="this.$store.state.profileRole == 'client'"
          to="/homeclient"
        >
          <button style="padding: 0; border: none; background: none">
            <p class="h3 bi bi-arrow-left-circle-fill"> Back To Home</p>
          </button>
        </router-link>
      </div>
      <div class="row h-100">
        <div class="col align-self-center">
          <div class="row">
            <div id="circle" class="rounded-circle bg-black">
              <span class="initial-name mt-5">
                <p class="initial-name">
                  {{ this.$store.state.profileInitials }}
                </p>
              </span>
            </div>
            <div id="profile-name">
              <p class="fs-1 fw-bold">{{ this.$store.state.profileName }}</p>
              <p
                v-if="this.$store.state.profileRole == 'designer'"
                class="fs-3 bold"
              >
                Designer
              </p>
              <p
                v-if="this.$store.state.profileRole == 'client'"
                class="fs-3 bold"
              >
                Client
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-7 col-xl-6" style="margin-top: 100px">
          <!-- list chat content -->
          <div class="col-12 col-lg-5 col-xl-12 list-chat-messages">
            <div class="py-2 px-4 border-bottom d-none d-lg-block">
              <div class="d-flex align-items-center py-1">
                <div class="flex-grow-1">
                  <strong>All Messages</strong>
                </div>
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
#circle {
  height: 150px;
  width: 150px;
}
#profile-name {
  width: 300px;
}
.initial-name {
  font-size: 100px;
  color: white;
}
.btn-profile-option {
  width: 600px;
}

.list-chat-messages {
  display: flex;
  flex-direction: column;
  height: 550px;
  overflow-y: scroll;
  border-left: 1px solid grey;
}

.chat-message-left,
.chat-message-right {
  display: flex;
  flex-shrink: 0;
}

.chat-message-left {
  margin-right: auto;
  margin-bottom: 10px;
  background-color: #737373;
  color: white;
  border-radius: 20px 20px;
}

.chat-message-right {
  flex-direction: row-reverse;
  margin-left: auto;
  margin-bottom: 10px;
  background-color: #373636;
  color: white;
  border-radius: 20px 20px;
}
.back-home {
  position: absolute;
  top: 100px;
  left: 120px;
}
</style>