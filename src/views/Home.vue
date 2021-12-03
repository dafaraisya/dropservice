<template>
  <div class="home vh-100">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div v-if="splashScreen" class="container logo-home h-100">
      <div
        class="row align-self-center h-100"
        :class="isMobile() ? 'row-cols-1' : ''"
      >
        <div class="col align-self-center splashScreenImg">
          <img class="logo-img" src="../assets/logo.png" alt="" />
        </div>
        <div
          class="col signin-signup"
          :class="isMobile() ? '' : 'align-self-center'"
        >
          <div class="d-grid gap-2 splashScreen">
            <p style="font-size: 40px;">dropservice</p>
          </div>
          <br />
        </div>
      </div>
    </div>
    <div v-else class="container logo-home h-100">
      <div
        class="row align-self-center h-100"
        :class="isMobile() ? 'row-cols-1' : ''"
      >
        <div class="col align-self-center">
          <img class="logo-img" src="../assets/logo.png" alt="" />
        </div>
        <div
          class="col signin-signup"
          :class="isMobile() ? '' : 'align-self-center'"
        >
          <div class="d-grid gap-2">
            <router-link to="/signin">
              <button
                class="w-75 btn btn-dark rounded-pill btn-home fs-3"
                type="button"
              >
                Sign In
              </button>
            </router-link>
            <router-link to="/signup">
              <button
                class="
                  w-75
                  btn btn-light
                  shadow
                  rounded-pill
                  btn-home
                  mt-3
                  fs-3
                "
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
  data() {
    return {
      windowWidth: 0,
      splashScreen: true,
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    isMobile() {
      if (this.windowWidth <= 900) return true;
      else return false;
    },
  },
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
    setTimeout(() => {
      this.splashScreen = false;
    }, 4000);
  },
};
</script>

<style scoped>
.btn-home {
  height: 60px;
  width: 600px;
}

.logo-img {
  width: 60%;
}
@keyframes splashScreenImg {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
}
@keyframes splashScreen {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes signinSignup {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.splashScreenImg {
  opacity: 1;
  animation-name: splashScreenImg;
  animation-duration: 4s;
}
.splashScreen {
  opacity: 0;
  animation-name: splashScreen;
  animation-duration: 4s;
}
.signin-signup {
  opacity: 1;
  animation-name: signinSignup;
  animation-duration: 2s;
}
</style>
