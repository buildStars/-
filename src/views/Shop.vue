<template>
  <div class="shop">
  <div class="shop-list">
    <van-nav-bar title="商铺" />
    <div class="search">
    <van-search
      v-model="value"
      shape="round"
      background="#f4ea2a"
      @focus="toSearch"
      placeholder="请输入商铺名/商品名"
     
    />
</div>
    <div class="content">
      <van-tabs v-model="activeName" @click="getData(activeName),pageChange()">
        <van-tab title="综合" name=1>
          <ul><li v-for="(item,i) in shopData" :key="i" @click="toDetail(item.id)">
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
        </van-tab>
        <van-tab title="销量" name=2>
          <ul><li v-for="(item,i) in shopData" :key="i" @click="toDetail(item.id)">
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
        </van-tab>
        <van-tab title="评分" name=3>
          <ul><li v-for="(item,i) in shopData" :key="i" @click="toDetail(item.id)">
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
        </van-tab>
      </van-tabs>
    </div>
  </div>
</div>
</template>
<script>
  import axios from 'axios';
import{getFunc} from '@/http/request';
export default {
  data() {
    return {
      value: "",
      activeName: 1,
      shopData:[],
      page:20,
    };
  },
  methods: {
    async getData(active){
      await  getFunc('/user/shop',{order_by:active})
      .then(
        res=>{
          this.shopData=res.result
        }
      )
    },
    pageChange(){
      this.page=20
    },
    toDetail(id){
      this.$router.push({path:'/Detail',query:{id:id}})
    },
 
    toSearch(){
      this.$router.push('/search')
    },
    
  },

  mounted() {
    this.getData();
    // this.scroll(); 
  },
};
</script>
<style lang="scss">
@import "../static/css/common.scss";
.shop {
  height: 100vh;
  overflow-y: auto;
}
.van-nav-bar {
  background-color: $bgColor;
}
.search{
    .van-search {
  padding: 0 10px 10px 10px;
}
}

.van-tabs__line {
  background-color: #f4ea2a;
}
.van-tab {
  flex: 0.15;
}
.content{
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
</style>