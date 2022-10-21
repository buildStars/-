<template>
    <div id="collect">
        <van-nav-bar fixed title="我的收藏"  left-arrow @click-left="onClickLeft" />
        <div class="content">
            <ul><li v-for="(item,i) in shopData" :key="i" @click="toDetail(item.shop_id)">
            <van-card
            :title="item.name"
            
            :thumb="item.url"
           
          >
            <template #tags>
             
              <div>
                <van-icon name="star" color="#f4ea2a" />
                <span> 评分 {{item.rating}}</span> |
                <span>月销 {{item.recent_order_num}}</span>
              </div>
              <div class="last"><span>起送 {{item.float_minimum_order_amount}}</span> | <span>配送 {{item.float_delivery_fee}}</span></div>
            </template>
          </van-card>
       
          </li></ul>
        </div>
    </div>
</template>
<script>
import { getFunc, postFunc } from "@/http/request";
export default {
    data() {
        return {
            shopData: [],
            token:localStorage.getItem("token"),
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        getCollect(){
            getFunc('/user/getCollect',{token:this.token}).then(res=>{
                this.shopData = res.result
            })
        },
        toDetail(id){
            this.$router.push({path:'/detail',query:{id:id}})
        }
        
    },
    mounted() {
        this.getCollect()
    }
}
</script>
<style lang="scss">
    #collect{
        .content{
            padding-top: 50px;
  padding-bottom: 50px !important; 
}
.van-card__header{
  background-color: #fff;
  align-items: center;
  
}
.van-card__content {
  padding: 0;
  
  
  > div {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    div{
        padding: 5px 0;
    }
    .last{
        padding:5px;
        margin-left: 12px;
    }

  }
}
    }
</style>