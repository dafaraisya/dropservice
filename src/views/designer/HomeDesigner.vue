<template>
  <div class="vh-100">
    <div class="nav-bg bg-info">
      <Navbar />
    </div>
    <div class="container mw-75 mt-4">
      <p class="h2 text-start">Your Portofolio</p>
      <div class="row mt-3">
        <div class="col">
          <div class="card pt-4 pb-2">
            <div class="card-img card-img-top bg-info rounded"></div>
            <div class="card-body">
              <p class="card-title fw-bold">Object Design</p>
              <button type="button" class="btn btn-secondary mt-2">
                More Info
              </button>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card pt-4 pb-2">
            <div class="card-img card-img-top bg-info rounded"></div>
            <div class="card-body">
              <p class="card-title fw-bold">Object Design</p>
              <button type="button" class="btn btn-secondary mt-2">
                More Info
              </button>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card pt-4 pb-2">
            <div class="card-img card-img-top bg-info rounded"></div>
            <div class="card-body">
              <p class="card-title fw-bold">Object Design</p>
              <button type="button" class="btn btn-secondary mt-2">
                More Info
              </button>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card pt-4 pb-2">
            <div class="card-img card-img-top bg-info rounded"></div>
            <div class="card-body">
              <p class="card-title fw-bold">Object Design</p>
              <button type="button" class="btn btn-secondary mt-2">
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Home Designer",
  components: {
    Navbar,
  },
  mounted() {
    if (localStorage.getItem("reloadedhomedesigner")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloadedhomedesigner");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloadedhomedesigner", "1");
      location.reload();
    }
  },
};
</script>

<style>
.nav-bg {
  height: 40%;
}

.mw-75 {
  max-width: 75%;
}

.card-img {
  width: 120px;
  height: 120px;
  align-self: center;
}
</style>