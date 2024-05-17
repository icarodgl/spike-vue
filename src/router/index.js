import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import { useAuthStore, useAlertStore } from '@/stores';
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '#',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/cadastro/',
      name: 'cadastro',
      component: () => import('../views/cadastro.vue')
    },
    {
      path: '/cadastro/:id',
      name: 'cadastroId',
      component: () => import('../views/cadastro.vue')
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: () => import('../views/usuario.vue')
    },
    {
      path: '/pessoas',
      name: 'pessoas',
      component: () => import('../views/pessoas.vue')
    },
    {
      path: '/contatos',
      name: 'contatos',
      component: () => import('../views/contatos.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})
router.beforeEach(async (to) => {
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page 
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
      authStore.returnUrl = to.fullPath;
      return '/login';
  }if(!authRequired && authStore.user){
    return false
  }
});
export default router
