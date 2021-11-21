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
		path: '/homedesigner',
		name: 'HomeDesigner',
		component: () => import('../views/designer/HomeDesigner.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/addportofolio',
		name: 'AddPortofolio',
		component: () => import('../views/designer/AddPorto.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/portofoliodetails/:portoId',
		name: 'PortofolioDetails',
		component: () => import('../views/designer/PortoDetails.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/profiledesigner',
		name: 'ProfileDesigner',
		component: () => import('../views/designer/ProfileDesigner.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/client',
		name: 'MainClient',
		component: () => import('../views/client/MainClient.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/homeclient',
		name: 'HomeClient',
		component: () => import('../views/client/HomeClient.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/designerportofolios/:designerId',
		name: 'DesignerPortofolios',
		component: () => import('../views/client/DesignerPortofolios.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/designerportofolios/:designerId/:portoId',
		name: 'DesignerPortofolioDetails',
		component: () => import('../views/client/DesignerPortoDetails.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/designerportofolioscategory/:category',
		name: 'DesignerPortofoliosCategory',
		component: () => import('../views/client/DesignerPortoCategory.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/profileclient',
		name: 'ProfileClient',
		component: () => import('../views/client/ProfileClient.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/chats',
		name: 'Chats',
		component: () => import('../views/chats/Chats.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/chatroom/:chatname/:docId',
		name: 'Chat Room',
		component: () => import('../views/chats/ChatRoom.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/transactions/:userId',
		name: 'Transactions',
		component: () => import('../views/transactions/AllTransactions.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/detailstransaction/:docId',
		name: 'Details Transaction',
		component: () => import('../views/transactions/DetailsTransaction.vue'),
		meta: { requiresAuth: true },
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!store.state.user) {
			next('/signin');
		}
	}
	next();
});

export default router