<template>
    <nav class="container pt-5 navbar navbar-light justify-content-between">
        <a class="navbar-brand" href="#"><img class="logo-img" src="../assets/logo.png" alt=""></a>
        
        <div class="container d-flex justify-content-center w-50">
            <div class="input-group align-items-center">
                <div class="input-group-prepend">
                    <span class="input-group-text icon ps-4">
                        <i class="bi bi-search"></i>
                    </span>
                </div> 
                <input type="search" placeholder="Search" aria-label="Search" class="form-control">
            </div>
        </div>
        
        <div class="d-flex flex-row align-items-center">
            <div class="bg-black rounded-pill py-2 px-3 me-3 text-white">
                {{ profileRole.toUpperCase() }}
            </div>
            <div @click.prevent="signOut" id="circle" class="rounded-circle bg-black">
				<div class="mt-1"></div>
				<span class="initial-name mt-5">{{ this.$store.state.profileInitials }}</span>
            </div>
        </div>
    </nav>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
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
	methods: {
		async signOut() {
			await firebase.auth().signOut().then(() => {
				this.$router.push('/');
			})
		}
	}
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
        /* background-color: #fff; */
        border: 0 !important;
    }

    .input-group-prepend {
        margin-right: -2px !important
    }

    .form-control:focus {
        color: #495057;
        background-color: #e9ecef;
        outline: 0;
        box-shadow: 0 0 0 0 !important;
    }

    .form-control {
        height: 50px;
        border: 0 !important;
        background-color: #e9ecef !important;
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
	

</style>