<template>
  <div>
    <nav><van-nav-bar title="注册" left-arrow @click-left="back" /></nav>
    <div class="content">
      <div class="center">
        <van-form>
        <van-field v-model="userName" label="用户名:" placeholder="请输入用户名" 
        :rules="[{ required: true,}]"/>
        <van-field v-model="phone" label="手机号:" placeholder="请输入手机号"
        :rules="[{ required: true,}]" />
        <van-field v-model="user" label="邮箱:" placeholder="请输入邮箱" 
        :rules="[{ required: true,}]"/>
        <van-field
          v-model="sms"
          center
          clearable
          label="邮箱验证码:"
          placeholder="请输入邮箱验证码"
          :rules="[{ required: true,}]"
        >
          <template #button>
           <button class="btn3" type="primary" ref="btn"  @click="sendEmail">发送验证码</button>
           
            
          </template>
        </van-field>
        <van-field
          v-model="passWord"
          type="password"
          label="密码:"
          placeholder="请输入密码"
          :rules="[{ required: true, }]"
        />
        <van-field
          v-model="password1"
          type="password"
          label="密码:"
          placeholder="请再次输入密码"
          :rules="[{ required: true,}]"

        />
        <div class="my-vtn"> <van-button color="#f4ea2a" class="register"   @click="onSubmit"  native-type="submit">注册</van-button></div>
        </van-form>
      </div>
      <div class="bottom">
       
        <span @click="toLogin">已有账号？去登陆</span>
      </div>
    </div>
  </div>
</template>
<script>
let rep_phone = /^1[3-9]\d{9}$/
let rep_email =/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
// 局部组件
// 引入已经封装的http函数
import Vue from "vue"
import { Dialog } from "vant"
import {registerFunc, sendEmailFunc} from '@/http/request'
Vue.use(Dialog);
// 全局注册
export default {
  data() {
    return {
      userName: "",
      phone: "",
      user: "",
      sms: "",
      passWord: "",
      password1: "",
    };
  },
  // 注册弹窗组件
  components: {
     [Dialog.Component.name]: Dialog.Component,
  },
  // 当前组件的数据

  // 编写方法
  methods: {
    toLogin(){
        this.$router.push('/login')
    },
    // 请求服务器处理
    onSubmit() {
      //242234234@qq.com
      //11111
      // 执行注册的函数
      this.register(this.user,this.passWord,this.sms,this.userName,this.phone)
    },
    // 注册
    register(user,passWord,v1,userName,phone) {
      if (this.passWord !== this.password1) {
        Dialog.alert({
          title: "提示",
          message: "两次密码不一致",
        });
        return;
      }
        
      if(!rep_phone.test(this.phone)){
        Dialog.alert({
          title: "提示",
          message: "手机号格式不正确",
        });
        return;
      }
      if (rep_email.test(user)) {
        // 执行注册的API
        registerFunc('/user/register',{email: user,passWord,v1,userName,phone})
        .then(
           data=> {
            if(data.code == 200){
               Dialog.alert({
                title: '是否跳转登录页',
                message: data.msg,
              }).then(() => {
                  // 页面跳转(传递参数)
                  this.$router.push({path:'/login'})
              });
            }
            else {
              Dialog({ message: data.msg });
            }
           }
        )
      }else {
         alert("输入的账号格式不正确!")
      }
    },
    back(){
    this.$router.go(-1)
  },
    // 发送邮箱验证码
    sendEmail() {
      let timer = null,
        count = 60;
        timer =setInterval(() => {
          if (count <= 0) {
            clearInterval(timer);
            this.$refs.btn.disabled = false;
            this.$refs.btn.innerHTML = "发送验证码";
            return;
          }
          this.$refs.btn.disabled = true;
          this.$refs.btn.innerHTML = count + "s";
          count--;
        }, 1000);
       if(rep_email.test(this.user)){
          sendEmailFunc('/sendEmail',{email: this.user})
          .then(
            data=>{
              // 是否发送邮箱验证码成功
              // 服务端反馈的信息 
              //  console.log(data)
               if(data.code == 200){
                  Dialog({ message: data.msg });
               }else {
                  Dialog({ message: data.msg });
               }
            }
          )
       }
    },
    
  },

    
   
 
};

</script>
<style lang="scss">
.van-nav-bar {
  @import "../static/css/common.scss";
  background-color: $bgColor;
}
.btn3{
  padding:5px 10px;
  border:1px solid #ccc;
}
.content {
  .top {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 20px;
    img {
      width: 50px;
      height: 50px;
    }
  }
  .center {
    .van-form{
    .van-field__label {
      width: 80px;
    }
}
     .my-vtn>.register{
        margin-top: 20px;
        margin-left: 170px;
    }
  }
  .bottom {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
   
    span {
      color: #ccc;
      font-size: 14px;
      padding: 10px;
    }
  }
}
</style>