<template>
  <div id="menu">
    <div class="shop-detail">
      <div class="top">
        <van-icon name="arrow-left" class="left1" @click="back" />
        <img :src="shopData[0]?.bgcUrl" alt="" />
      </div>
      <div class="center">
        <div class="left"><img :src="shopData[0]?.url" alt="" /></div>
        <div class="right">
          <h4>{{ shopData[0]?.title }}</h4>
          <span>公告</span>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-top">
          <div class="left">
            <van-icon name="like" :color="color" @click="colorChange" />
            <span>收藏</span>
          </div>
          <van-icon name="arrow-down" />
          <van-icon name="arrow-up" v-show="false" />
        </div>
        <div class="bottom1">
          <div class="left">
            <van-tabs v-model="active">
              <van-tab title="商品">
                <div class="menu-box">
                  <div class="menu-left">
                    <van-sidebar
                      v-model="activeKey"
                      v-for="(item, i) in foodData"
                      :key="i"
                    >
                      <van-sidebar-item :title="item.description" />
                    </van-sidebar>
                  </div>
                  <div class="menu-right">
                    <div
                      class="prod-box"
                      v-for="(item, i) in foodData"
                      :key="i"
                    >
                      <div
                        class="prod-item"
                        v-for="(food, i) in item.foods"
                        :key="i"
                      >
                        <div class="prod">
                          <div class="img-box">
                            <img
                              class="auto-img"
                              :src="baseurl + food?.image_path"
                              alt=""
                            />
                          </div>
                          <div>
                            <div class="prod-name one-line-text">
                              {{ food?.name }}
                            </div>
                            <div class="prod-enname one-line-text"></div>
                            <div class="pro-info">
                              <div class="prod-price">
                                ￥{{ food?.specfoods[0]?.price }}
                              </div>
                            </div>
                          </div>
                          <van-icon
                            name="plus"
                            class="add"
                            @click="
                              addCart(
                                food?._id,
                                food?.specfoods[0]?.price,
                                food?.name,
                                baseurl + food.image_path
                              )
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </van-tab>
              <van-tab title="评价">
                <div class="commend">
                  <div class="top1">
                    <ul class="top-list">
                      <li>
                        <div class="shop_rating">总平均分</div>
                        <div>4.2</div>
                      </li>
                      <li>
                        <div class="shop_rating">口味</div>
                        <div>4.2</div>
                      </li>
                      <li>
                        <div class="shop_rating">包装</div>
                        <div>4.2</div>
                      </li>
                      <li>
                        <div class="shop_rating">服务</div>
                        <div>4.2</div>
                      </li>
                      <li>
                        <div class="shop_rating">配送满意度</div>
                        <div>83%</div>
                      </li>
                    </ul>
                  </div>
                  <div class="bottom">
                    <ul class="commend-list">
                      <li>
                        <div class="top3">
                          <div class="top-left">
                            <img src="" alt="" />
                          </div>
                          <div class="top-right">
                            <div class="name">
                              <span>匿名用户</span>
                              <span class="time">2019-12-12 12:12:12</span>
                            </div>
                            <div class="rating">
                              评分
                              <van-rate v-model="value" readonly />
                            </div>
                          </div>
                        </div>
                        <div class="bottom2">
                          <div class="text">评论</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </van-tab>
            </van-tabs>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <van-goods-action>
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :badge="totalCount"
          @click="showPopup()"
        />
        <van-icon name="gold-coin-o" class="money"
          ><div>总计:￥{{ total }}</div></van-icon
        >
        <van-button
          plain
          hairline
          type="primary"
          @click="goOrderDetail(shop_id)"
          >去结算</van-button
        >
      </van-goods-action>
      <van-action-sheet v-model="show" title="我的购物车" class="shop1">
        <div class="content">
          <div class="top">
            <div class="left">
              <van-icon name="shop-o" />
              <span>已选商品</span>
            </div>
            <div class="right" @click="deleteCart(shop_id)">
              <van-icon name="close" />
              <span>清空</span>
            </div>
          </div>
          <ul class="content-list">
            <li v-for="(item, i) in shoppingCart" :key="i">
              <div class="left">
                <span>{{ item.name }}</span>
              </div>
              <div class="right">
                <span>￥{{ item.price }}</span>
                <van-stepper
                  v-model="item.count"
                  theme="round"
                  button-size="22"
                  disable-input
                  :min="0"
                  @plus="addCount(item.id, 1)"
                  @minus="minus(item.id, 1)"
                />
              </div>
            </li>
          </ul>
        </div>
      </van-action-sheet>
    </footer>
  </div>
