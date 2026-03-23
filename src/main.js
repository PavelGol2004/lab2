import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'
import { i18n } from './i18n.js'

import Index from './pages/Index.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import EventDetails from './pages/EventDetails.vue'
import AddEvent from './pages/AddEvent.vue'
import EditEvent from './pages/EditEvent.vue'
import Participants from './pages/Participants.vue'
import AdminAnalytics from './pages/AdminAnalytics.vue'
import AdminRoles from './pages/AdminRoles.vue'
import AdminAudit from './pages/AdminAudit.vue'
import Account from './pages/Account.vue'
import Settings from './pages/Settings.vue'
import NotFound from './pages/NotFound.vue'

function getRoleFromToken(token) {
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    )
    const claims = JSON.parse(json)
    return (
      claims.role ??
      claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ??
      null
    )
  } catch {
    return null
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Index },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/events/:id', component: EventDetails },
    { path: '/events/add', component: AddEvent, meta: { requiresAuth: true, roles: ['Admin', 'Employee'] } },
    { path: '/events/:id/edit', component: EditEvent, meta: { requiresAuth: true, roles: ['Admin', 'Employee'] } },
    { path: '/events/:id/participants', component: Participants, meta: { requiresAuth: true, roles: ['Admin', 'Employee'] } },
    { path: '/admin/analytics', component: AdminAnalytics, meta: { requiresAuth: true, roles: ['Admin', 'Employee'] } },
    { path: '/admin/roles', component: AdminRoles, meta: { requiresAuth: true, roles: ['Admin'] } },
    { path: '/admin/audit', component: AdminAudit, meta: { requiresAuth: true, roles: ['Admin', 'Employee'] } },
    { path: '/account', component: Account, meta: { requiresAuth: true } },
    { path: '/settings', component: Settings, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    return '/login'
  }
  if (to.meta.roles?.length) {
    const role = getRoleFromToken(token ?? '')
    if (!role || !to.meta.roles.includes(role)) return '/'
  }
})

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#root')
