<template>
  <div >
    <div style="height: 46px;">
      <sticky :check-sticky-support="false">
        <!--头部-->
        <x-header :left-options="{backText: ''}"
                  style="background-color:#44b97a;z-index:10;">
          新建学习计划
          <a slot="right" ><span  @click="saveFollowUp" style="font-size: larger">保存</span></a>
        </x-header>
      </sticky>
    </div>
      <!--名称-->
      <group>
        <x-input title=""  v-model="planName" required placeholder="请输入学习计划名称"></x-input>
      </group>
    <!--开始时间-->
    <group>
      <cell title="计划开始时间" style="line-height: 0.311765;">
        <x-button type="primary" :mini="true"  @click.native="showMenus=true" >{{baseTimeName}}
          <span>
          <x-icon type="arrow-down-b" size="13"></x-icon>
          </span>
        </x-button>
      </cell>
    </group>
     <actionsheet v-model="showMenus" :menus="planMenus" show-cancel @on-click-menu="clickPlanMenus"></actionsheet>
     <actionsheet v-model="showMessage" :menus="messageMenus" @on-click-menu="clickMessage"  show-cancel></actionsheet>
     <!--计划制定阶段-->
    <div>
      <div class="vux-timeline">
        <ul>
          <li class="vux-timeline-item" v-for="(item,index) in taskList">
            <!--首节点 黄色-->
            <div class="vux-timeline-item-color vux-timeline-item-head-first" v-if="item.isFirst==true" >
              <i class="vux-timeline-item-checked" ></i>
            </div>
            <!--非首节点 红色删除按钮-->
            <div class="vux-timeline-item-color vux-timeline-item-head-first" @click="delTask(index)" v-else style="background-color:#FFF;">
                 <span>
                 <x-icon type="ios-minus" style="fill:#ff334f" size="20"></x-icon>
                 </span>
            </div>

            <div class="vux-timeline-item-tail" style="display: block;"></div><!--竖线-->
            <!--内容-->
            <div class="vux-timeline-item-content">
              <!--日期未完成-->
              <h4 >距{{baseTimeName}}后<x-input  placeholder="7天" style="text-align: center;width:57px;height:6px;
              float:right;margin-right:115px;margin-top:-2px;color:GREY;background:#B9D2EC;"  v-model="item.date"></x-input>
              </h4>

              <div class="vux-popover">
                <div class="vux-popover-arrow vux-popover-arrow-left"></div><!--左侧箭头小图标-->
                <div>
                  <div class="popover-demo-content">
                    <ul>
                      <li  style="text-align: center;font-size: 17px;" @click="addSubTask(index)" >向学生发送
                        <span style="font-size: x-large;" >+</span>
                      </li>
                      <li style="background-color:#fff;margin: 0 5px;font-size: 15px" v-for="(subitem,index2) in item.subTaskList"
                           v-if="!!subitem &&!!subitem.subTaskType">
                        <!--复习提醒-->
                        <flexbox align-items="flex-start" justify-content="flex-start" v-if="subitem.subTaskType=='review'">
                          <flexbox-item :span="28/100">
                            {{subitem.subTaskTitle}}
                          </flexbox-item>
                          <flexbox-item :span="3/5">
                            <x-textarea :rows="2" :show-counter="false" placeholder="请输入提醒内容"
                                        v-model="subitem.subTaskContent" >
                            </x-textarea>
                          </flexbox-item>
                          <flexbox-item :span="1/8">
                            <span @click="delItem(index,index2)" style="font-size: x-large;color: gray;"> x </span>
                          </flexbox-item>
                        </flexbox>
                        <!--考试提醒-->
                        <flexbox align-items="flex-start" justify-content="flex-start" v-if="subitem.subTaskType=='test'">
                          <flexbox-item :span="28/100" >
                            {{subitem.subTaskTitle}}
                          </flexbox-item>
                          <flexbox-item :span="3/5">
                            <x-textarea :rows="2" :show-counter="false" placeholder="请输入提醒内容"
                                        v-model="subitem.subTaskContent" >
                            </x-textarea>
                          </flexbox-item>
                          <flexbox-item :span="1/8">
                            <span @click="delItem(index,index2)" style="font-size: x-large;color: gray;"> x </span>
                          </flexbox-item>
                        </flexbox>
                        <!--学习小tip-->
                        <flexbox align-items="flex-start" justify-content="flex-start" v-if="subitem.subTaskType=='tip'">
                          <flexbox-item :span="28/100" >
                            {{subitem.subTaskTitle}}
                          </flexbox-item>
                          <flexbox-item :span="3/5">
                            <x-textarea :rows="2" :show-counter="false" placeholder="请输入提醒内容"
                                        v-model="subitem.subTaskContent" >
                            </x-textarea>
                          </flexbox-item>
                          <flexbox-item :span="1/8">
                            <span @click="delItem(index,index2)" style="font-size: x-large;color: gray;"> x </span>
                          </flexbox-item>
                        </flexbox>
                        <!--学习评价表-->
                        <flexbox align-items="flex-start" justify-content="flex-start" v-if="subitem.subTaskType=='evaluate'">
                          <flexbox-item :span="28/100" >
                            {{subitem.subTaskTitle}}
                          </flexbox-item>
                          <flexbox-item :span="3/5" style="text-align: center">
                            <a href="javascript:void 0;" @click="selectEvaluate(index,index2)"> 请点击选择</a>
                            <div style="color:blue" v-model="subitem.subTaskContent">{{subitem.evaluateSelectName}}</div>

                          </flexbox-item>
                          <flexbox-item :span="1/8">
                            <span @click="delItem(index,index2)" style="font-size: x-large;color: gray;"> x </span>
                          </flexbox-item>

                          <!-- 评价表选择-->
                          <popup v-model="subitem.showEvaluate" :height="'50%'" >
                            <div >
                              <group>
                                <radio :options="subitem.evaluateName" class="cells" v-model="subitem.evaluateSelectName" ></radio>
                              </group>
                            </div>

                          </popup>
                        </flexbox>

                      </li>
                      <li style="height: 5px;background-color: #b9d2ec;"></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </li>
          <!--尾部节点-->
          <li class="vux-timeline-item" @click="addTask">

            <div class="vux-timeline-item-color  vux-timeline-item-head-first" style="background-color: #FFF;">
              <x-icon class="vux-timeline-item-checked" type="ios-plus" style="fill:green" size="20" ></x-icon>
            </div>
            <div class="vux-timeline-item-content">
              <h4 class="">添加计划次数</h4>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--可见范围-->
    <group class="cells">
        <popup-radio title="可见范围"  :options="shareLevels" v-model="shareLevel" placeholder="请选择" class="cells">

        </popup-radio>
    </group>

    <!--删除按钮-->
    <div style="text-align: center;margin-top: 35px;">
       <flexbox>

         <flexbox-item><x-button  type="warn" >重置 </x-button></flexbox-item>
         <flexbox-item><x-button  type="primary" @click.native="saveFollowUp">保存该计划 </x-button></flexbox-item>
       </flexbox>
    </div>
    <toast v-model="isShowToast" type="text" :text="toastText"></toast>
    <p><loading v-model="isLoading"></loading></p>

  </div>
