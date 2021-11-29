<template>
  <div class="vh-100">
    <div class="container h-100">
      <div class="row align-self-center h-100">
        <div class="col align-self-center">
          <div class="row">
            <div id="circle" class="rounded-circle bg-black">
              <div class="profile-picture">
                <img
                  :src="this.$store.state.profilePicture"
                  width="150"
                  height="150"
                  class="rounded-pill"
                  alt="..."
                />
              </div>
              <!-- <span class="initial-name mt-5">
                <p class="initial-name">
                  {{ this.$store.state.profileInitials }}
                </p>
              </span> -->
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
            <div style="color: black; font-size: 20px">
              All Transaction History
            </div>
            <div v-for="transaction in transactions" :key="transaction">
              <div class="transaction-section">
                <router-link :to="'/detailstransaction/' + transaction.docId">
                  <button
                    class="btn-transaction-section"
                    type="button"
                    aria-expanded="false"
                    style="
                      padding: 0;
                      border: none;
                      background: none;
                      text-align: left;
                    "
                  >
                    <strong style="color: black">{{
                      transaction.portoTitle
                    }}</strong>
                    <p
                      v-if="this.$store.state.profileRole == 'designer'"
                      style="color: black"
                    >
                      Client by {{ transaction.clientName }}
                    </p>
                    <p
                      v-if="this.$store.state.profileRole == 'client'"
                      style="color: black"
                    >
                      Designer by {{ transaction.designerName }}
                    </p>
                  </button>
                </router-link>
              </div>
            </div>
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
import db from "../../firebase/firebase-init";
export default {
  name: "All Transactions",
  data() {
    return {
      transactions: [],
    };
  },
  created() {
    setTimeout(() => {
      if (this.$store.state.profileRole == "designer") {
        db.collection("transactions")
          .where("designerId", "==", firebase.auth().currentUser.uid)
          .get()
          .then((querysnapshot) => {
            querysnapshot.forEach((doc) => {
              this.transactions.push({
                docId: doc.id,
                portoTitle: doc.data().portoTitle,
                clientName: doc.data().clientName,
              });
            });
          });
      }

      if (this.$store.state.profileRole == "client") {
        db.collection("transactions")
          .where("clientId", "==", firebase.auth().currentUser.uid)
          .get()
          .then((querysnapshot) => {
            querysnapshot.forEach((doc) => {
              this.transactions.push({
                docId: doc.id,
                portoTitle: doc.data().portoTitle,
                designerName: doc.data().designerName,
              });
            });
          });
      }
    }, 500);
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
.transaction-section {
  border-top: 2px solid black;
  padding: 10px;
}
.btn-transaction-section {
  width: 600px;
}
.profile-picture img {
  object-fit: cover;
}
</style>