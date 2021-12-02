<template>
  <nav class="container  pt-5 navbar navbar-light justify-content-between">
    <a class="navbar-brand d-md-flex d-none" href="#"
      ><img class="logo-img" src="../assets/logo.png" alt=""
    /></a>

    <div class="container d-flex justify-content-center width">
      <div class="input-group align-items-center">
        <div class="input-group-prepend">
          <span class="input-group-text icon ps-4">
            <i class="bi bi-search"></i>
          </span>
        </div>
        <input
          type="search"
          placeholder="Search"
          aria-label="Search"
          class="form-control me-3"
        />

        <!-- PROFIL PADA TAMPILAN MOBILE -->
        <div class="d-md-none d-flex flex-row align-items-center">
          <div id="circle" class="rounded-circle bg-black">
            <div class="profile-picture">
              <img
                :src="profilePicture"
                width="40"
                height="40"
                class="rounded-pill"
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PROFILE PADA TAMPILAN DESKTOP -->
    <div class="d-none d-md-flex flex-row align-items-center">
      <div class="role rounded-pill py-2 px-3 me-3 text-white" :class="isClient()">
        {{ profileRole }}
      </div>
      <div id="circle" class="rounded-circle bg-black">
        <router-link
          v-if="this.profileRole.toLowerCase() == 'designer'"
          to="/profiledesigner"
          style="text-decoration: none; color: inherit"
        >
          <div class="profile-picture">
            <span v-if="unreadNotifications > 0">{{
              unreadNotifications
            }}</span>
            <img
              :src="profilePicture"
              width="40"
              height="40"
              class="rounded-pill"
              alt="..."
            />
          </div>
        </router-link>
        <router-link
          v-if="this.profileRole.toLowerCase() == 'client'"
          to="/profileclient"
          style="text-decoration: none; color: inherit"
        >
          <div class="profile-picture">
            <span v-if="unreadNotifications > 0">{{
              unreadNotifications
            }}</span>
            <img
              :src="profilePicture"
              width="40"
              height="40"
              class="rounded-pill"
              alt="..."
            />
          </div>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase/firebase-init";
export default {
  name: "Navbar",
  data() {
    return {
      profileRole: "",
      profilePicture: "",
      unreadNotifications: 0,
    };
  },
  methods: {
    isClient() {
      if(this.profileRole.toLowerCase() == 'client') return 'bg-role-client px-4'
      else return 'bg-role-designer'
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.profileRole = this.$store.state.profileRole;
    // }, 500);
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        this.unreadNotifications = snapshot.data().unreadNotifications;
        this.profilePicture = snapshot.data().profilePicture;
        this.profileRole = snapshot.data().role;
        this.profileRole = this.profileRole[0].toUpperCase() + this.profileRole.substring(1);
      });
  },
};
</script>

<style>
.logo-img {
  width: 50px;
}

.icon {
  height: 50px;
  border-top-left-radius: 32px !important;
  border-bottom-left-radius: 32px !important;
  background-color: #dddcd8;
  border: 0 !important;
}

.input-group-prepend {
  margin-right: -2px !important;
}

.form-control:focus {
  color: #495057;
  background-color: #dddcd8;
  outline: 0;
  box-shadow: 0 0 0 0 !important;
}

.form-control {
  height: 50px;
  border: 0 !important;
  background-color: #dddcd8 !important;
  border-bottom-right-radius: 32px !important;
  border-top-right-radius: 32px !important;
  border-left: 0 !important;
}

#circle {
  height: 40px;
  width: 40px;
}

.initial-name {
  font-size: 22px;
  color: white;
}

.bg-role-client {
  background: #ea4335;
}

.bg-role-designer {
  background: blue;
}

.width {
  width: 75%;
}

.profile-picture img {
  object-fit: cover;
}

.profile-picture span {
  margin-left: 25px;
  margin-top: -5px;
  position: absolute;
  background-color: red;
  color: white;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
}

@media only screen and (max-width: 768px) {
  .width {
    width: 100% !important;
  }
}

@media only screen and (max-width: 1200px) {
  .width {
    width: 50%;
  }
}
</style>