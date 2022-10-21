// 数据状态的管理(记录/取值/修改/删除)
import{getFunc,postFunc} from "../../http/request"
import axios from 'axios';
export default {
    // namespaced: true,
    // 存数据
    state: {
    total:0,
    foodData: [],
    shopData: [],
    shoppingCart: [],
    },
    getters: {
  
    },
    // 修改数据
    mutations: {
        shoppingCart(state, res) {
          state.shoppingCart = res.result;
        },
        getShopData(state, res) {
          state.shopData = res.result;

        },
        getFoodDetail(state, res) {
          state.foodData = res.data;
        },
      
    
        
    },
    // 提交修改数据的方法(异步)
    actions: {
         async getShopping({commit},obj) {
                
          await getFunc("/user/shopping", {id:obj.id,token:obj.token}).then((res) => {
              commit('shoppingCart',res)
          });
        },
        async getShopData({commit},id) {
          await getFunc("/user/shopDetail", { id }).then((res) => {
            if (res.code==200) {
              commit('getShopData',res)
            }
              
          });
        },
        getFoodDetail({commit},id) {
          axios({
            url: "https://elm.cangdu.org/shopping/v2/menu?offset=0&limit=10",
            params: {
              restaurant_id: id || 10,
            },
          }).then((res) => {
            commit('getFoodDetail',res)
            this.shopData = res.result;
            
            this.foodData = res.data.slice(0, 10);
            this.foodData.forEach((item, index) => {
              item.food;
            });
          });
        },
       },
    
    modules: {
    }
  }
  