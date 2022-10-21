<template>
  <div>
    <div class="header">
      <van-nav-bar>
        <template #left>
          <van-icon name="location-o" color="#fff" size="18" />
          <van-dropdown-menu>
            <van-dropdown-item
              v-model="value1"
              :options="option1"
              color="black"
            />
          </van-dropdown-menu>
        </template>
        <template #right>
          <van-search v-model="value" placeholder="搜索" @focus="toSearch" />
        </template>
      </van-nav-bar>
    </div>
    <div class="classes">
      <van-grid :border="false" :column-num="4">
        <van-grid-item>
          <img src="../assets/icon_th0hfznl8n/meishi.png" />
          美食
        </van-grid-item>
        <van-grid-item>
          <img src="../assets/icon_th0hfznl8n/yinpin.png" />
          甜点饮品
        </van-grid-item>
        <van-grid-item>
          <img src="../assets/icon_th0hfznl8n/hanbao.png" />
          炸鸡汉堡
        </van-grid-item>
        <van-grid-item>
          <img src="../assets/icon_th0hfznl8n/chaoshigouwu.png" />
          商超便利
        </van-grid-item>
      </van-grid>
    </div>
    <h4>美食推荐</h4>
    <div class="recommend">
      <div
        class="recommend-list"
        v-for="(item, i) in shopData"
        :key="i"
        @click="ToDetail(item.id)"
      >
        <div class="top">
          <img :src="item.url" alt="" />
        </div>
        <h5 class="title">{{ item.name }}</h5>
        <div class="bottom">
          <div class="bottom-top">
            <div class="left">
              <span>评分</span>
              <van-icon name="star" /> {{ item.rating }}
            </div>
            <span> |</span>
            <div class="right">
              <span>月销</span> {{ item.recent_order_num }}
            </div>
          </div>
          <div class="bottom-top">
            <div class="left">
              <div>
                <span>起送</span>￥{{ item.float_minimum_order_amount }}
              </div>
            </div>
            <span> |</span>
            <div class="right">
              <span>配送</span>￥{{ item.float_delivery_fee }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { getFunc } from "@/http/request";
export default {
  data() {
    return {
      value: "",
      value1: 0,
      option1: [
        { text: "广州南方学院", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
      ],
      shopData: [],
      searchData: [],
    };
  },
  methods: {
    async getPhoto() {
      await getFunc("/user/shop").then((res) => {
        this.shopData = res.result;
      });
    },

    async toSearch() {
      this.$router.push("/search");
    },
    ToDetail(id) {
      this.$router.push({ path: "/detail", query: { id: id } });
    },
  },
  created() {
    this.getPhoto();
  },
};
</script>
<style lang="scss">
@import "../static/css/common.scss";
.van-nav-bar {
  background-color: $bgColor;
}
.van-dropdown-menu__bar {
  background-color: transparent;
  box-shadow: none;
}
.van-search {
  background-color: transparent;
  box-shadow: none;
  padding: 0;
}
.van-grid {
  img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
  }
}
h4 {
  padding: 15px;
}
.recommend {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 60px;
  .recommend-list {
    margin-left: 15px;
    margin-bottom: 20px;
    width: 185px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding-bottom: 15px;
    overflow: hidden;
    .top {
      img {
        width: 185px;
        height: 185px;
      }
    }
    .title {
      padding: 0 8px;
      font-size: 16px;
      font-weight: 600;
      margin: 5px 0;
    }
    .bottom {
      .bottom-top {
        display: flex;
        .left {
          padding: 0 8px;

          display: flex;
          align-items: center;
          color: $bgColor;
          span {
            font-size: 14px;
            color: #999;
            margin-right: 5px;
          }
        }
        .right {
          padding: 0 10px;
          color: $bgColor;
          font-size: 14px;
          span {
            color: #999;
          }
        }
      }
    }
  }
}
</style>