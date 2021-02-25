import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ActivityDetails from '../views/ActivityDetails.vue'
import Activities from '../views/Activities.vue'
import Host from '../views/Host.vue'
import Result from '../views/Result.vue'
import Cart from '../views/Cart.vue'
import Register from '../views/Register.vue'
// import FbIframe from '../views/FbIframe.vue'

const routes = [
  {
    path: '',
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
  {
    path: '/register',
    name: 'Register',
    component: Register,
  //   children: [
  //     {
  //       path: '?code='+':code',
  //       name: 'Register',
  //       component: Register,
  //     },
  //   ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
