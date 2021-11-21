<template>
  <div class="profile vh-100">
    <div class="container h-100">
      <div class="row align-self-center h-100">
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
        <div class="col-12 col-lg-7 col-xl-6">
          <!-- upper profile -->
          <div class="py-2 px-4 border-bottom d-none d-lg-block">
            <div class="d-flex align-items-center py-1">
              <div>
                <router-link to="/chats">
                  <button class="border-0 bg-transparent">
                    <i class="bi bi-arrow-left h1"></i>
                  </button>
                </router-link>
              </div>
              <div>
                <strong>{{ this.$route.params.chatname }}</strong>
              </div>
            </div>
          </div>
          <!-- chat content -->
          <div class="position-relative chat-messages p-4">
            <div v-for="chat in chats" :key="chat">
              <div
                v-if="chat.sender == this.$store.state.profileRole"
                class="chat-message-right"
              >
                <div class="flex-shrink-1 py-2 px-3 mr-3">
                  {{ chat.text }}
                </div>
              </div>
              <div
                v-if="chat.sender != this.$store.state.profileRole"
                class="chat-message-left"
              >
                <div class="flex-shrink-1 py-2 px-3 ml-3">
                  {{ chat.text }}
                </div>
              </div>
            </div>

            <!-- <div class="chat-message-right mb-4">
                <div class="flex-shrink-1 rounded py-2 px-3 mr-3">
                  Cum ea graeci tractatos.
                </div>
              </div>

              <div class="chat-message-left pb-4">
                <div class="flex-shrink-1 rounded py-2 px-3 ml-3">
                  Sed pulvinar, massa vitae interdum pulvinar, risus lectus
                  porttitor magna, vitae commodo lectus mauris et velit. Proin
                  ultricies placerat imperdiet. Morbi varius quam ac venenatis
                  tempus.
                </div>
              </div>

              <div class="chat-message-left pb-4">
                <div class="flex-shrink-1 rounded py-2 px-3 ml-3">
                  Cras pulvinar, sapien id vehicula aliquet, diam velit
                  elementum orci.
                </div>
              </div>

              <div class="chat-message-left pb-4">
                <div class="flex-shrink-1 rounded py-2 px-3 ml-3">
                  Cras pulvinar, sapien id vehicula aliquet, diam velit
                  elementum orci.
                </div>
              </div> -->
          </div>
          <!-- input message -->
          <form class="row g-3 py-3">
            <div class="col">
              <input
                type="text"
                class="form-control-plaintext"
                placeholder=" Type your message"
                v-model="message"
              />
            </div>
            <div class="col-auto">
              <button
                @click.prevent="sendMessage"
                type="submit"
                class="btn btn-dark mb-3"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
        });
      this.message = "";
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

.chat-messages {
  display: flex;
  flex-direction: column;
  height: 550px;
  overflow-y: scroll;
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
  width: 300px;
  border-radius: 20px 20px 20px 0px;
}

.chat-message-right {
  flex-direction: row-reverse;
  margin-left: auto;
  margin-bottom: 10px;
  background-color: #373636;
  color: white;
  width: 300px;
  border-radius: 20px 20px 0px 20px;
}

.form-control {
  background: transparent !important;
  border-radius: 0 !important;
  height: 100% !important;
}

input {
  border: 2px solid black;
}
</style>