</template>

<script>
import { getFunc, postFunc } from "@/http/request";
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeKey: 0,
      color: "#999",
      flag: false,
      active: "",
      baseurl: "https://elm.cangdu.org/img/",
      show: false,
      count: 1,
      shop_id: this.$route.query.id,
      value: 4,
      token: "",
    };
  },
  methods: {
    colorChange() {
      if (this.flag) {
        this.color = "#f50";
        this.flag = false;
        this.addCollect();
      } else {
        this.color = "#999";
        this.flag = true;
        this.cancelCollect();
      }
    },
    deleteCart(id) {
      getFunc("/user/remove", { id }).then((res) => {
        this.$store.dispatch("getShopping", {
          id: this.$route.query.id,
          token: this.token,
        });
      });
    },
    addCart(id, price, name, url) {
      postFunc("/user/shoppingCart", {
        food_id: id,
        price: price,
        name: name,
        count: this.count,
        shop_id: this.$route.query.id,
        img_url: url,
        token: this.token,
      }).then((res) => {
        this.$store.dispatch("getShopping", {
          id: this.$route.query.id,
          token: this.token,
        });
      });
    },
    // 添加收藏
    addCollect() {
      postFunc("/user/addCollect", {
        shop_id: this.shop_id,
        token: this.token,
        shop_name:this.shopData[0].name,
        url:this.shopData[0].url,
        rating:this.shopData[0].rating,
        float_minimum_order_amount:this.shopData[0].float_minimum_order_amount,
        float_delivery_fee:this.shopData[0].float_delivery_fee,
        recent_order_num:this.shopData[0].recent_order_num,

        
      }).then((res) => {
        this.$toast(res.msg);
      });
    },
    // 取消收藏
    cancelCollect() {
      getFunc("/user/delCollect", {
        shop_id: this.shop_id,
        token: this.token,
      }).then((res) => {
        this.$toast(res.msg);
      });
    },
    back() {
      this.$router.go(-1);
    },
    showPopup() {
      if (this.flag) {
        this.show = true;
        this.flag = false;
       
      } else {
        this.show = false;
        this.flag = true;
       
      }
    },
    getCollect(){
      getFunc("/user/getCollectById", {
        token: this.token,
        shop_id: this.shop_id,
      }).then((res) => {
        if (res.result.length > 0) {
          this.color = "#f50";
          this.flag = false;
        } else {
          this.color = "#999";
          this.flag = true;
        }
      });
    },
    goOrderDetail(shop_id) {
      if (this.totalCount > 0) {
        this.$router.push({ path: "/orderDetail", query: { shop_id } });
      } else {
        this.$toast("请先添加商品");
      }
    },

    async minus(id, count) {
      await getFunc("/user/minus", { id, count }).then((res) => {
        this.$store.dispatch("getShopping", {
          id: this.$route.query.id,
          token: this.token,
        });
      });
    },
    async addCount(id, count) {
      await getFunc("/user/add", { id, count }).then((res) => {
        this.$store.dispatch("getShopping", {
          id: this.$route.query.id,
          token: this.token,
        });
      });
    },
  },

  computed: {
    ...mapState({
      shoppingCart: (state) => state.Detail.shoppingCart,
      foodData: (state) => state.Detail.foodData,
      shopData: (state) => state.Detail.shopData,
    }),
    total() {
      let total = 0;
      this.shoppingCart.forEach((item) => {
        total += item.price * item.count;
      });
      return total;
    },
    totalCount() {
      let totalCount = 0;
      this.shoppingCart.forEach((item) => {
        totalCount += item.count;
      });
      return totalCount;
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.$store.dispatch("getFoodDetail", this.$route.query.id);
    this.$store.dispatch("getShopData", this.$route.query.id);
    this.$store.dispatch("getShopping", {
      id: this.$route.query.id,
      token: this.token,
    });
    this.getCollect();
  },
};
</script>

