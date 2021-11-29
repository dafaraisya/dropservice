<template>
  <div class="container vh-100">
    <div class="row h-100">
      <div
        class="
          col
          my-3
          d-flex
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
        class="col d-flex flex-column justify-content-center align-items-center"
      >
        <router-link to="/homedesigner" class="w-100 my-1">
          <input
            class="btn fs-5 border-bottom text-start w-100"
            value="Portofolio"
            type="button"
          />
        </router-link>
        <router-link to="/chats" class="w-100 my-1" v-if="unreadMessages == 0">
          <input
            class="btn fs-5 border-bottom text-start w-100"
            value="Chat"
            type="button"
          />
        </router-link>
        <router-link to="/chats" class="w-100 my-1" v-if="unreadMessages > 0">
          <input
            @click="updateUnreadMessages"
            class="btn fs-5 border-bottom text-start w-100"
            :value="'Chat' + ' (' + unreadMessages + ')'"
            type="button"
          />
        </router-link>
        <router-link
          to="/notification"
          class="w-100 my-1"
          v-if="unreadNotifications == 0"
        >
          <input
            class="btn fs-5 border-bottom text-start w-100"
            :value="'Notification'"
            type="button"
          />
        </router-link>
        <router-link
          to="/notification"
          class="w-100 my-1"
          v-if="unreadNotifications > 0"
        >
          <input
            @click="updateUnreadNotification"
            class="btn fs-5 border-bottom text-start w-100"
            :value="'Notification' + ' (' + unreadNotifications + ')'"
            type="button"
          />
        </router-link>
        <router-link to="/description-specialization" class="w-100 my-1">
          <input
            class="btn fs-5 border-bottom text-start w-100"
            value="Description & Specialization"
            type="button"
          />
        </router-link>
        <router-link
          :to="'/transactions/' + this.$store.state.profileId"
          class="w-100 my-1"
        >
          <input
            class="btn fs-5 border-bottom text-start w-100"
            value="Transaction History"
            type="button"
          />
        </router-link>
        <router-link to="/designer-cost" class="w-100 my-1">
          <input
            class="btn fs-5 border-bottom text-start w-100"
            value="Designer Cost"
            type="button"
          />
        </router-link>
        <router-link to="/last-seen" class="w-100 my-1">
          <input
            class="btn fs-5 border-bottom text-start w-100"
            value="Last Seen"
            type="button"
          />
        </router-link>
        <router-link
          :to="'/accountsettings/' + this.$store.state.profileId"
          class="w-100 my-1"
        >
          <input
            class="btn fs-5 border-bottom text-start w-100"
            value="Account Settings"
            type="button"
          />
        </router-link>
        <router-link to="/privacy-security" class="w-100 my-1">
          <input
            class="btn fs-5 border-bottom text-start w-100"
            value="Privacy and Security"
            type="button"
          />
        </router-link>
        <router-link to="/help" class="w-100 my-1">
          <input
            class="btn fs-5 border-bottom text-start w-100"
            value="Help"
            type="button"
          />
        </router-link>
        <router-link to="/profile" class="w-100 my-1">
          <input
            @click="signOut"
            class="btn fs-5 border-bottom text-start w-100"
            value="Sign Out"
            type="button"
          />
        </router-link>
      </div>
    </div>
  </div>
  <!-- <div class="profile vh-100">
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
        <div class="col list-option align-self-center">
          <div class="d-grid gap-2">
            <router-link to="/homedesigner">
              <input
                style="text-align: left; padding-left: 6px"
                class="btn fs-5 border-bottom text-start"
                value="Portofolio"
                type="button"
              />
            </router-link>
            <router-link to="/chats">
              <input
                style="text-align: left; padding-left: 6px"
                class="btn fs-5 border-bottom text-start"
                value="Chat"
                type="button"
              />
            </router-link>
            <router-link to="/description-specialization">
              <input
                style="text-align: left; padding-left: 6px"
                class="btn fs-5 border-bottom text-start"
                value="Description & Specialization"
                type="button"
              />
            </router-link>
            <router-link to="/designer-cost">
              <input
                style="text-align: left; padding-left: 6px"
                class="btn fs-5 border-bottom text-start"
                value="Designer Cost"
                type="button"
              />
            </router-link>
            <router-link to="/last-seen">
              <input
                style="text-align: left; padding-left: 6px"
                class="btn fs-5 border-bottom text-start"
                value="Last Seen"
                type="button"
              />
            </router-link>
            <router-link to="/account-settings">
              <input
                style="text-align: left; padding-left: 6px"
                class="btn fs-5 border-bottom text-start"
                value="Account Settings"
                type="button"
              />
            </router-link>
            <router-link to="/privacy-security">
              <input
                style="text-align: left; padding-left: 6px"
                class="btn fs-5 border-bottom text-start"
                value="Privacy and Security"
                type="button"
              />
            </router-link>
            <router-link to="/help">
              <input
                style="text-align: left; padding-left: 6px"
                class="btn fs-5 border-bottom text-start"
                value="Help"
                type="button"
              />
            </router-link>
            <router-link to="/profile">
              <input
                @click="signOut"
                style="text-align: left; padding-left: 6px"
                class="btn fs-5 border-bottom text-start"
                value="Sign Out"
                type="button"
              />
            </router-link>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div> -->
</template>
<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../../firebase/firebase-init";
export default {
  name: "Profile",
  data() {
    return {
      unreadMessages: null,
      unreadNotifications: null,
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
    updateUnreadMessages() {
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          unreadMessages: 0,
          unreadNotifications: this.unreadNotifications - this.unreadMessages,
        });
    },
    updateUnreadNotification() {
      db.collection("users").doc(firebase.auth().currentUser.uid).update({
        unreadNotifications: 0,
      });
    },
  },
  mounted() {
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        this.unreadMessages = snapshot.data().unreadMessages;
        this.unreadNotifications = snapshot.data().unreadNotifications;
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
</style>