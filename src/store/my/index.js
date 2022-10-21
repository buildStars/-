// 数据状态的管理(记录/取值/修改/删除)
import {
    getFunc,
    postFunc
} from "../../http/request"
import axios from 'axios';
export default {
    state: {
    },
    mutations: {

      

    },
    // 提交修改数据的方法(异步)
    actions: {
        //   修改头像

        async updateAvatar({
            commit
        }, obj) {
            let res = await postFunc("/upload/img", {
                test:obj.test,
                token:obj.token,
            })
            if (res.code==200) {
                return Promise.resolve(res)
            }
           
        },

        
   
    async updateNickName({commit
       
    }, obj) {
        let res = await postFunc("/user/updateName", {
            name:obj.name,
            token:obj.token,
        })
        if (res.code==200) {
            return Promise.resolve(res)
        }
       
    },

    },

    modules: {}
}