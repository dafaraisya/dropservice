<template>
  <div class="container">
    <div v-if="loading">
      <Loading />
    </div>
    <div class="row">
      <div class="col logo-home">
        <img height="350" class="logo-img" src="../assets/logo.png" alt="" />
      </div>
      <div class="col">
        <form class="form-signup">
          <div class="mb-3 form">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="name" />
          </div>
          <div class="mb-3">
            <label for="dateOfBirth" class="form-label">Date of Birth</label>
            <input
              type="text"
              class="form-control"
              id="dateOfBirth"
              v-model="dateOfBirth"
            />
            <div id="dateOfBirth" class="form-text">Example : 22/01/1998.</div>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input
              type="text"
              class="form-control"
              id="address"
              v-model="address"
            />
          </div>
          <div class="mb-3">
            <label for="phoneNumber" class="form-label"
              >Phone Number (Optional)</label
            >
            <input
              type="text"
              class="form-control"
              id="phoneNumber"
              v-model="phoneNumber"
            />
          </div>
          <div class="mb-3">
            <label for="emailId" class="form-label">Email Id</label>
            <input
              type="email"
              class="form-control"
              id="emailId"
              v-model="emailId"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
            />
            <div id="password" class="form-text">Min. 8 character</div>
          </div>
          <div class="d-grid gap-2">
            <button
              @click.prevent="signUp()"
              class="btn btn-dark rounded-pill btn-signup fs-5"
              type="button"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase/firebase-init";
// import db from "../main.js";
import Loading from "../components/Loading.vue";

export default {
  name: "SignUp",
  components: {
    Loading,
  },
  data() {
    return {
      name: "",
      dateOfBirth: "",
      address: "",
      phoneNumber: "",
      emailId: "",
      password: "",
      loading: null,
    };
  },
  methods: {
    async signUp() {
      this.loading = true;
      if (
        this.name !== "" &&
        this.dateOfBirth !== "" &&
        this.address !== "" &&
        this.phoneNumber !== "" &&
        this.emailId !== "" &&
        this.password !== ""
      ) {
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.emailId,
          this.password
        );
        const result = await createUser;
        const dataBase = db.collection("users").doc(result.user.uid);
        await dataBase.set({
          name: this.name,
          dateOfBirth: this.dateOfBirth,
          address: this.address,
          phoneNumber: this.phoneNumber,
          emailId: this.emailId,
          profilePicture:
            "https://firebasestorage.googleapis.com/v0/b/dropservice-99b2d.appspot.com/o/profile-pictures%2Fprofile-image.png?alt=media&token=324902d5-3a67-4521-8ee0-2d6b3fce2d0a",
        });

        this.$router.push("/chooserole/" + result.user.uid);
        return;
      } else {
        console.log("error");
      }
    },
  },
};
</script>

<style scoped>
.logo-home {
  margin-top: 200px;
}
.form-label,
.form-text {
  display: flex;
  text-align: left;
}
input {
  outline: 0;
  border-width: 0 0 2px;
  border-color: grey;
}
input:focus {
  border-color: black;
}
.form-signup {
  margin-top: 100px;
}
.btn-signup {
  height: 60px;
}
</style>