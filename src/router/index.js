import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/teach',
    name: 'teach',
    component: () => import('@/components/teach')
  },
  {
    path: '/hastoken',
    name: 'hastoken',
    component: () => import('@/components/hastoken')
  }
]
const createRouter = () => new Router({
  routes: constantRoutes
})
const whiteList = ['/teach', '/', '/selfdefineroute'] // no redirect whitelist
const router = createRouter()
router.beforeEach(async (to, from, next) => {
  console.log(to.path)
  if (sessionStorage.getItem("token") === null) {
    if (whiteList.indexOf(to.path) < 0) {
      next({path:'/'})
    }else{
      next()
    }
  } else {
    next()
  }
})
router.afterEach(() => {

})
export default router