import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import "bootstrap-icons/font/bootstrap-icons.css"

let app;
firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		createApp(App).use(store).use(router).mount('#app')
	}
});
