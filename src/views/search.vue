<template>
  <div>
    <div class="shop-list">
      <van-nav-bar title="搜索" left-arrow  @click-left="onClickLeft" />
      <div class="search">
        <van-search
          v-model="value"
          shape="round"
          background="#f4ea2a"
          placeholder="请输入商铺名/商品名"
          @search="search(value)"
          @input="historyShow()"
        />
        <div class="content">
          <div class="search-history" v-if="isShow">
            <div class="history-box">
              <div>历史记录</div>
              <div
                class="history-item"
                v-for="(item, index) in history"
                :key="index"
                @click="search(item)"
              >
                {{ item }}
              </div>
            </div>
            <van-icon name="delete-o" @click="clearHistory" />
          </div>
          <van-empty image="search" description="请输入关键字" v-if="isShow" />
          <ul v-if="empty">
            <li v-for="(item, i) in searchData" :key="i">
              <van-card :title="item.name" :thumb="item.url">
                <template #tags>
                  <div>
                    <van-icon name="star" color="#f4ea2a" />
                    <span> 评分 {{ item.rating }}</span> |
                    <span>月销 {{ item.recent_order_num }}</span>
                  </div>
                  <div class="last">
                    <span>起送 {{ item.float_minimum_order_amount }}</span> |
                    <span>配送 {{ item.float_delivery_fee }}</span>
                  </div>
                </template>
              </van-card>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getLocal, setLocal, removeLocal } from "@/utils/LocalStorage";
import { getFunc } from "@/http/request";
export default {
  data() {
    return {
      value: "",
      searchData: [],
      isShow: true,
      empty: false,
      history: [],
    };
  },
  methods: {
    async search(value) {
      await getFunc("/user/search", { searchtext: value }).then((res) => {
        this.empty = true;
        this.isShow=false,
        this.searchData = res.result;
        this.value=""
        if (
          this.searchData.length > 0 &&
          this.history.indexOf(this.value) == -1
        ) {
           
          this.history.push(this.value);
          setLocal("shop-search-history", this.history);
        }
      });
    },
    historyShow() {
      if (this.value == "") {
        this.isShow = true;
        this.empty = false;
      } else {
        this.isShow = false;
      }
    },
    rmHistory(index) {
      this.history.splice(index, 1);
      setLocal("shop-search-history", this.history);
    },
    clearHistory() {
      this.history = [];
      setLocal("shop-search-history", this.history);
    },
    onClickLeft(){
            this.$router.go(-1)
        },
  },
  mounted() {
    this.history = getLocal("shop-search-history") || [];
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
.search {
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
.content {
  padding-bottom: 50px;
}
.van-card__header {
  background-color: #fff;
  align-items: center;
}
.van-card__content {
  padding: 0;

  > div {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    div {
      padding: 5px 0;
    }
    .last {
      padding: 5px;
      margin-left: 12px;
    }
  }
}
.search-history {
  padding-bottom: 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:10px 15px;
  .history-box {
    padding: 10px 10px 0 0;
   
    &::after {
      display: block;
      content: "";
      clear: both;
    }

    .history-item {
      float: left;
      margin-left: 10px;
      margin-bottom: 10px;
      background-color: #e8e8e8;
      padding: 2px 5px;
    }
  }

  .search-btn {
    height: 26px;
    background-color: #e8e8e8;
    width: 160px;
    text-align: center;
    line-height: 26px;
    margin: 10px auto;
    color: #666;
    border-radius: 18px;
    font-size: 14px;
  }
}
</style>