import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import axios from "axios";
import {Rate,Dialog,Uploader,Area,AddressList,AddressEdit,Stepper ,RadioGroup, Radio,ActionSheet,Cell,CellGroup,Button,Empty,ImagePreview,Popup,Card,Sidebar, GoodsAction, GoodsActionIcon, GoodsActionButton,
  SidebarItem,Grid, GridItem,Calendar,Icon,Tabbar, TabbarItem, Tab, Tabs,NavBar,Swipe, SwipeItem,Tag,Field,Form,Toast,Search,PullRefresh,Lazyload,List,DropdownMenu, DropdownItem,SwipeCell} from "vant";
Vue.use(Dialog).use(Uploader).use(Area).use(AddressEdit).use(AddressList).use(RadioGroup).use(Radio).use(Stepper).use(ActionSheet).use(Popup).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Sidebar).use(SidebarItem).use(Cell).use(Rate).use(Empty).use(GridItem).use(Card).use(Grid).use(Button).use(Calendar).use(Icon).use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(NavBar).use(Swipe).use(SwipeItem).use(Tag).use(Field).use(CellGroup).use(Form).use(Toast).use(Search).use(PullRefresh).use(List).use(DropdownMenu).use(DropdownItem).use(ImagePreview).use(Lazyload).use(SwipeCell)

Vue.config.productionTip = false

axios.interceptors.request.use(config => {
  //config: 请求配置(请求头, 请求参数, 请求类型, 请求路径, ....)
  // console.log('发起请求之前执行');

    //启动加载提示
    Toast.loading({
      message: '正在加载中...',
      //禁止穿透点击
      forbidClick: true,
      // loadingType: 'spinner',
      //不会自动关闭提示
      duration: 0,
      // overlay:true,
      // icon: require('./assets/loading.gif'),
    })

  return config;
}, err => {
  console.log('err ==> ', err);
  //关闭加载提示
  Toast.clear();
  return Promise.reject(err);
})

//添加一个响应之前拦截器
axios.interceptors.response.use(res => {
  //res: 服务器响应数据
  // console.log('响应数据返回给前端之前');

  //关闭加载提示
  Toast.clear();

  return res;
}, err => {
  console.log('err ==> ', err);

  //关闭加载提示
  Toast.clear();
  
  return Project.reject(err);
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
