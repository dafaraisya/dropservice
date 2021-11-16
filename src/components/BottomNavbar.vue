<template>
    <nav class="navbar navbar-light bg-color border-top navbar-expand d-md-none d-lg-none d-xl-none fixed-bottom">
            <ul class="navbar-nav nav-justified w-100 py-2">
                <li class="nav-item">
                    <router-link to="#">
                        <button class="h-100 border-0 m-0 p-0 bg-transparent">
                            <i class="bi bi-house-door h1"></i>
                        </button>
                    </router-link>      
                </li>
                <li class="nav-item">
                    <router-link to="#">
                        <button class="h-100 border-0 m-0 p-0 bg-transparent">
                            <i class="bi bi-receipt-cutoff h1"></i>
                        </button>
                    </router-link>      
                </li>
                <li class="nav-item">
                    <router-link to="#">
                        <button class="h-100 border-0 m-0 p-0 bg-transparent">
                            <i class="bi bi-bell h1"></i>
                        </button>
                    </router-link>      
                </li>
                <li class="nav-item">
                    <router-link to="#">
                        <button class="h-100 border-0 m-0 p-0 bg-transparent">
                            <i class="bi bi-person h1"></i>
                        </button>
                    </router-link>      
                </li>
            </ul>
        </nav>
</template>

<script>
export default {
    name: 'BottomNavbar'
}
</script>

<style>
    .bg-color {
        background: #DDDCD8;
    }
</style>