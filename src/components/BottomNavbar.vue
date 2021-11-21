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
                    <router-link to="/chats">
                        <div class="chat-shape bg-black rounded-circle">
                            <button class="h-100 border-0 m-0 p-0 bg-transparent">
                                <i class="bi bi-chat h1"></i>
                            </button>
                        </div>
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
                    <router-link v-if="this.profileRole == 'designer'" to="/profiledesigner">
                        <button class="h-100 border-0 m-0 p-0 bg-transparent">
                            <i class="bi bi-person h1"></i>
                        </button>
                    </router-link>  
                    <router-link v-if="this.profileRole == 'client'" to="/profileclient">
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
    name: 'BottomNavbar',
    data() {
		return {
			profileRole: ''
		}
	},
	mounted() {
		setTimeout(() => {
			this.profileRole = this.$store.state.profileRole;
		}, 500);
	},
}
</script>

<style>
    .bg-color {
        background: #DDDCD8;
    }

    .chat-shape {
        position: fixed;
        margin: 0 .5em;
        width: 70px;
        height: 70px;
        bottom: 18px;
    }

    .bi-chat {
        color: #fff;
        font-size: 40px;
    }
</style>