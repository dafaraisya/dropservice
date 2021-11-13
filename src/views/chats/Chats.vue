<template>
  <div>
    <!-- <div id="list-example" class="list-group">
      <a class="list-group-item list-group-item-action" href="#list-item-1"
        >Item 1</a
      >
      <a class="list-group-item list-group-item-action" href="#list-item-2"
        >Item 2</a
      >
      <a class="list-group-item list-group-item-action" href="#list-item-3"
        >Item 3</a
      >
      <a class="list-group-item list-group-item-action" href="#list-item-4"
        >Item 4</a
      >
    </div>
    <div
      data-bs-spy="scroll"
      data-bs-target="#list-example"
      data-bs-offset="0"
      class="scrollspy-example"
      tabindex="0"
    >
      <h4 id="list-item-1">Item 1</h4>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat recusandae voluptas repellat vero architecto iusto nam ipsum culpa facilis eligendi. Nemo magni voluptatum recusandae ad nulla cupiditate doloribus nostrum odio?</p>
      <h4 id="list-item-2">Item 2</h4>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, culpa distinctio. Temporibus ducimus labore corrupti alias, eos rerum eius itaque architecto dignissimos sit provident rem voluptates ratione eveniet officia minima.</p>
      <h4 id="list-item-3">Item 3</h4>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex qui error odit, molestias odio vel doloribus nisi, voluptatum rerum sunt cupiditate numquam animi, distinctio quae illo porro consequuntur enim deleniti!</p>
      <h4 id="list-item-4">Item 4</h4>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet officia magni quibusdam saepe cupiditate nemo. Molestiae, id quae quisquam est eaque iste, voluptatibus enim molestias ex similique, alias saepe at!</p>
    </div> -->
    <h1>Chats</h1>
    <h1>{{ chats }}</h1>
    <tr v-for="chat in chats" :key="chat.designerName">
      <td>
        <button @click="cek(chat.docId)">{{ chat.clientName }}</button>
      </td>
    </tr>
  </div>
  <!-- <div>{{ users.key }}</div> -->
</template>
<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../../firebase/firebase-init";
export default {
  data() {
    return {
      chats: [],
      chat: {
        docId: null,
        designerName: null,
        clientName: null,
      },
    };
  },
  methods: {
    cek(docId) {
      console.log(docId);
    },
  },
  //   async beforeMount() {
  //     await this.getData();
  //   },
  //   methods: {
  //     getData() {
  //       return Promise((resolve, reject) => {
  //         db.collection("chats")
  //           .where("designerId", "==", this.$store.state.profileId)
  //           .get()
  //           .then((querySnapshot) => {
  //             querySnapshot.forEach((doc) => {
  //               this.clientId = doc.id;
  //               console.log(doc.id);
  //             });
  //             resolve();
  //           })
  //           .catch((error) => {
  //             console.log("Error getting documents: ", error);
  // 			reject();
  //           });
  //         // database
  //         //   .ref("/courses/" + firebase.auth().currentUser.displayName)
  //         //   .child("/courses")
  //         //   .on("value", (snapshot) => {
  //         //     this.datas = [];
  //         //     const data = snapshot.val();
  //         //     const keys = Object.keys(data);

  //         //     for (var i = 0; i < keys.length; i++) {
  //         //       const id = keys[i];
  //         //       const course = data[id];
  //         //       this.datas.push({ id, course });
  //         //     }

  //         //     resolve();
  //         //   });
  //       });
  //       //   return db.collection("chats")
  //       //     .where("designerId", "==", this.$store.state.profileId)
  //       //     .get()
  //       //     .then((querySnapshot) => {
  //       //       querySnapshot.forEach((doc) => {
  //       //         this.clientId = doc.id;
  //       //         console.log(doc.id);
  //       //       });
  //       //     })
  //       //     .catch((error) => {
  //       //       console.log("Error getting documents: ", error);
  //       //     });
  //     },
  //   },
  created() {
    db.collection("chats")
      .where("designerId", "==", firebase.auth().currentUser.uid)
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          //   console.log(doc.id);
          this.chats.push({
            docId: doc.id,
            designerName: doc.data().designerName,
            clientName: doc.data().clientName,
          });
          //   this.chat.docId(doc.id);
        });
      });
    // db.collection("chats")
    //   .where("designerId", "==", this.$store.state.profileId)
    //   .get()
    //   .then((querysnapshot) => {
    // 	console.log(querysnapshot);
    //     // console.log("ada");
    //   });
    //   .then(function (querysnapshot) {
    //     querysnapshot.forEach(function (doc) {
    //       console.log(doc.id, "=>", doc.data().clientId);
    //     });
    //   });
    // db.collection("chats").onSnapshot((snapshotChange) => {
    //   this.Users = [];
    //   snapshotChange.forEach((doc) => {
    //     this.Users.push({
    //       key: doc.id,
    //     });
    //   });
    // });
  },
};
</script>