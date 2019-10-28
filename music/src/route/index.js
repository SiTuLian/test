import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('views/home/home')
const sideBar = () => import('views/sidebar/sideBar')
const musicPage = () => import('views/musiclistline/musicPage')
const musicLcy = () => import('views/musicly/musicLcy')

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    components: {
      default: Home,
      sideBar: sideBar
    }
  },
  {
    path: '/music/:id',
    component: musicPage
  },
  {
    path:'/lcy/:id',
    component: musicLcy
  }
]

const router = new Router({
  routes,
  mode: 'hash'
})

export default router;
