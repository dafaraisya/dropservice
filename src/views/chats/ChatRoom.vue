<template>
  <div class="container vh-100">
    <div class="row h-100">
      <div
        class="
          col
          d-none d-lg-flex
          flex-column
          justify-content-center
          align-items-center
        "
      >
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
          <div class="profile-picture">
            <img
              :src="this.$store.state.profilePicture"
              width="150"
              height="150"
              class="rounded-pill"
              alt="..."
            />
          </div>
          <!-- <p class="m-0 display-1">{{ this.$store.state.profileInitials }}</p> -->
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
      <div
        class="
          col
          d-flex
          flex-column
          justify-content-center
          align-items-center
          vh-100
          border-start
        "
      >
        <!-- upper profile -->
        <div class="py-2 px-4 w-100 border-bottom d-lg-block">
          <div class="d-flex align-items-center py-1">
            <router-link to="/chats">
              <button class="border-0 bg-transparent">
                <i class="bi bi-arrow-left h2 me-2"></i>
              </button>
            </router-link>
            <strong class="m-0 p-0 lh-base align-middle">{{
              this.$route.params.chatname
            }}</strong>
          </div>
        </div>
        <!-- chat content -->
        <div class="position-relative chat-messages p-4 h-100 w-100">
          <div v-for="chat in chats" :key="chat">
            <div
              v-if="chat.sender == this.$store.state.profileRole"
              class="chat-message-right text-start"
            >
              <div class="py-2 px-3 mr-3">
                {{ chat.text }}
              </div>
            </div>
            <div
              v-if="chat.sender != this.$store.state.profileRole"
              class="chat-message-left text-start"
            >
              <div class="py-2 px-3 ml-3">
                {{ chat.text }}
              </div>
            </div>
          </div>
        </div>
        <!-- input message -->
        <form class="row g-3 py-3 w-100 align-items-center mb-2">
          <div class="col">
            <input
              type="text"
              class="form-control shadow-none border-0 text-white py-2"
              placeholder=" Type your message"
              v-model="message"
            />
          </div>
          <div class="col-auto">
            <button
              @click.prevent="sendMessage"
              type="submit"
              class="btn btn-dark"
            >
              Send
            </button>
          </div>
        </form>
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
      chat: {
        sender: null,
        text: null,
      },
      message: null,
      sender: null,
    };
  },
  methods: {
    sendMessage() {
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
      db.collection("chats/" + this.$route.params.docId + "/messages")
        .doc()
        .set({
          sender: this.$store.state.profileRole,
          text: this.message,
          time: dateTime,
        })
        .then(() => {
          this.sendNotification(dateTime);
        });
      this.message = "";
    },
    sendNotification(dateTime) {
      if (this.$store.state.profileRole == "designer") {
        db.collection("notifications").doc().set({
          to: this.$route.params.receiverId,
          sender: this.$store.state.profileName,
          senderId: this.$store.state.profileId,
          notificationType: "message",
          notificationText: "replied your messages",
          time: dateTime,
          link: this.$route.fullPath,
        });

        db.collection("users")
          .doc(this.$route.params.receiverId)
          .update({
            unreadMessages: firebase.firestore.FieldValue.increment(1),
            unreadNotifications: firebase.firestore.FieldValue.increment(1),
          });
      }

      if (this.$store.state.profileRole == "client") {
        db.collection("notifications").doc().set({
          to: this.$route.params.receiverId,
          sender: this.$store.state.profileName,
          senderId: this.$store.state.profileId,
          notificationType: "message",
          notificationText: "replied your messages",
          time: dateTime,
          link: this.$route.fullPath,
        });

        db.collection("users")
          .doc(this.$route.params.receiverId)
          .update({
            unreadMessages: firebase.firestore.FieldValue.increment(1),
            unreadNotifications: firebase.firestore.FieldValue.increment(1),
          });
      }
    },
  },
  mounted() {
    db.collection("chats/" + this.$route.params.docId + "/messages")
      .orderBy("time", "asc")
      .onSnapshot((snap) => {
        console.log(snap.docs.length);
        for (let i = 0; i < snap.docs.length; i++) {
          this.chats[i] = snap.docs[i].data();
        }
      });
  },
};
</script>
<style scoped>
.profile-shape {
  height: 9em;
  width: 9em;
  color: #fff;
}

.profile-picture img {
  object-fit: cover;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.chat-message-left {
  width: fit-content;
  max-width: 70%;
  margin-right: auto;
  margin-bottom: 10px;
  background-color: #737373;
  color: white;
  border-radius: 15px;
}

.chat-message-right {
  width: fit-content;
  max-width: 70%;
  flex-direction: row-reverse;
  margin-left: auto;
  margin-bottom: 10px;
  background-color: #373636;
  color: white;
  border-radius: 15px;
}

.form-control {
  background-color: #737373 !important;
  border-radius: 12px !important;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
</style>