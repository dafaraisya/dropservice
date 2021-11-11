<template>
  <div class="container">
    <div v-if="loading">
      <Loading />
    </div>
    <div class="row">
      <div class="col">
        <img height="350" class="logo-img" src="../assets/logo.png" alt="" />
      </div>
      <div class="col choose-role">
        <h2>Who are here?</h2>
        <div class="d-grid gap-2">
          <button
            @click.prevent="chooseDesigner"
            class="btn btn-dark rounded-pill mt-3 fs-4"
            type="button"
          >
            Designer
          </button>
          <button
            @click.prevent="chooseClient"
            class="btn btn-light rounded-pill mt-3 fs-4"
            type="button"
          >
            Client
          </button>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import "firebase/compat/auth";
import db from "../firebase/firebase-init";
import Loading from "../components/Loading.vue";
export default {
  name: "ChooseRole",
  components: {
    Loading,
  },
  data() {
    return {
      loading: null,
    };
  },
  methods: {
    async chooseDesigner() {
      this.loading = true;
      const dataBase = db.collection("users").doc(this.$route.params.uid);
      await dataBase.update({
        role: "designer",
      });
      this.$router.push("/homedesigner");
    },

    async chooseClient() {
      this.loading = true;
      const dataBase = db.collection("users").doc(this.$route.params.uid);
      await dataBase.update({
        role: "client",
      });
      this.$router.push("/homeclient");
    },
  },
  mounted() {
    if (localStorage.getItem("chooserole")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("chooserole");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("chooserole", "1");
      location.reload();
    }
  },
};
</script>

<style scoped>
.logo-img {
  margin-top: 200px;
}
.choose-role {
  margin-top: 250px;
}
.btn {
  height: 60px;
  width: 600px;
}
</style>
