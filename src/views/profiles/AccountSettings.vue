<template>
  <div class="container">
    <div class="row">
      <div v-if="loading">
        <Loading />
      </div>
      <div class="col align-self-start">
        <div class="back-home">
          <router-link
            v-if="this.$store.state.profileRole == 'designer'"
            to="/homedesigner"
          >
            <button style="padding: 0; border: none; background: none">
              <p class="h3 bi bi-arrow-left-circle-fill"><span class="ms-3">Back To Home</span></p>
            </button>
          </router-link>
          <router-link
            v-if="this.$store.state.profileRole == 'client'"
            to="/homeclient"
          >
            <button style="padding: 0; border: none; background: none">
              <p class="h3 bi bi-arrow-left-circle-fill"><span class="ms-3">Back To Home</span></p>
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col mx-4" style="margin-top: 120px">
        <div class="profile-picture">
          <img
            :src="profilePicture"
            class="rounded-pill"
            alt="..."
          />
          <br />
          <label class="custom-file-upload mt-3">
            <input @change="uploadProfilePicture" type="file" />
            Change Profile Photo
          </label>
        </div>
        <div style="text-align: left">
          <label for="exampleFormControlInput1" class="form-label">Name</label>
          <input
            class="form-control mb-4"
            type="text"
            placeholder="Default input"
            aria-label="default input example"
            v-model="name"
          />
          <label for="exampleFormControlInput1" class="form-label"
            >Phone Number</label
          >
          <input
            class="form-control mb-4"
            type="text"
            placeholder="Default input"
            aria-label="default input example"
            v-model="phoneNumber"
          />
          <label for="exampleFormControlInput1" class="form-label"
            >Address</label
          >
          <input
            class="form-control mb-4"
            type="text"
            placeholder="Default input"
            aria-label="default input example"
            v-model="address"
          />
          <label for="exampleFormControlInput1" class="form-label"
            >Date of Birth</label
          >
          <input
            class="form-control mb-4"
            type="text"
            placeholder="Default input"
            aria-label="default input example"
            v-model="dateOfBirth"
          />
          <div v-if="role == 'designer'">
            <label for="exampleFormControlInput1" class="form-label"
              >No. Rekening Bank (Untuk keperluan transfer client)</label
            >
            <input
              class="form-control mb-4"
              type="text"
              placeholder="Default input"
              aria-label="default input example"
              v-model="noRekening"
            />
            <label for="exampleFormControlInput1" class="form-label"
              >Atas Nama Rekening Bank</label
            >
            <input
              class="form-control mb-4"
              type="text"
              placeholder="Default input"
              aria-label="default input example"
              v-model="atasNamaRekening"
            />
          </div>
        </div>
        <div class="d-grid gap-2">
          <button
            @click.prevent="updateProfile"
            class="btn btn-dark rounded-pill btn-signin fs-5 mt-3 mb-5"
            type="button"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import db from "../../firebase/firebase-init";
import Loading from "../../components/Loading.vue";

export default {
  name: "Account Settings",
  components: { Loading },
  data() {
    return {
      loading: null,
      name: "",
      address: "",
      dateOfBirth: "",
      phoneNumber: "",
      role: "",
      noRek: "",
      atasNama: "",
      profilePicture: null,
    };
  },
  methods: {
    async uploadProfilePicture(e) {
      this.loading = true;
      let file = e.target.files[0];
      var storageRef = firebase.storage().ref("profile-pictures/" + file.name);
      let uploadTask = storageRef.put(file);
      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.profilePicture = downloadURL;
          this.loading = false;
          console.log(downloadURL);
        });
      });
    },
    async updateProfile() {
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          name: this.name,
          address: this.address,
          dateOfBirth: this.dateOfBirth,
          phoneNumber: this.phoneNumber,
          profilePicture: this.profilePicture,
          noRekening: this.role == "designer" ? this.noRekening : "",
          atasNamaRekening:
            this.role == "designer" ? this.atasNamaRekening : "",
        })
        .then(() => {
          if (this.$store.state.profileRole == "designer") {
            this.$router.push("/homedesigner");
          }

          if (this.$store.state.profileRole == "client") {
            this.$router.push("/homeclient");
          }
        });
    },
  },
  created() {
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        this.name = snapshot.data().name;
        this.address = snapshot.data().address;
        this.dateOfBirth = snapshot.data().dateOfBirth;
        this.phoneNumber = snapshot.data().phoneNumber;
        this.profilePicture = snapshot.data().profilePicture;
        this.role = snapshot.data().role;
        this.noRekening = snapshot.data().noRekening;
        this.atasNamaRekening = snapshot.data().atasNamaRekening;
      });
  },
};
</script>
<style scoped>
.back-home {
  position: absolute;
  top: 50px;
  left: 120px;
}
.form-control {
  border-radius: 0 !important;
}
.profile-picture img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
input[type="file"] {
  display: none;
}

.custom-file-upload {
  border: 1px solid #ccc;
  border-radius: 20px;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
@media only screen and (max-width: 700px) {
  .back-home {
    position: absolute;
	left: 35px;
  }
}
</style>