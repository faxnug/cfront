import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/',
    component: ()=>import('../views/Home.vue'),
    children:[
        {
          path: '/dashboard',
          name:'Dashboard',
          component: ()=>import('../views/Dashboard.vue'),
        },
        {
          path: '/pwdsetting',
          name:'PwdSetting',
          component: ()=>import('../views/PwdSetting.vue'),
          meta:{requiredAuth:false}
        },
        {
          path: '/transfer',
          name:'Transfer',
          component: ()=>import('../views/Transfer.vue'),
          meta:{requiredAuth:false}
        },
        {
          path: '/orderquery',
          name:'OrderQuery',
          component: ()=>import('../views/OrderQuery.vue'),
          meta:{requiredAuth:false}
        },
        {
          path: '/hisorderquery',
          name:'HisOrderQuery',
          component: ()=>import('../views/HisOrderQuery.vue'),
          meta:{requiredAuth:false}
        },
        {
          path: '/buy',
          name:'Buy',
          component: ()=>import('../views/Buy.vue'),
          meta:{requiredAuth:false}
        },
        {
          path: '/sell',
          name:'Sell',
          component: ()=>import('../views/Sell.vue'),
          meta:{requiredAuth:false}
        }
    ]
  },
  {
      path:'/404',
      name:'404',
      component: ()=>import('../views/404.vue'),
  },
  {
      path:"*",
      redirect:'/404',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//
router.beforeEach((to, from, next) => {
  if(to.meta.requiredAuth){
    if(Boolean(sessionStorage.getItem("uid"))){
      next();
    }else{
      next({
        path:'/',
      })
    }
  }else{
    next();
  }
})

export default router
