// 数据状态的管理(记录/取值/修改/删除)
import {
  getFunc,
  postFunc
} from "../../http/request"
import axios from 'axios';
export default {
  state: {
    orderList: [],
  },
  mutations: {


    getOrder(state, res) {
      state.orderList = res.result
    }
  },
  // 提交修改数据的方法(异步)
  actions: {
    async getOrder({
      commit
    }, obj) {

      await postFunc("/user/order", {
        token: obj.token,
        info: obj.info,
        name: obj.name,
        shop_id: obj.shop_id,
        total: obj.total,
        allcount:obj.allcount,
      }).then((res) => {
        if (res.code==200) {
          commit('getOrder', res)
          return Promise.resolve(res)
        }
      });
    
    },
  },

  modules: {}
}