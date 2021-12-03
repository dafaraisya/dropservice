<template>
  <div class="container vh-100">
    <div class="row row-content">
      <div class="col align-self-start">
        <div class="back-home">
          <router-link
            v-if="this.$store.state.profileRole == 'designer'"
            to="/homedesigner"
          >
            <button style="padding: 0; border: none; background: none">
              <p class="h3 bi bi-arrow-left-circle-fill">
                <span class="ms-3">Back To Home</span>
              </p>
            </button>
          </router-link>
          <router-link
            v-if="this.$store.state.profileRole == 'client'"
            to="/homeclient"
          >
            <button style="padding: 0; border: none; background: none">
              <p class="h3 bi bi-arrow-left-circle-fill">
                <span class="ms-3">Back To Home</span>
              </p>
            </button>
          </router-link>
        </div>
      </div>
    </div>
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
        <div class="d-grid gap-2">
          <div style="color: black; font-size: 20px">
            All Transaction History
          </div>
          <div v-if="dataNotFound">Data Not Found</div>
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
      dataNotFound: null,
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
            if (this.transactions.length < 1) {
              this.dataNotFound = true;
            }
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
            if (this.transactions.length < 1) {
              this.dataNotFound = true;
            }
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
  /* padding: 10px; */
}
.btn-transaction-section {
  width: 600px;
}
.profile-picture img {
  object-fit: cover;
}
.back-home {
  position: absolute;
  top: 50px;
  left: 120px;
}
.profile-shape {
  height: 9em;
  width: 9em;
  color: #fff;
}
@media only screen and (max-width: 700px) {
  .back-home {
    position: absolute;
    left: 35px;
  }
  .row-content {
    margin-top: 100px;
  }
  .btn-transaction-section {
    width: 300px;
  }
}
</style>