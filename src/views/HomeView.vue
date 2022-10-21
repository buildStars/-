<template>
  <div>
    <router-view></router-view>
    <nav>
      <van-tabbar
      v-model="activeIndex"
      inactive-color="#cdcdcd"
      active-color="#2c2c2c"
    >
      <van-tabbar-item
        v-for="(item, index) in iconData"
        :to="item.routeName"
        :key="index"
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
    </nav>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      activeIndex: 0,
      iconData: [
        {
          title: "首页",
          routeName: "home",
          active: require("../assets/home-active.png"),
          inactive: require("../assets/home-inactive.png"),
        },
        {
          title: "商铺",
          routeName: "shop",
          active: require("../assets/shop-active.png"),
          inactive: require("../assets/shop-inactive.png"),
        },
        {
          title: "订单",
          routeName: "order",
          active: require("../assets/order-active.png"),
          inactive: require("../assets/order-inactive.png"),
        },
        {
          title: "我的",
          routeName: "my",
          active: require("../assets/my-active.png"),
          inactive: require("../assets/my-inactive.png"),
        },
      ],
    };
  },
};
</script>
<style lang="scss">
</style>