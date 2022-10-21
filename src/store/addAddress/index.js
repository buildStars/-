// 数据状态的管理(记录/取值/修改/删除)
import {
    getFunc,
    postFunc
} from "../../http/request"
import axios from 'axios';
export default {
    state: {
        addressList: [],
        editAddress: [],
    },
    mutations: {


        address(state, res) {
            state.addressList = res.result
        },
        editAddress(state, res) {
            state.editAddress = res.result
        },


    },
    // 提交修改数据的方法(异步)
    actions: {
        async addAddress({
            commit
        }, v) {
            let res = await postFunc("/user/addAddress", {
                token: v.token,
                name: v.name,
                phone: v.tel,
                address: v.province + v.city + v.county + v.addressDetail,
                email_id: v.postalCode,
                is_default: v.isDefault
            })
            return Promise.resolve(res)
        },
        async findAddress({
            commit
        }, v) {
            let res = await getFunc("/user/getAddress", {
                token: v.token
            })
            commit('address', res)
            return Promise.resolve(res)
        },
        async findAddressByAid({
            commit
        }, v) {
            let res = await getFunc("/user/getAddressById", {
                token: v.token,
                id: v.id
            })
            commit('editAddress', res)
            return Promise.resolve(res)
        },
    },


    modules: {}
}