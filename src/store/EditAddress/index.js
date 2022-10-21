// 数据状态的管理(记录/取值/修改/删除)
import {
  getFunc,
  postFunc
} from "../../http/request"
import axios from 'axios';
export default {
  state: {
    addressList: [],
  },
  mutations: {



  },
  // 提交修改数据的方法(异步)
  actions: {
    async editAddress({
      commit
    }, v) {

      let res = await postFunc("/user/editAddress", {
        token: v.token,
        name: v.name,
        phone: v.tel,
        address: v.province + v.city + v.county + v.addressDetail,
        email_id: v.postalCode,
        is_default: v.isDefault
      })
      return Promise.resolve(res)
    },
     // 删除地址
     async deleteAddress({
      commit
    }, v) {
      let res = await getFunc("/user/delAddress", {
        id: v.address_id})
      return Promise.resolve(res)
    },
  },
   
  modules: {}
}