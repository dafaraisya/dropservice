<template>
    <div class="card pt-4 pb-2">
        <div class="card-img card-img-top bg-info rounded"></div>
        <div class="card-body">
            <p class="card-title fw-bold">Object Design</p>
            <router-link to="/portofoliodetails/Object Design">
                <button type="button" class="btn btn-secondary mt-2">
                    More Info
            </button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        portoName: {
            type: String,
            required: true,
        },
        portoImg: {
            type: String,
        }
    }
}
</script>

<style>
    .card-img {
        width: 120px;
        height: 120px;
        align-self: center;
    }

    .btn-secondary {
        background: #DDDCD8 !important;
        background-color: #DDDCD8 !important;
    }
</style>