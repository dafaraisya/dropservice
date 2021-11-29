<template>
  <div class="container vh-100">
    <div class="row h-100">
      <div
        class="
          col
          my-3
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
          h-100
          py-2
          d-flex
          flex-column
          justify-content-start
          align-items-center
        "
      >
        <!-- Back Button -->
        <div class="py-2 w-100 border-bottom">
          <div class="d-flex align-items-center py-1">
            <div v-if="this.$store.state.profileRole == 'designer'">
              <router-link to="/profiledesigner">
                <button class="border-0 bg-transparent">
                  <i class="bi bi-arrow-left h2 me-2"></i>
                </button>
              </router-link>
            </div>
            <div v-if="this.$store.state.profileRole == 'client'">
              <router-link to="/profileclient">
                <button class="border-0 bg-transparent">
                  <i class="bi bi-arrow-left h2 me-2"></i>
                </button>
              </router-link>
            </div>
            <strong class="m-0 p-0 lh-base align-middle">Notification</strong>
          </div>
        </div>

        <!-- Notification Container -->
        <div
          class="
            notif-container
            d-flex
            flex-column
            align-items-start
            w-100
            h-100
            py-3
            pe-2
          "
        >
          <div v-if="dataNotFound" class="mx-auto">Data Not Found</div>
          <div v-for="notification in notifications" :key="notification">
            <router-link
              :to="notification.link"
              style="text-decoration: none; color: inherit"
            >
              <div>
                <NotificationCard
                  :profileSrc="notification.profilePicture"
                  :profileName="notification.sender"
                  :message="notification.notificationText"
                />
              </div>
            </router-link>
          </div>

          <!-- <NotificationCard
            profileSrc="https://picsum.photos/600/400.jpg"
            profileName="Dafa Raisya"
            message="started following you"
          />
          <NotificationCard
            profileSrc="https://picsum.photos/600/400.jpg"
            profileName="Bakar Desain"
            message="replied to your message replied to your message"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationCard from "@/components/NotificationCard.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase/firebase-init";
export default {
  name: "Notification",
  components: { NotificationCard },
  data() {
    return {
      notifications: [],
      dataNotFound: null,
    };
  },
  methods: {
    getProfilePicture(userId, index) {
      db.collection("users")
        .doc(userId)
        .get()
        .then((snapshot) => {
          this.notifications[index].profilePicture =
            snapshot.data().profilePicture;
        });
    },
  },
  mounted() {
    db.collection("notifications")
      .where("to", "==", firebase.auth().currentUser.uid)
      .orderBy("time", "desc")
      .onSnapshot((snap) => {
        for (let i = 0; i < snap.docs.length; i++) {
          this.notifications[i] = snap.docs[i].data();
          this.getProfilePicture(snap.docs[i].data().senderId, i);
        }
        if (this.notifications.length == 0) {
          this.dataNotFound = true;
        }
      });
    // db.collection("notifications")
    //   .where("to", "==", firebase.auth().currentUser.uid)
    //   .get()
    //   .then((querysnapshot) => {
    //     querysnapshot.forEach((doc) => {
    //       this.notifications.push({
    //         docId: doc.id,
    //         notificationText: doc.data().notificationText,
    //         notificationType: doc.data().notificationType,
    //         sender: doc.data().sender,
    //         time: doc.data().time,
    //       });
    //     });
    //   });
  },
};
</script>

<style>
.profile-shape {
  height: 9em;
  width: 9em;
  color: #fff;
}
.profile-picture img {
  object-fit: cover;
}
.notif-container {
  overflow-y: scroll;
}
</style>