<template>
  <div class="home vh-100">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="container logo-home h-100">
      <div class="row align-self-center h-100">
        <div class="col align-self-center">
          <img height="350" class="logo-img" src="../assets/logo.png" alt="" />
        </div>
        <div class="col signin-signup align-self-center">
          <div class="d-grid gap-2">
            <router-link to="/signin">
              <button
                class="btn btn-dark rounded-pill btn-home fs-3"
                type="button"
              >
                Sign In
              </button>
            </router-link>
            <router-link to="/signup">
              <button
                class="btn btn-light shadow rounded-pill btn-home mt-3 fs-3"
                type="button"
              >
                Sign Up
              </button>
            </router-link>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    if (localStorage.getItem("reloadedhome")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloadedhome");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloadedhome", "1");
      location.reload();
    }
  },
};
</script>

<style scoped>
.btn-home {
  height: 60px;
  width: 600px;
}
</style>
