<template>
  <div class="container">
    <div class="row">
      <div v-if="loading">
        <Loading />
      </div>
      <div class="col">
        <img height="350" class="logo-img" src="../assets/logo.png" alt="" />
      </div>
      <div class="col">
        <form class="form-signin">
          <div class="mb-3">
            <label for="emailId" class="form-label">Email Id</label>
            <input
              type="email"
              class="form-control"
              id="emailId"
              v-model="email"
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
          </div>
          <div class="d-grid gap-2">
            <button
              @click.prevent="signIn"
              class="btn btn-dark rounded-pill btn-signin fs-5"
              type="button"
            >
              Sign In
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
import Loading from "../components/Loading.vue";

export default {
  name: "SignIn",
  components: {
    Loading,
  },
  data() {
    return {
      email: "",
      password: "",
      loading: null,
      role: null,
    };
  },
  methods: {
    signIn() {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          db.collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((doc) => {
              this.role = doc.data().role;
              if (this.role === "designer") {
                console.log("ini designer");
                this.$router.push("/homedesigner");
              }

              if (this.role === "client") {
                console.log("ini client");
                this.$router.push("/homeclient");
              }
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    mounted() {
      if (localStorage.getItem("reloadedsignin")) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem("reloadedsignin");
      } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem("reloadedsignin", "1");
        location.reload();
      }
    },
  },
};
</script>

<style scoped>
.container {
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
.form-signin {
  margin-top: 70px;
}
.btn-signin{
	height: 60px;
}
</style>