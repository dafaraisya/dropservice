<template>
  <div class="vh-100">
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
			<div style="color: black; font-size: 20px">All Transaction History</div>  
            <div class="transaction-section">
              <router-link :to="'/detailstransaction/' + 'vue7xpHE7d6cDwJdnKpd'">
                <button
                  class="btn-transaction-section"
                  type="button"
                  aria-expanded="false"
                  style="padding: 0; border: none; background: none; text-align: left"
                >
                  <strong style="color: black">Web Design E-Commerce</strong>
                  <p style="color: black">Client by Muhammad Dafa</p>
                </button>
              </router-link>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
export default {
  name: "All Transactions",
  methods: {},
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
.transaction-section {
  border-top: 2px solid black;
  padding: 10px;
}
.btn-transaction-section {
  width: 600px;
}
</style>