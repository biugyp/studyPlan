<template>
  <div >
    <div style="height:141px;">
      <sticky  :check-sticky-support="false" >
        <div style="background-color: #eae9e9;">
          <!--头部-->
          <x-header :left-options="{showBack:false}" style="background-color:#44b97a;">
            <span style="font-size: 20px;"> StudyPlan</span>
          </x-header>

          <!--新增学习计划-->
          <div style="text-align: center;margin: 15px 15px 0px 15px;">
          <!--  <blur :blur-amount=40 :url="url">
              <p class="center"><img :src="url"></p>
            </blur>-->

            <flexbox>
            <flexbox-item><x-button  type="primary" @click.native="isShowAdd=true" plain>新增学习计划 </x-button></flexbox-item>
              <flexbox-item><x-button  type="primary" @click.native=" addEvaluate" plain>新增评价表 </x-button></flexbox-item>
            </flexbox>
          </div>
        <!--  <divider>我的学习计划</divider>-->
        </div>
      </sticky>
    </div>
    <actionsheet v-model="isShowAdd" :menus="addMenus" show-cancel @on-click-menu="clickAddMenus"></actionsheet>

    <div style="background:#fbf9fe">

    <div><h3 style="color:darkgrey;margin-top:0px;text-align: center">{{msg}}</h3></div>
      <div style="text-align: center"><img src="../assets/index.jpg" ></div>
      <group >
        <cell title="距离毕业" style="line-height: 0.411765;">
          <clocker time="2019-06-21">
            <span style="color:lightpink">%D 天</span>
            <span style="color:yellowgreen">%H 小时</span>
            <span style="color:cornflowerblue">%M 分 %S 秒</span>
          </clocker>
        </cell>
      </group>

    <!--列表-->
   <scroller delegate-id="myScroller"
              :onRefresh="refresh"
              :onInfinite="infinite"
              ref="my_scroller"
              height="50%"
              style="margin-top: 141px" >
      <group style="margin-top: -20px;">
        <cell :title="item.planName" v-for="item in list" :key="item.id"
              :is-link="true"
              @click.native="selectItem(item)">
        </cell>
      </group>
    </scroller>

      <group >
        <cell  title="心如草木，向阳而生。----@gyp" style="font-size:15px;line-height: 0.211765;text-align: center;">
        </cell>
      </group>

      <tabbar style="position: fixed">
        <tabbar-item selected link="/">
          <img slot="icon" src="../assets/icon_nav_button.png">
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item link="/studyRecord" >
          <img slot="icon" src="../assets/icon_nav_article.png" >
          <span slot="label">记录</span>
        </tabbar-item>
        <tabbar-item  link="/self" badge="2">
          <img slot="icon" src="../assets/icon_nav_cell.png" >
          <span slot="label" >我</span>
        </tabbar-item>
      </tabbar>
</div>
<!--    <h2><a><router-link :to="{path:'/addStudyPlan'}">Add StudyPlan</router-link></a></h2>-->
  </div>

</template>

<script>
  import Vue from 'vue'
  import { Group, Cell,Sticky,XHeader,XButton,Divider,Actionsheet,Scroller,AjaxPlugin,ToastPlugin,Clocker,Flexbox,FlexboxItem
  ,Tabbar, TabbarItem,Blur} from 'vux'
  import VueScroller from 'vue-scroller'
  //Vue.use(AjaxPlugin)
  Vue.use(VueScroller)
  Vue.use(AjaxPlugin)
  Vue.use(ToastPlugin)

export default {
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    var param = this.$route.query;
    /*this.accountId = !param.accountId? 0:param.accountId;
    this.clientType = !param.clientType? 0:param.clientType;*/
    this.fetchData();
  },
  components: {
    FlexboxItem,
    Group,
    Cell,
    Sticky,XHeader,XButton,Divider,Actionsheet,Scroller,AjaxPlugin,ToastPlugin,Clocker,Flexbox,
    Tabbar, TabbarItem,Blur
  },
  name: 'HelloWorld',

  data () {
    return {
      msg: 'Welcome to my StudyPlan app',
      isShowAdd: false,
      addMenus: [{
        label: "新增学习计划",
        value: "addFromSelf"
      }],
      list:[],
     time1:'2019-06-20 21:54',
      url:'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
    }
  },
  methods:{
    clickAddMenus:function(menuKey,menuItem){
      if(menuKey!="cancel"){
        if(menuKey=="addFromSelf"){
          this.$router.push({path:"/addStudyPlan",query:this.$route.query});
        }
      }

    },
    fetchData:function(done){
      //console.log(Vue.http);
      var that=this;
      // this.moreloading = true;
      //ajax调用接口请求，没有实际接口，随便写的
      this.$http.get('/..page.action?accoundId='+that.accoundId+
        "&page="+that.page+"&rows="+that.rows)
        .then(function(response) {
          //ajax操作成功
          //that.moreloading=false;
          if (response.status == 200) {
            //请求成功
            var data = response.data;
            var listlen = data.totalCount;
            var pages = Math.ceil(that.listlen / that.rows);
            if (pages < that.page) {
              that.nodata = true;
            }
            else {
              if (that.page == 1) {//只有一页的数据
                that.list = data.datas;
              }
              else {
                for (var i in data.datas) {
                  that.list.push(data.datas[i]);
                }
              }
              if (pages == that.page) {
                that.nodata = true;
              }
              else {
                    that.page++;
                    that.nodata = false;
                   }
            }
          }
          else {
            that.list = [];
            that.$vux.toast.text("网络发生了问题");
          }
        }
      )
        .catch(function(error){//ajax处理操作异常
         // console.log(error);
          that.moreloading = false;
          //that.$vux.toast.text('网络发生了问题了', 'middle');
          //接口是假的，所以注释掉防止弹出错误提示框影响整体效果
        });
    },
    refresh:function(done) {//刷新页面
      setTimeout(() => {
        this.page =1;
        this.list=[];
        this.nodata=false;
        this.fetchData(done)
      }, 1000)
    },
    infinite:function(done){//上拉加载刷新
      if( (this.list.length !=0 && this.listLen <= this.list.length) || this.nodata)
      {
        return ;
      }
      setTimeout(() => {
        this.fetchData(done)
      }, 1000)

    },
    selectItem:function(item){//点击选择进入列表详情页
      var paramUrl = this.$route.query;
      paramUrl.planId=item.id;
      this.$router.push({ path: 'studyPlan/PlanDetail',
        query: paramUrl });
    },
    addEvaluate:function(){
      this.$router.push({ path: '/evaluate',
        query:this.$route.query});

    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.weui-cells{
  line-height: 0.411765;
}
.center {
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-size: 18px;
}
.center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
}

</style>
