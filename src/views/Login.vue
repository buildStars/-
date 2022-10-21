<template>
    <div>
        <nav> <van-nav-bar title="登录" left-arrow @click-left="back"/></nav>
        <div class="content">
            <div class="top">
                <img src="http://www.kangliuyong.com:10002/assets/default.png" alt="">
            </div>
            <div class="center">
                <van-form >
                <van-field v-model="user" label="账号:" placeholder="请输入手机号或邮箱"
                :rules="[{ required: true,}]"/>
            
                <van-field v-model="passWord" type="password" label="密码:" placeholder="请输入密码"
                :rules="[{ required: true,}]"/> 
                <van-button color="#f4ea2a" type="primary" @click="onSubmit" class="btn-1">登录</van-button> 
                
            </van-form>
            </div>
            <div class="bottom">
               
              
                <span @click="toRegister">还没有账号？去注册</span>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    let rep_phone = /^1[3-9]\d{9}$/
    let rep_email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    // 局部
    import Vue from 'vue';
    import { Dialog } from 'vant';
    // 全局注册
    Vue.use(Dialog);
    export default {
      components: {
        [Dialog.Component.name]: Dialog.Component,
      },
      data() {
        return {
          user: "",
          passWord: "",
          checkbox: false,
        };
      },
      methods: {
        toRegister(){
        this.$router.push('/register')
    },
        // 请求服务器处理登录
        onSubmit() {
          let email = this.user;
          
          let passWord = this.passWord;
          if(rep_email.test(email)||rep_phone.test(email)) {
            let data = {
                email,
                passWord,
            }
            axios
            .post(
              "http://192.168.35.39:3005/user/login",
              data,
              {
                headers: "application/x-www-form-urlencoded",
              }
            )
            .then((response) => {
              // 登录成功
              let { data } = response;
              if(data.code == 200){
                // 解构赋值
               
                let {token, email , phone,userName} = data;
                // 把用户的临时身份储存在本地(可以把token进行切片之后储存起来,需要使用再进行拼接)
                localStorage.setItem('token',token);
                // 把数据储存在vuex
                this.$store.dispatch('user/setEmailAsync', email);
                this.$store.dispatch('user/setPhoneAsync', phone);
                this.$store.dispatch('user/setUserNameAsync', userName);
                Dialog.alert({
                  title: '是否跳转个人中心页面?',
                  message: data.msg,
                }).then(() => {
                    // 页面跳转(传递参数)
                    this.$router.push({name:'my',params: {email , phone,userName}})
                });
              }
            });
          }
        },
        formatter(value) {
          // 过滤输入的数字
          return value.replace(/\d/g, '');
        },
        back(){
            this.$router.back()
           
        }
      },
    };
</script>
<style lang="scss">
    body{
        background-color: #f7f8fa;
    }
    .van-nav-bar {
        @import "../static/css/common.scss";
  background-color: $bgColor;
}
.content {
    .top{
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        margin-top: 20px;
        img{
            width: 50px;
            height: 50px;
        }
    }
    .center{
        .van-field__label {
            width: 40px;
            
        }
        .btn-1 {
            margin-left: 180px;
            margin-top: 20px;
        }
    }
    .bottom{
        margin-top: 20px;
        display: flex;
        justify-content:center;
        align-items:center;
       button {
            margin-left: 150px;
           
            .van-button__content{
                span{
                    color:black !important;
                }
               
            }
       }
       span{
        color: #ccc;
        font-size: 14px;
        padding:10px;
       } 
    }
}
</style>