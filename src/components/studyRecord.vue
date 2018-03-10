
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
  <div style="height: 90px;z-index:1000;position: relative;">
    <sticky :check-sticky-support="false">
      <!--头部-->
      <x-header :left-options="{backText: ''}"
                style="background-color:#44b97a;z-index:10;">
        学习计划
        <a slot="right" style="color:#fff;">筛选</a>
      </x-header>
      <group style="text-align: left;color:grey;margin-top:-20px;">
        <cell title="我的计划列表" style="height: 30px;background:rgb(234, 233, 233)"></cell>
      </group>
    </sticky>
  </div>
  <!--vue-scroller-->
  <div style="height:90px;display: block;"></div>
  <scroller delegate-id="myScroller" ref="myScroller"  :onRefresh="refresh"
            :onInfinite="infinite" style="margin-top:97px;">
    <group  v-for="(item,index) in list" :key="item.id" style="margin-top: -20px;">
      <cell :title="item.name" style="height:20px;">

      </cell>
    </group>

  </scroller>
  <p><loading v-model="isLoading"></loading></p>

  <tabbar style="position: fixed">
    <tabbar-item link="/">
      <img slot="icon" src="../assets/icon_nav_button.png">
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item selected >
      <img slot="icon" src="../assets/icon_nav_article.png" >
      <span slot="label">记录</span>
    </tabbar-item>
    <tabbar-item  link="/self" >
      <img slot="icon" src="../assets/icon_nav_cell.png" >
      <span slot="label" >我</span>
    </tabbar-item>
  </tabbar>
</div>
</template>
<script>
  import Vue from 'vue'
  import VueScroller from 'vue-scroller'
  Vue.use(VueScroller)
  import { Group, Cell,Sticky,XHeader,XButton,Divider,Actionsheet,AjaxPlugin,ToastPlugin,Clocker,Flexbox,FlexboxItem
    ,Tabbar, TabbarItem,Blur,Qrcode,Tab, TabItem,Search,Loading } from 'vux'
  export default {
    components: {
      FlexboxItem,
      Group,
      Cell,
      Sticky,XHeader,XButton,Divider,Actionsheet,AjaxPlugin,ToastPlugin,Clocker,Flexbox,
      Tabbar, TabbarItem,Blur,Qrcode,Tab, TabItem,Search,Loading
    },
    created:function(){
     // this.isLoading=true;
      this.fetchData(id);//获取数据


    },
    data () {
      return {
        list:[{name:"日计划",id:1},{name:"周计划",id:2},{name:"周计划",id:3},{name:"周计划",id:4},{name:"周计划",id:5}
          ,{name:"周计划",id:6},{name:"周计划",id:7},{name:"周计划",id:8},{name:"周计划",id:9},{name:"周计划",id:10}
          ,{name:"周计划",id:11},{name:"周计划",id:12},{name:"周计划",id:13},{name:"周计划",id:14},{name:"周计划",id:15},
          {name:"周计划",id:16},{name:"周计划",id:17}],
        isLoading:false

      }
    },
    methods:{
      handler:function(){

      },
      refresh(done) {
        setTimeout(() => {
          //this.fetchTabData(done)
          done(true)
        }, 1000)
      },
      infinite(done) {
        done(true)

      },
      fetchData:function(id){
        var that=this;
        this.isLoading=true;
        this.$http({
          url:"....action",
          method:"post",
          data:{id:id},//post时要传递的参数放入data中，get时加载路径后面,"url?id="+id
          dataType:"json",
          transformRequest: [function (data) {
            // Do whatever you want to transform the data

           /*transformRequest方法允许在请求发送到服务器之前修改该请求，此方法只适用于PUT、POST和PATCH方法中。
            而且，此方法最后必须返回一个string、ArrayBuffer或者Stream。*/

            var ret = '';
            for (var it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {// 发送自定义Headers头文件，头文件中包含了http请求的各种信息。
            'Content-Type': 'application/x-www-form-urlencoded'
          }

        });

      }


    }
  }

</script>
