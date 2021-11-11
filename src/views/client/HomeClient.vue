<template>
	<div class="vh-100">
		<div class="nav-bg bg-info">
			<Navbar/>
		</div>
		<div class="container mw-75 mt-4">
			<p class="h2 mb-1 fw-bold text-start">Design For You</p>
			<p class="h5 text-start">Type of Design is Here for Your Idea!!</p>
			<div class="row mt-3">
				<div class="col">
					<div class="card h-100 pb-4 bg-secondary">
						<div class="card-body">
							<p class="card-title h3 text-white fw-bold">Web Design</p>
						</div>
						<div class="card-img card-img-top bg-info rounded"></div>
					</div>
				</div>
				<div class="col">
					<div class="card h-100 pb-4 bg-secondary">
						<div class="card-body">
							<p class="card-title h3 text-white fw-bold">Video Editing</p>
						</div>
						<div class="card-img card-img-top bg-info rounded"></div>
					</div>
				</div>
				<div class="col">
					<div class="card h-100 pb-4 bg-secondary">
						<div class="card-body">
							<p class="card-title h3 text-white fw-bold">Animation</p>
						</div>
						<div class="card-img card-img-top bg-info rounded"></div>
					</div>
				</div>
				<div class="col">
					<div class="card h-100 pb-4 bg-secondary">
						<div class="card-body">
							<p class="card-title h3 text-white fw-bold">App Development</p>
						</div>
						<div class="card-img card-img-top bg-info rounded"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
	name: 'Home Client',
	components: {
		Navbar,
	},
	mounted() {
		if (localStorage.getItem("reloadedhomeclient")) {
		// The page was just reloaded. Clear the value from local storage
		// so that it will reload the next time this page is visited.
		localStorage.removeItem("reloadedhomeclient");
		} else {
		// Set a flag so that we know not to reload the page twice.
		localStorage.setItem("reloadedhomeclient", "1");
		location.reload();
		}
	},
}
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