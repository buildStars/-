<template>
  <div>
    <nav><van-nav-bar title="订单列表" /></nav>
    <div class="content">
      <van-empty
        description="内容空空如也，快去下单吧"
        v-show="getOrderList.length < 1"
      />
      <ul class="content-list">
        <li v-for="(item, i) in getOrderList" :key="i">
          <a href="javascript:;">
            <div class="top">
              <h3 class="title">{{ item?.name }}</h3>
              <p class="is-finish">
                {{ item.is_finish }}
                <van-icon name="delete" @click="delOrder(item.order_id)" />
              </p>
            </div>
            <div class="center">
              <div
                class="center-left"
                v-for="item2 in item.info.slice(0, 3)"
                :key="item2.food_id"
              >
                <img :src="item2.img_url" alt="" />
              </div>
              <div class="center-right">
                <!-- item.order_price -->
                <p class="price">总计：￥{{ item.order_price }}</p>
                <p class="num">
                  共x{{ item.allcount }}件
                  <van-icon name="arrow" />
                </p>
              </div>
            </div>
            <div class="bottom">
              <!-- @click="againOrder" -->

              <van-button
                round
                color="#f4ea2a"
                @click="againOrder(item.shop_id)"
                >再来一单</van-button
              >
            </div>
          </a>
        </li>
      </ul>
    </div>
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
      token: "",
    };
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    againOrder(id) {
      this.$router.push({ path: "/Detail", query: { id: id } });
    },
    // 删除订单
    delOrder(id) {
      Dialog.confirm({
        title: "提示",
        message: "确定删除该订单吗？",
      })
        .then(() => {
          // on confirm
          getFunc("/user/delOrder", { id: id, token: this.token })
            .then((res) => {
              this.$store.dispatch("getOrder", {
                token: this.token,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  computed: {
    ...mapState({
      getOrderList: (state) => state.orderDetail.orderList,
    }),

    countTotal() {
      let count = 0;
      this.getOrderList.forEach((item) => {
        item.info.forEach((item2) => {
          count += item2.count;
        });
      });
      return count;
    },
    // 再来一单
  },

  created() {
    this.token = localStorage.getItem("token");
    this.$store.dispatch("getOrder", {
      token: this.token,
    });
  },
};
</script>
<style lang="scss">
@import "../static/css/common.scss";
.van-nav-bar {
  background-color: $bgColor;
}
.content {
  padding: 0 10px;
  margin-top: 10px;
  padding-bottom: 60px;
  .content-list {
    li {
      margin-bottom: 15px;
      background-color: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
      padding: 10px;
      a {
        display: block;
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px;
          .title {
            font-size: 18px;
          }
          .is-finish {
            color: #999;
          }
        }
        .center {
          display: flex;
          padding: 5px;
          justify-content: space-between;
          .center-left {
            img {
              width: 65px;
              height: 65px;
              margin-right: 10px;
            }
          }
          .center-right {
            padding-left: 0.2rem;
            text-align: right;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .price {
              font-size: 16px;
              color: #f00;
            }
            .num {
              color: #999;
              font-size: 16px;
            }
          }
        }
        .bottom {
          padding: 0.2rem;
          text-align: right;
        }
        .van-button {
          color: #000 !important;
        }
      }
    }
  }
}
</style>