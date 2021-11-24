<template>
    <div class=" card-container w-100 d-flex justify-content-start align-items-center my-2">
        <!-- Profile Photo -->
        <div class="me-3">
            <div class="profile-img rounded-circle overflow-hidden">
                <img :src="profileSrc" alt="profile image" class="w-100 h-100">
            </div>
        </div>

        <!-- Message notification -->
        <div>
            <p class="fw-bold fs-6 m-0 text-start">{{ profileName }}&nbsp; 
            <span class="fw-light">{{ message }}.</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotificationCard',
    props: {
        profileSrc: String,
        profileName: String,
        message: String,
    }
}
</script>

<style>
    .card-container {
        height: fit-content !important;

    }
    .profile-img {
        width: 3em;
        height: 3em;
    }
</style>