<style lang="scss">
.commend {
  background-color: #f9f9f9;
  height: 500px;
  .top1 {
    width: 100%;
    height: 40px;
    margin-bottom: 15px;
    .top-list {
      display: flex;
      justify-content: space-between;
      padding: 15px;
      color: #a1a1a1;
      font-size: 14px;
      text-align: center;
      background-color: #fff;
      li {
        .shop_rating {
          margin-bottom: 5px;
        }
      }
    }
  }
  .bottom {
    margin-top: 10vw;
    .commend-list {
      background-color: #fff;
      li {
        padding: 15px 10px;
        border-bottom: 1px solid #ccc;
        .top3 {
          display: flex;
          .top-left {
            padding: 0 10px 0 5px;
            img {
              width: 45px;
              height: 45px;
              border-radius: 50%;
            }
          }
          .top-right {
            flex-grow: 1;
            .name {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 5px;
              .time {
                color: #a1a1a1;
                font-size: 12px;
              }
            }
          }
        }
        .bottom2 {
          margin-top: 10px;
          margin-bottom: 10px;
          .text {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
.money {
  margin-right: 140px;
  display: flex;
  font-size: 18px;
  div {
    margin-left: 5px;
  }
}
.van-overlay {
  height: 88%;
}
.van-popup--bottom {
  bottom: 70px;
}
.van-goods-action {
  justify-content: space-between;
  padding: 10px 20px;
  z-index: 10000;
}
.left1 {
  padding: 20px;
  position: absolute;
}
.add {
  position: absolute;
  right: 10px;
  top: 7.83vw;
}
#menu {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-bottom: 48px;
  .menu-box {
    display: flex;
    height: calc(100% - 57px);

    .menu-left {
      width: 98px;
      height: 100%;
      overflow-y: auto;
      background-color: #ccc;
      .van-sidebar {
        width: 100%;
        a {
          background-color: #f9f9f9;
        }
      }
      .van-sidebar-item--select::before {
        width: 2px;
        height: 60%;
        background-color: #e4393c;
      }
    }

    .menu-right {
      width: calc(100% - 98px);
      height: 100%;
      background-color: #fff;
      overflow-y: auto;
      overflow: hidden;
      padding: 0 10px;

      .img-box {
        padding-right: 15px;
        img {
          width: 60px;
          height: 60px;
        }
      }
      .prod-box {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        flex-wrap: wrap;

        gap: 10px;
        .prod-item {
          width: 100%;
          .prod {
            position: relative;
            display: flex;
            width: 100%;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
            .prod-name {
              font-size: 16px;
              margin-top: 10px;
              width: 80px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .prod-enname {
              color: #999;
            }

            .prod-price {
              color: #e4393c;
              font-weight: 700;
              font-size: 14px;
            }

            .badge-box {
              position: absolute;
              right: 0;
              top: 0;
            }
          }
        }
      }
    }
  }
}
.shop1 {
  .content {
    padding: 0;
    .top {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      //  background-color: #f9f9f9;
    }
    .content-list {
      li {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        .left {
          span {
            margin-left: 10px;
          }
        }
        .right {
          display: flex;
          > span {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
.shop-detail {
  .top {
    height: 100px;
    background-color: #f7f8fa;
    overflow: hidden;
  }
  .center {
    display: flex;
    padding: 10px;
    .left {
      width: 100px;
      height: 100px;
      background-color: #f7f8fa;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      flex: 1;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h4 {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      span {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .bottom {
    .bottom-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      padding: 0 15px;
      background-color: #f7f8fa;
      .van-icon {
        font-size: 20px;
      }
      .left {
        width: 68px;
        background-color: #f7f8fa;
        display: flex;
        justify-content: center;
        align-items: center;
        .van-icon {
          font-size: 20px;
          margin-right: 10px;
        }
      }
    }
    .bottom1 {
      display: flex;
      .left {
        flex: 1;
        .van-tabs {
          height: 100%;
        }
      }
    }
  }
}
</style>