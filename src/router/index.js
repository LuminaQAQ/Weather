import { createRouter, createWebHashHistory } from 'vue-router'



const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/explore',
      name: 'Explore',
      component: () => import('../views/ExploerView.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  next();
})

export default router
