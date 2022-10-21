import Vue from 'vue'
import VueRouter from 'vue-router'
import { Toast } from 'vant';

Vue.use(Toast);
import store from '@/store'
import {
  getLocal
} from '@/utils/LocalStorage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/HomeView.vue'),
    
    redirect:"/home",
    
    children: [
      {
        path: '/my',
        name: 'my',
        component: () => import('../views/My.vue'),
        meta: {
          reqToken: true,
      
        }
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/Order.vue'),
        meta: {
          reqToken: true,
       
        }
      },
      {
        path: '/shop',
        name: 'shop',
        component: () => import('../views/Shop.vue'),
        meta: {
          reqToken: false,
          
        }
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: {
          reqToken: false,
          
        },
      },
    ]
    
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      reqToken: false,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: {
      reqToken: false
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/Detail.vue'),
    meta: {
      reqToken: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search.vue'),
    meta: {
      reqToken: false
    }
    
  },
  {
    path: '/orderdetail',
    name: 'orderdetail',
    component: () => import('../views/orderDetail.vue'),
    meta: {
      reqToken: true,
    }
    
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('../views/address.vue'),
    meta: {
      reqToken: true,
    }
    
  },
  {
    path: '/editaddress',
    name: 'editaddress',
    component: () => import('../views/EditAddress.vue'),
    meta: {
      reqToken: false,
    }
    
  },
  {
    path: '/Addaddress',
    name: 'Addaddress',
    component: () => import('../views/addAddress.vue'),
    meta: {
      reqToken: false,
    }
    
  },
  {
    path: '/myDetail',
    name: 'myDetail',
    component: () => import('../views/myDetail.vue'),
    meta: {
      reqToken: false,
    }
    
  },
  {
    path: '/collect',
    name: 'collect',
    component: () => import('../views/collect.vue'),
    meta: {
      reqToken: false,
    }
    
  },
 
]
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  //获取token
  let token = localStorage.getItem('token')||"";

  if (token) { //判定token  如果有token 获取用户信息 判定token是否有效
    next()

  } else { //没有token

    // store.commit('CLEARACCOUNTINFO') //清楚信息
    if (to.meta.reqToken == true) { //是否需要token
      Toast('用户未登录，请先登录');
      router.push('/login')
    } else {
      next()

    }
  }

})
export default router
