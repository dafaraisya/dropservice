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
            <div style="color: black; font-size: 20px">
              Details Transaction
            </div>
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
                  class="bi bi-arrow-right"
                  style="text-align: left; padding-left: 480px"
                ></i>
              </button>
              <div
                class="collapse"
                id="clientDetails"
                style="text-align: left; padding-left: 10px; margin-top: 5px"
              >
                <div>
                  Regita<br />
                  081129394375982<br />
                  Regita@gmail.com<br />
                </div>
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
                  class="bi bi-arrow-right"
                  style="text-align: left; padding-left: 455px"
                ></i>
              </button>
              <div
                class="collapse"
                id="paymentMethod"
                style="text-align: left; padding-left: 10px; margin-top: 5px"
              >
                <div>
                  Bank Transfer<br />
                  a/n Ari setiawan<br />
                  no rek : 0912371239<br />
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
                  class="bi bi-arrow-right"
                  style="text-align: left; padding-left: 545px"
                ></i>
              </button>
              <div
                class="collapse"
                id="total"
                style="text-align: left; padding-left: 10px; margin-top: 5px"
              >
                <div>Rp. 500.000,00<br /></div>
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
                  class="bi bi-arrow-right"
                  style="text-align: left; padding-left: 480px"
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
                        <td>Web Design</td>
                      </tr>
                      <tr>
                        <th scope="row">Title Project</th>
                        <td>Web design e-commerce</td>
                      </tr>
                      <tr>
                        <th scope="row">Notes</th>
                        <td colspan="2">Deadline 20 september</td>
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
  </div>
</template>
<script>
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
export default {
  name: "Details Transaction",
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
  border-top: 8px solid #d6dabe;
  padding: 10px;
}
.btn-transaction-section {
  width: 600px;
}
</style>