</template>

<script>
  import { Group, Cell,XHeader,Sticky,XInput ,XButton,Actionsheet,PopupRadio,Flexbox,XTextarea, FlexboxItem,Popup,Radio
  ,Checklist,Icon,Toast,Loading} from 'vux'

  export default {
    created () {
      // 组件创建完后获取数据，create函数中调用ajax获取页面初始化所需的数据
      // 此时 data 已经被 observed 了
      //钩子中的this指向调用它的vue实例
      var param = this.$route.query;//路由请求参数，如/foo?user=1获取到query.user = 1
      // //console.log(this.$route);
      this.accountId = !param.accountId? 0:param.accountId;
      this.clientType = !param.clientType? 0:param.clientType;
      window.FollowUpData = undefined;
      window.FollowUpDataIndex='';
    },
    components: {
      Flexbox,
      XTextarea,
      FlexboxItem,
      Actionsheet,
      XButton,
      Group,
      Cell,
      XHeader,
      Sticky,
      XInput,
      PopupRadio,
      Popup,
      Radio,Checklist,Icon,Toast,Loading


    },
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to my addStudyPlan Page',
        planName:'',
        baseTimeName:"开学",
        showMenus:false,
        planMenus:[{
          label:"开学",
          value:"start"
        },
          {
            label:"期中",
            value:"middle"
          },
          {
          label:"放假",
          value:"holiday"
        }],
        taskList:[{
          isFirst:true,
          subTaskList:[],
          date:""

        }],
        shareLevels:[{
          key: '0',
          value: '仅本人'
        },{
          key: '1',
          value: '我的好友'
        },{
          key: '2',
          value: '所有人'
        }],
        shareLevel:"",
        showMessage:false,
        messageMenus:[{
          label:"复习提醒",
          value:"review"
        },
          {
            label:"考试提醒",
            value:"test"
          },
          {
          label:"学习小tip",
          value:"tip"
          },
          {
            label:"学习评价表",
            value:"evaluate"
          }],
        currentIndex:0,
        isShowToast:false,
        toastText:"",
        isLoading:false
      }
    },
    methods:{
      clickPlanMenus:function(menuKey,menuItem){
        if(menuKey!="cancel"){
          //console.log(menuKey);console.log(menuItem);
          this.baseTimeName=menuItem.label;
          }
      },
      addTask:function(){
        var newTask={
          isFirst:false,
          subTaskList:[],
          date:""
        };
        this.taskList.push(newTask);
      },
      delTask:function(index){
        this.taskList.splice(index,1);
      },
      addSubTask:function(index){
        this.showMessage=true;
        this.currentIndex=index;
      },
      clickMessage:function(menuKey,menuItem){
        //console.log(menuKey);
       if(menuKey!="cancel"){
         switch(menuKey){
           case "review":
             var newNode={
               subTaskType:"review",
               subTaskTitle:menuItem.label,
               subTaskContent:''
             };
            /* this.$router.push({path:"/index",query:this.$route.query});*/
            this.taskList[this.currentIndex].subTaskList.push(newNode);
            return;
           case "test":
             var newNode={
               subTaskType:"test",
               subTaskTitle:menuItem.label,
               subTaskContent:''
             };
             this.taskList[this.currentIndex].subTaskList.push(newNode);
             return;
           case "tip":
             var newNode={
               subTaskType:"tip",
               subTaskTitle:menuItem.label,
               subTaskContent:''
             };
             this.taskList[this.currentIndex].subTaskList.push(newNode);
             return;
           case "evaluate":
             var newNode={
               subTaskType:"evaluate",
               subTaskTitle:menuItem.label,
               subTaskContent:'',
               evaluateSelectName:'',
               showEvaluate:false,
               evaluateName:["学习进度评价表","学习成果评价表",
                 "学习方法评价表", "学习效率评价表","学习时间评价表"],
             };
            /* this.$router.push({path:"/evaluate",query:this.$route.query});*/
             this.taskList[this.currentIndex].subTaskList.push(newNode);
             return;
         }
       }
      },
      delItem:function(index,index2){
        this.taskList[index].subTaskList.splice(index2,1);
      },
      selectEvaluate:function(index,index2){
        this.taskList[index].subTaskList[index2].showEvaluate=true;
      },
      saveFollowUp:function(){
        var that=this;//把this对象复制到临时变量that.在javascript语言中，this代表着当前的对象，它在程序中随着执行的上下文随时会变化。
        //解决的办法就是复制一份当前的对象，这时候我们使用that 就不会找不到原来的对象了
        //验证表单
        if(this.planName.trim()==""){
          this.isShowToast=true;
          this.toastText="请输入学习计划名称";
          return;
        }

        if( this.taskList[0].subTaskList.length==0){
           this.isShowToast=true;
           this.toastText="请添加第一条计划";
           return;
        }
        //去空
        var taskList=this.taskList;
        for(var len=taskList.length-1;len>=0;len--){
          //去掉没有填写内容的节点
          if(taskList[len].subTaskList.length==0){
            that.taskList.splice(len,1);
          }
          else{//节点中添加了提醒但未添加内容的
            var subitem=that.taskList[len].subTaskList;
            for(var j in subitem){
              if(subitem[j].subTaskContent.trim()==""){
                this.isShowToast=true;
                this.toastText="请添加向学生发送内容";
                return;
              }
            }

          }
        }
        if(this.shareLevel.trim()==''){
          this.isShowToast=true;
          this.toastText="请选择可见范围";
        }
        if(this.isLoading==false){
          console.log("enter");
          this.isLoading=true;
          this.$http({
            url:"add.action",
            method:"post",
            data:{
              plan:JSON.stringify(that.$data),
              accoundId:that.accountId
            },
            transformRequest: [function (data) {
              // Do whatever you want to transform the data
              var ret = '';
              for (var it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(//ajax请求成功
           function (response) {
             that.isLoading=false;
             var data=response.data;
             if(data.code==0){
               //请求成功要做的事
               that.isShowToast=true;
               that.toastText="保存成功！";
               that.$router.push({path:'/PlanList',
                 query: that.$route.query});
             }
             else{
               that.isShowToast=true;
               that.toastText="保存失败";
             }
           }
          ).catch(//ajax请求异常
            function(error){
             // console.log(error);
              that.isLoading=false;
              that.isShowToast=true;
              that.toastText="网络异常，保存失败";
            }

          );

        }
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  ul {
    list-style-type: none;
    padding: 0;
  }
 ul > li{
   list-style: none;
 }
  a {
    /*color: #42b983;*/
    color:cornflowerblue;
    text-decoration: none;
  }

 .vux-timeline-item-tail{
   position: absolute;
   content: '';
   height: 100%;
   width: 2px;
   left: 5px;
   top: 20px;
   background-color: #FF9900;
 }
 .vux-timeline{
   margin: 15px;
 }
 .vux-timeline > ul > li{
   list-style: none;
 }
 .vux-timeline-item {
   position: relative;
 }
 .vux-timeline-item-color {
   background-color: #FF9900;
 }
 .vux-timeline-item-head-first {
   width: 20px;
   height: 20px;
   left: -4px;
   top: 0px;
 }
 .vux-timeline-item-head, .vux-timeline-item-head-first {
   position: absolute;
   content: '';
   z-index: 99;
   border-radius: 99px;
 }
 [class^="weui-icon-"], [class*=" weui-icon-"] {
   display: inline-block;
   vertical-align: middle;
   font: normal normal normal 14px/1 "weui";
   font-size: inherit;
   text-rendering: auto;
   -webkit-font-smoothing: antialiased;
 }

 .vux-timeline-item-checked-start {
   width: 100%;
   position: absolute;
   left: 0;
   top: 0;
   width: 20px;
   height: 20px;
 }
 .vux-timeline-item-checked {
   width: 100%;
   position: absolute;
   left: 0;
   top: 0;
   width: 20px;
   height: 20px;
 }
 .vux-timeline-item-content {
   padding: 0 0 1.5rem 1.2rem;
 }


 .vux-popover{
   background-color: #b9d2ec;
   border-radius: 3px;
   margin-top: 10px;
 }
 .vux-popover-arrow-left {
   border-top: 5px solid transparent;
   border-bottom: 5px solid transparent;
   border-right: 5px solid #b9d2ec;
   top: 50%;
   -webkit-transform: translateY(-50%);
   transform: translateY(-50%);
   left: 14px;
 }
 .vux-popover-arrow {
   position: absolute;
   width: 0;
   height: 0;
 }
  .cells{
    line-height: 0.411765;
  }
</style>
