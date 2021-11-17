import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/signin',
		name: 'SignIn',
		component: () => import('../views/SignIn.vue')
	},
	{
		path: '/signup',
		name: 'SignUp',
		component: () => import('../views/SignUp.vue')
	},
	{
		path: '/chooserole/:uid',
		name: 'ChooseRole',
		component: () => import('../views/ChooseRole.vue')
	},
	{
		path: '/homeclient',
		name: 'HomeClient',
		component: () => import('../views/client/HomeClient.vue')
	},
	{
		path: '/homedesigner',
		name: 'HomeDesigner',
		component: () => import('../views/designer/HomeDesigner.vue')
	},
	{
		path: '/addportofolio',
		name: 'AddPortofolio',
		component: () => import('../views/designer/AddPorto.vue'),
	},
	{
		path: '/portofoliodetails/:portoId',
		name: 'PortofolioDetails',
		component: () => import('../views/designer/PortoDetails.vue'),
		// props: true
	},
	{
		path: '/profile',
		name: 'Profile',
		component: () => import('../views/designer/Profile.vue'),
	},
	{
		path: '/chats',
		name: 'Chats',
		component: () => import('../views/chats/Chats.vue'),
	},
	{
		path: '/chatroom',
		name: 'Chat Room',
		component: () => import('../views/chats/ChatRoom.vue'),
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	if (to.fullPath === '/homeclient') {
		if (!store.state.user) {
			next('/signin');
		}
	}
	if (to.fullPath === '/homedesigner') {
		if (!store.state.user) {
			next('/signin');
		}
	}
	next();
});

export default router