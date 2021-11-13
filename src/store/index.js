import { createStore } from 'vuex';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase/firebase-init"
// import db from "../main.js";

// export default createStore({
// 	state: {
// 	},
// 	mutations: {
// 	},
// 	actions: {	
// 	},
// 	modules: {
// 	}
// })

export default createStore({
	state: {
		user: null,
		profileAddress: null,
		profileDateOfBirth: null,
		profileEmail: null,
		profileName: null,
		profileNumber: null,
		profileRole: null,
		profilePortofolio: null,
		profileId: null,
		profileInitials: null
	},
	mutations: {
		updateUser(state, payload) {
			state.user = payload;
		},
		setProfileInfo(state, doc) {
			state.profileAddress = doc.data().address,
			state.profileDateOfBirth = doc.data().dateOfBirth,
			state.profileEmail = doc.data().emailId,
			state.profileName = doc.data().name,
			state.profileNumber = doc.data().phoneNumber,
			state.profileRole = doc.data().role,
			state.profilePortofolio = doc.data().portofolio,
			state.profileId = doc.id;
		},
		setProfileInitials(state) {
			state.profileInitials = state.profileName.charAt(0);
		}
	},
	actions: {
		async getCurrentUser({ commit }) {
			const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
			const dbResults = await dataBase.get();
			commit("setProfileInfo", dbResults);
			commit("setProfileInitials");
			console.log(dbResults);
		}
	},
	modules: {
	}
})
