// 数据状态的管理(记录/取值/修改/删除)
import{getFunc,postFunc} from "../../http/request"
export default {
  namespaced: true,
  // 存数据
  state: {
    email: '',
    phone: '',
    userName: '',
    user:[],
  },
  getters: {

  },
  // 修改数据
  mutations: {
    setEmail(state, value) {
      state.email = value;
    },
    setPhone(state, value) {
      state.phone = value;
    },
    setUserName(state, value) {
      state.userName = value;
    },
    SetUser(state, res) {
      state.user=res.result
    }
  },
  // 提交修改数据的方法(异步)
  actions: {
    setEmailAsync(content,value){
      content.commit('setEmail',value)
    },
    setPhoneAsync(content,value){
      content.commit('setPhone',value)
    },
    setUserNameAsync(content,value){
      content.commit('setUserName',value)
    },
    getUserAsync({commit},token){
     getFunc("/user/my",{token}).then((res) => {
        commit('SetUser',res)
    });
    },

  },
  modules: {
  }
}
