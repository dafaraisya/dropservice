<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
	<router-link to="/signin">
		<button type="button" class="btn btn-dark">Sign In</button>
	</router-link>
	<br>
	<router-link to="/signup">
		<button type="button" class="btn btn-light">Sign Up</button>
	</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
//   components: {
//     HelloWorld
//   }
}
</script>
