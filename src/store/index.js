import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index.js' // 储存用户信息
import Detail from './Detail/index.js'
import orderDetail from './orderDetail/index.js'
import addAddress from './addAddress/index.js'
import EditAddress from './EditAddress/index.js'
import my from './my/index.js'
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    user,
    Detail,
    orderDetail,
    addAddress,
    EditAddress,
    my,
  }
})
