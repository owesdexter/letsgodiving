import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ActivityDetails from '../views/ActivityDetails.vue'
import Activities from '../views/Activities.vue'
import Host from '../views/Host.vue'
import Result from '../views/Result.vue'
import Cart from '../views/Cart.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/result',
    name: 'Result',
    component: Result,
    children: [
    {
      path: '',
      name: 'Result',
      component: Activities,
    },
    {
      path: '/activitydetails/:actID',
      name: 'Detail',
      component: ActivityDetails,
    }]
  },
  {
    path: '/host',
    name: 'Host',
    component: Host,
  },

  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
