
<style>
  .center {
    text-align: center;
    padding-top: 7px;
    color: #fff;
    font-size: 18px;
  }
  .center img {
    width: 100px;
    height: 100px;cd
    border-radius: 50%;
    border: 4px solid #ececec;
  }
</style>


<template>
<div>
  <div style="height: 46px;">
    <sticky :check-sticky-support="false">
      <!--头部-->
      <x-header :left-options="{backText: ''}"
                style="background-color:#44b97a;z-index:10;">
        个人中心
      </x-header>
    </sticky>
  </div>
  <div >
  <blur :blur-amount=40 :url="url" style="height:150px;">
    <p class="center"><img :src="url"></p>
  </blur>
    <span style="font-size: 10px;">切换头像></span>
    <flexbox :gutter="0" style="">

      <flexbox-item v-for="(img, index) in images" :key="index"><img :src="img" style="width:100%" @click="url = img"/></flexbox-item>
    </flexbox>
  </div>
  <tab>
    <tab-item @on-item-click="handler">已发货</tab-item>
    <tab-item @on-item-click="handler">未发货</tab-item>
    <tab-item @on-item-click="handler">全部订单</tab-item>
  </tab>
  <search></search><!--未实现-->
  <!--我的微信：
  <div style="width:50px;height:50px;text-align: center">
  <qrcode style="" value="https://u.wechat.com/EMPyY1Q94ySurycQRrNUEos"></qrcode>
  </div>-->
  <tabbar style="position: fixed">
    <tabbar-item link="/">
      <img slot="icon" src="../assets/icon_nav_button.png">
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item  link="/studyRecord">
      <img slot="icon" src="../assets/icon_nav_article.png">
      <span slot="label">记录</span>
    </tabbar-item>
    <tabbar-item  link="/self" selected>
      <img slot="icon" src="../assets/icon_nav_cell.png" >
      <span slot="label" >我</span>
    </tabbar-item>
  </tabbar>
</div>
</template>
<script>
  import Vue from 'vue'
  import { Group, Cell,Sticky,XHeader,XButton,Divider,Actionsheet,Scroller,AjaxPlugin,ToastPlugin,Clocker,Flexbox,FlexboxItem
    ,Tabbar, TabbarItem,Blur,Qrcode,Tab, TabItem,Search } from 'vux'
  export default {
    components: {
      FlexboxItem,
      Group,
      Cell,
      Sticky,XHeader,XButton,Divider,Actionsheet,Scroller,AjaxPlugin,ToastPlugin,Clocker,Flexbox,
      Tabbar, TabbarItem,Blur,Qrcode,Tab, TabItem,Search
    },
    data () {
      return {
        url:'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
        images: [
          'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
          'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
          'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
        ],

      }
    },
    methods:{
      handler:function(){

      }

    }
  }

</script>
