import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import RegistrationView from '../views/registration/RegistrationView.vue'
import AdminComponent from '../components/admin/AdminComponents.vue'
import UserComponent from '../components/user/UserComponents.vue'
import LoginView from '../views/login/LoginView.vue'
import HomeView from '../views/home/HomeVIew.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      needsAuth: false
    },    
    children: [
      {
        path: 'user',
        name: 'user',
        component: UserComponent,
        meta: {
          needsAuth: false
        },    
      },
      {
        path: 'admin',
        name: 'admin',
        component: AdminComponent,
        meta: {
          needsAuth: false
        },    
      },
    ],
  },
  {
    path: '/registration',
    name: 'Registration',
    component: RegistrationView,
    meta: {
      needsAuth: false
    }
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      needsAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
