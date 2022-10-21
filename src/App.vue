<template>
  <div id="app">
    <keep-alive include="HomeView,Home,My,Order,Shop"><router-view/></keep-alive>
  </div>
</template>

<style lang="scss">
  @import './static/css/base.scss';
  body{
    background-color:#f5f5f5;
  }
  .van-nav-bar {
   @import "./static/css/common.scss";
  background-color: $bgColor;
}
</style>
