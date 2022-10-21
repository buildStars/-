<template>
  <div>
    <nav><van-nav-bar title="我的" /></nav>
    <div class="my">
      <div class="my-top" @click="toLogin">
        <div class="my-top-left">
          <img
            :src="baseurl+user2[0]?.img?baseurl+user2[0]?.img:'https://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=%E6%88%91%E7%9A%84%E5%9B%BE%E6%A0%87&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&hd=1&latest=0&copyright=0&cs=2981068061,664434819&os=3995579864,677523224&simid=2981068061,664434819&pn=9&rn=1&di=7146857200093233153&ln=1411&fr=&fmq=1665987355596_R&ic=&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=f0000000000000f0&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Fpic.616pic.com%252Fys_bnew_img%252F00%252F07%252F06%252FcqxkssRduf.jpg%26refer%3Dhttp%253A%252F%252Fpic.616pic.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Dauto%3Fsec%3D1668579424%26t%3Df3ce46c52d50af0b2234bb867347e8ef&rpstart=0&rpnum=0&adpicid=0&nojc=undefined&dyTabStr=MCwzLDYsNSw0LDIsMSw4LDcsOQ%3D%3D'"
            alt=""
          />
          <div class="my-top-left-text">
            <div>
              <p>用户名:{{ user2[0]?.userName }}</p>
              <p>手机号:{{ user2[0]?.phone }}</p>
            </div>
          </div>
        </div>
        <div class="my-top-right">
          <van-icon name="arrow" />
        </div>
      </div>
      <van-cell title="收货地址" is-link icon="location-o" @click="toaddress"/>
      <van-cell title="个人资料" is-link icon="contact" @click="toMyDetail"/>
      <van-cell title="我的订单" is-link icon="orders-o" @click="toMyOrder"/>
      <van-cell title="安全中心" is-link icon="shield-o" />
      <van-cell title="我的收藏" is-link icon="star-o" @click="toCollect"/>
    </div>
    <van-button type="danger" class="exit" @click="exit">退出登录</van-button>
  </div>
</template>
<script>
import Vue from "vue";
import { Dialog } from "vant";
Vue.use(Dialog);
import { mapState } from "vuex";
import { getFunc, postFunc } from "@/http/request";
export default {
  data() {
    return {
      isShow: false,
      token:"",
      user2:[],
      baseurl:"http:///192.168.35.39:3005"
    };
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    toaddress(){
       this.$router.push("./address")
    },
    toCollect(){
      this.$router.push("./collect")
    },
    
    getUserAsync(){
      getFunc("/user/my",{token:this.token})
      .then(
        res=>{
          this.user2 = res.result;
        }
      )
    },
    toMyDetail(){
      this.$router.push("./myDetail")
    },
    toMyOrder(){
      this.$router.push("./order")
    },
    // 退出登录
    exit(){
      Dialog.confirm({
    title: '退出登录',
  message: '确认退出登录吗？',
})
.then(() => {
  // on confirm
  // 清除token
  localStorage.removeItem("token");
  // 跳转到登录页面
})

    }
  },
  watch: {
    user: {
      deep: true,
      immediate: true,
      handler(n, o) {
        if (n.phone == "undefined" || n.phone == undefined) {
          this.isShow = false;
        } else {
          this.isShow = true;
        }
      },
    },
  },
  computed: {
    // 映射user模块
    ...mapState(["user"]),
  },
  mounted() {
    this.$route.params;
    this.token = localStorage.getItem("token");
   this.getUserAsync()
    
  },
};
</script>
<style lang="scss">
@import "../static/css/common.scss";
.exit{
  position: absolute;
  bottom: 160px;
  left:10%;
  width: 80%;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  
}
.van-nav-bar {
  background-color: $bgColor;
}
.my {
  background-color: $bgColor;
  .my-top {
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
    .my-top-left {
      display: flex;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #fff;
      }
      .my-top-left-text {
        margin-left: 10px;
        font-size: 20px;
        p {
          margin: 0;
        }
      }
    }
    .my-top-right {
      display: flex;
      align-items: center;
    }
  }
  .my-bottom {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #fff;
    .my-bottom-left {
      display: flex;
      align-items: center;
      p {
        margin: 0;
        margin-left: 10px;
      }
    }
    .my-bottom-right {
      display: flex;
      align-items: center;
    }
  }
}
.van-cell {
  padding: 3.415vw 3.7vw;
}
</style>