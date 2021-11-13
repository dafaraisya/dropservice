<template>
  <div>
    <h1>{{ chats }}</h1>
    <tr v-for="chat in chats" :key="chat.sender">
      <td v-if="chat.sender == this.$store.state.profileRole" class="kanan">
        {{ chat.text }}
      </td>
      <td v-if="chat.sender != this.$store.state.profileRole" class="kiri">
        {{ chat.text }}
      </td>
    </tr>
    <label for="inputMessage" class="form-label">Input Message</label>
    <input
      type="text"
      id="inputMessage"
      class="form-control"
      aria-describedby="passwordHelpBlock"
      v-model="message"
    />
    <button @click.prevent="sendMessage" type="button" class="btn btn-primary">
      Primary
    </button>
  </div>
</template>
<script>
// import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../../firebase/firebase-init";
export default {
  data() {
    return {
      id: "3QOhAoqhPccIWO8K5vcV",
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
      db.collection("chats/" + this.id + "/messages")
        .doc()
        .set({
          sender: this.$store.state.profileRole,
          text: this.message,
          time: Date(),
          //   time: firebase.firestore.FieldValue.serverTimestamp,
        });
      this.message = "";
    },
  },
  //   mounted() {
  //     db.collection("chats/" + this.id + "/messages")
  //       .get()
  //       .then((subCollectionSnapshot) => {
  //         subCollectionSnapshot.forEach((subDoc) => {
  //           this.chats.push(subDoc.data());
  //         });
  //       });
  //   },
  mounted() {
    db.collection("chats/" + this.id + "/messages")
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
.kanan {
  color: red;
}
.kiri {
  color: green;
}
</style>