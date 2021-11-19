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
        <div class="col list-option align-self-center">
          <div class="d-grid gap-2">
            <router-link to="/homedesigner">
              <input
                style="text-align: left; padding-left: 6px"
                class="btn btn-profile-option fs-4 border-bottom text-left"
                value="Portofolio"
                type="button"
              />
            </router-link>
            <router-link to="/chats">
              <input
                style="text-align: left; padding-left: 6px"
                class="btn btn-profile-option fs-4 border-bottom text-left"
                value="Chat"
                type="button"
              />
            </router-link>
            <router-link to="/description-specialization">
              <input
                style="text-align: left; padding-left: 6px"
                class="btn btn-profile-option fs-4 border-bottom text-left"
                value="Description & Specialization"
                type="button"
              />
            </router-link>
            <router-link to="/designer-cost">
              <input
                style="text-align: left; padding-left: 6px"
                class="btn btn-profile-option fs-4 border-bottom text-left"
                value="Designer Cost"
                type="button"
              />
            </router-link>
            <router-link to="/last-seen">
              <input
                style="text-align: left; padding-left: 6px"
                class="btn btn-profile-option fs-4 border-bottom text-left"
                value="Last Seen"
                type="button"
              />
            </router-link>
            <router-link to="/account-settings">
              <input
                style="text-align: left; padding-left: 6px"
                class="btn btn-profile-option fs-4 border-bottom text-left"
                value="Account Settings"
                type="button"
              />
            </router-link>
            <router-link to="/privacy-security">
              <input
                style="text-align: left; padding-left: 6px"
                class="btn btn-profile-option fs-4 border-bottom text-left"
                value="Privacy and Security"
                type="button"
              />
            </router-link>
            <router-link to="/help">
              <input
                style="text-align: left; padding-left: 6px"
                class="btn btn-profile-option fs-4 border-bottom text-left"
                value="Help"
                type="button"
              />
            </router-link>
            <router-link to="/profile">
              <input
                @click="signOut"
                style="text-align: left; padding-left: 6px"
                class="btn btn-profile-option fs-4 border-bottom text-left"
                value="Sign Out"
                type="button"
              />
            </router-link>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default {
  name: "Profile",
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
</style>