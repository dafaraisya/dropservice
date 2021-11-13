<template>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div v-for="(asset, idx) in assets" :key="asset" class="carousel-item" :class="{ active: idx==0 }">
                <div class="ratio ratio-16x9">
                    <embed :src="asset" class="d-block w-100 fit">
                </div>
            </div>
        </div>
        <button class="carousel-control-prev my-5" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next my-5" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        assets: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>
    .fit {
        object-fit: cover;
    }
</style>