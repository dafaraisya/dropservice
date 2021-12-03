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
          <div style="color: black; font-size: 20px">Details Transaction</div>
          <div class="transaction-section">
            <button
              class="btn-transaction-section"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#clientDetails"
              aria-expanded="false"
              aria-controls="collapseExample"
              style="padding: 0; border: none; background: none"
            >
              <strong style="color: black">Client Details</strong>
              <i
                class="bi bi-arrow-right arrow-client-details"
                style="text-align: left"
              ></i>
            </button>
            <div
              class="collapse"
              id="clientDetails"
              style="text-align: left; padding-left: 10px; margin-top: 5px"
            >
              <div>{{ clientName }}<br /></div>
            </div>
          </div>
          <div class="transaction-section">
            <button
              class="btn-transaction-section"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#paymentMethod"
              aria-expanded="false"
              aria-controls="collapseExample"
              style="padding: 0; border: none; background: none"
            >
              <strong style="color: black">Payment Method</strong>
              <i
                class="bi bi-arrow-right arrow-payment-method"
                style="text-align: left"
              ></i>
            </button>
            <div
              class="collapse"
              id="paymentMethod"
              style="text-align: left; padding-left: 10px; margin-top: 5px"
            >
              <div>
                Bank Transfer<br />
                a/n {{ atasNamaRekening }}<br />
                no rek : {{ noRekening }}<br />
              </div>
            </div>
          </div>
          <div class="transaction-section">
            <button
              class="btn-transaction-section"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#total"
              aria-expanded="false"
              aria-controls="collapseExample"
              style="padding: 0; border: none; background: none"
            >
              <strong style="color: black">Total</strong>
              <i
                class="bi bi-arrow-right arrow-total"
                style="text-align: left"
              ></i>
            </button>
            <div
              class="collapse"
              id="total"
              style="text-align: left; padding-left: 10px; margin-top: 5px"
            >
              <div>Rp. {{ price }}<br /></div>
            </div>
          </div>
          <div class="transaction-section">
            <button
              class="btn-transaction-section"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#orderDetails"
              aria-expanded="false"
              aria-controls="collapseExample"
              style="padding: 0; border: none; background: none"
            >
              <strong style="color: black">Order Details</strong>
              <i
                class="bi bi-arrow-right arrow-order-details"
                style="text-align: left"
              ></i>
            </button>
            <div
              class="collapse"
              id="orderDetails"
              style="text-align: left; padding-left: 3px; margin-top: 5px"
            >
              <div>
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row">Category</th>
                      <td>{{ category }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Title Project</th>
                      <td>{{ portoTitle }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Description</th>
                      <td colspan="2">{{ description }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>
<script>
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
import db from "../../firebase/firebase-init";
export default {
  name: "Details Transaction",
  data() {
    return {
      description: "",
      photosOrVideos: "",
      category: "",
      portoTitle: "",
      price: "",
      provision: "",
      howToOrder: "",
      designerId: "",
      designerName: "",
      clientId: "",
      clientName: "",
      noRekening: "",
      atasNamaRekening: "",
    };
  },
  methods: {
    getNoRek() {
      db.collection("users")
        .doc(this.designerId)
        .get()
        .then((snapshot) => {
          this.noRekening = snapshot.data().noRekening;
          this.atasNamaRekening = snapshot.data().atasNamaRekening;
        });
    },
  },
  created() {
    db.collection("transactions")
      .doc(this.$route.params.docId)
      .get()
      .then((snapshot) => {
        this.description = snapshot.data().description;
        this.photosOrVideos = snapshot.data().photosOrVideos;
        this.category = snapshot.data().category;
        this.portoTitle = snapshot.data().portoTitle;
        this.price = snapshot.data().price;
        this.provision = snapshot.data().provision;
        this.howToOrder = snapshot.data().howToOrder;
        this.designerId = snapshot.data().designerId;
        this.designerName = snapshot.data().designerName;
        this.clientId = snapshot.data().clientId;
        this.clientName = snapshot.data().clientName;
        this.getNoRek();
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
.profile-picture img {
  object-fit: cover;
}
.initial-name {
  font-size: 100px;
  color: white;
}
.btn-profile-option {
  width: 600px;
}
.transaction-section {
  border-top: 8px solid #d6dabe;
  padding: 10px;
}
.btn-transaction-section {
  width: 600px;
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
.arrow-client-details {
  padding-left: 480px;
}
.arrow-payment-method {
  padding-left: 455px;
}
.arrow-total {
  padding-left: 545px;
}
.arrow-order-details {
  padding-left: 480px;
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
  .arrow-client-details {
    padding-left: 180px;
  }
  .arrow-payment-method {
    padding-left: 155px;
  }
  .arrow-total {
    padding-left: 245px;
  }
  .arrow-order-details {
    padding-left: 182px;
  }
}
</style>