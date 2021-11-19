<template>
    <nav class="container pt-5 navbar navbar-light justify-content-between">
        <a class="navbar-brand" href="#"><img class="logo-img" src="../assets/logo.png" alt=""></a>
        
        <div class="container d-flex justify-content-center width">
            <div class="input-group align-items-center">
                <div class="input-group-prepend">
                    <span class="input-group-text icon ps-4">
                        <i class="bi bi-search"></i>
                    </span>
                </div> 
                <input type="search" placeholder="Search" aria-label="Search" class="form-control me-3">
                
                <!-- PROFIL PADA TAMPILAN MOBILE -->
                <div class="d-none mobile flex-row align-items-center">
                    <div class="role bg-black rounded-pill py-2 px-3 me-3 text-white">
                        {{ profileRole.toUpperCase() }}
                    </div>
                    <div id="circle" class="rounded-circle bg-black">
                        <div class="mt-1"></div>
                        <span class="initial-name mt-5">{{ this.$store.state.profileInitials }}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- PROFILE PADA TAMPILAN DESKTOP -->
        <div class="web d-flex flex-row align-items-center">
            <div class="role bg-black rounded-pill py-2 px-3 me-3 text-white">
                {{ profileRole.toUpperCase() }}
            </div>
			<div id="circle" class="rounded-circle bg-black">
				<router-link v-if="this.profileRole == 'designer'" to="/profiledesigner" style="text-decoration: none; color: inherit;">
					<div class="mt-1"></div>
					<span class="initial-name mt-5">{{ this.$store.state.profileInitials }}</span>
				</router-link>
				<router-link v-if="this.profileRole == 'client'" to="/profileclient" style="text-decoration: none; color: inherit;">
					<div class="mt-1"></div>
					<span class="initial-name mt-5">{{ this.$store.state.profileInitials }}</span>
				</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
	data() {
		return {
			profileRole: ''
		}
	},
	mounted() {
		setTimeout(() => {
			this.profileRole = this.$store.state.profileRole;
		}, 1000);
	},
}
</script>

<style>
    .logo-img {
        width: 50px;
    }
    
    .icon {
        height: 50px;
        border-top-left-radius: 32px !important;
        border-bottom-left-radius: 32px !important;
        background-color: #dddcd8;
        border: 0 !important;
    }

    .input-group-prepend {
        margin-right: -2px !important
    }

    .form-control:focus {
        color: #495057;
        background-color: #dddcd8;
        outline: 0;
        box-shadow: 0 0 0 0 !important;
    }

    .form-control {
        height: 50px;
        border: 0 !important;
        background-color: #dddcd8 !important;
        border-bottom-right-radius: 32px !important;
        border-top-right-radius: 32px !important;
        border-left: 0 !important
    }

    #circle {
        height: 40px;
        width: 40px;
    }

	.initial-name {
		font-size: 22px;
		color: white;
	}

    .width {
        width: 75%;
    }

    @media only screen and (max-width: 700px) {
        .navbar-brand, .role, .web {
            display: none !important;
        }

        .mobile {
            display: flex !important;
        }

        .width {
            width: 100% !important;
        }

    }

    @media only screen and (max-width: 1200px) {
        .width {
            width: 50%;
        }
    }
	

</style>