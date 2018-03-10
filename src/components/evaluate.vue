<style>
  .vux-demo {
    text-align: center;
  }
  li {
    list-style: none;
  }
  .logo {
    width: 100px;
    height: 100px
  }
  .vux-number-input{
    width:28px;
  }
  .weui-cells {
    margin-top: 1.17647059em;
    background-color: #FFFFFF;
    line-height: 0.41176471;
    font-size: 17px;
    overflow: hidden;
    position: relative;
  }
  .cells{
    line-height: 0.411765;
  }

</style>

<template>
  <div>
    <div style="height: 46px;position: relative;z-index: 1000">
      <sticky  :check-sticky-support="false"  style="width: 100%;position:fixed;">
        <x-header  :left-options="{backText:''}" style="background-color:#44b97a;z-index:10;">
          <span style="vertical-align:middle;font-size:17px; margin-bottom: 10px;">评价表录入</span>
          <a slot="right"><span @click="showMenus = true" style="font-size:larger;">添加</span></a>
        </x-header>
      </sticky>
    </div>
    <actionsheet :menus="menus" @on-click-menu-menu1="addSubject(1)"  @on-click-menu-menu2="addSubject(2)"
                 @on-click-menu-menu3="addSubject(3)" @on-click-menu-menu4="addSubject(4)"
                 v-model="showMenus" show-cancel></actionsheet>
    <group>
      <cell title="编辑评价表">
        <flexbox>
          <flexbox-item>
            <x-button type="primary" :mini="true" style="vertical-align:middle;"  @click.native="handleClick()">保存</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" :mini="true" >返回</x-button>
          </flexbox-item>
        </flexbox>
      </cell>
    </group>

    <div style="padding:7px;">
      <!--标题部分开始-->
      <x-input  title="标题" placeholder="请输入评价表标题"></x-input>
      <x-textarea title="描述" :placeholder="'请输入描述'" class="singleInput"></x-textarea>
      <x-input title="题量" v-model="testNum"></x-input>
      <x-input title="分值"></x-input>
      <!--标题部分结束-->

      <!--题目部分开始-->
      <div v-if="subjects.length<1" style="display:block;height:50px;text-align:center;">
        <h1>没有题目</h1>
      </div>
      <div v-else v-for="(val,index1) in subjects">

        <!--单选-->
        <div v-if="val.type==1" style="margin-top:30px;margin-bottom:10px;">
          <!--这是编辑部分-->
          <div v-if="val.isEdit">
            {{index1+1}}<span style="float:right;" for="bitian" >单选题&nbsp;&nbsp;
            <input type="checkbox" role="bitian"  v-model="val.ischoose"/>是否必填</span>
            <x-textarea title="问题" placeholder="请输入问题" v-model="val.question"></x-textarea>
            <!--选项-->
            <div v-for="(answerItem,index2) in val.answer" style="display:block;margin:5px 0;" :parentid="index1">
              <x-input title="选项" placeholder="请输入选项内容" v-model="answerItem.value"></x-input>
              <x-button style="float:right;margin-top:0px;margin-right:10px;" type="primary" plain :mini="true" @click.native="delAnswerItem(index1,index2)">x
              </x-button>
              <x-input title="分数" placeholder="没有，请不填 " v-model="answerItem.point" type="number"> </x-input>
            </div>
            <!--增加选项-->
            <div style="float:right;">
              <x-button type="primary" :mini="true"   @click.native="addAnswerItem(index1)">增加选项</x-button>
            </div>
            <br/><br/>
          </div>
          <!--这是预览部分-->
          <div v-else>
            <div>
              {{index1+1}}.{{val.question}}
              <group>
                <radio :options="val.answer"  v-model="val.resultname" class="cells"></radio>
              </group>
            </div>
          </div>
          <div style="">
            <x-button type="primary"  :mini="true" style="float:right;" v-if="val.isEdit" @click.native="toggleEdit(index1,val)">完成</x-button>
            <x-button type="primary" :mini="true" v-else @click.native="toggleEdit(index1,val)" style="float:right;">编辑</x-button>
            <x-button type="warn" :mini="true" style="float:right;margin-top:0px;margin-right:5px;" @click.native="deleteItem(index1)"> 删除该题</x-button>
          </div>
        </div>

        <!--多选-->
        <div v-if="val.type==2" style="margin-top:30px;margin-bottom:10px;">
          <!--编辑部分-->
          <div v-if="val.isEdit==true">
            {{index1+1}}<span style="float:right;" for="bitian" >多选题&nbsp;&nbsp;
            <input type="checkbox" role="bitian"  v-model="val.ischoose"/>是否必填</span>
            <x-textarea title="问题" placeholder="请输入问题" v-model="val.question"></x-textarea>
            <!--选项-->
            <div v-for="(answerItem,index2) in val.answer" style="display:block;margin:5px 0;" :parentid="index1">
              <x-input title="选项" placeholder="请输入选项内容" v-model="answerItem.value"></x-input>

              <x-button style="float:right;margin-top:0px;margin-right:10px;" type="primary" plain :mini="true" @click.native="delAnswerItem(index1,index2)">x
              </x-button>
              <x-input title="分数" placeholder="没有，请不填 " v-model="answerItem.point" type="number"> </x-input>
            </div>
            <!--增加选项-->
            <div style="float:right;">
              <x-button type="primary" :mini="true"   @click.native="addAnswerItem(index1)">增加选项</x-button>
            </div>
            <br/><br/>
          </div>
          <!--预览部分-->
          <div v-else>
            <div>
              {{index1+1}}.{{val.question}}
              <span style="color:blue">(可多选)</span>
              <group>
                <checklist :options="val.answer"  v-model="val.resultname" class="cells"></checklist>
              </group>
            </div>
          </div>
          <div style="">
            <x-button type="primary"  :mini="true" style="float:right;" v-if="val.isEdit" @click.native="toggleEdit(index1,val)">完成</x-button>
            <x-button type="primary" :mini="true" v-else @click.native="toggleEdit(index1,val)" style="float:right;">编辑</x-button>
            <x-button type="warn" :mini="true" style="float:right;margin-top:0px;margin-right:5px;" @click.native="deleteItem(index1)"> 删除该题</x-button>
          </div>
        </div>

        <!--问答题-->
        <div v-if="val.type==3" style="margin-top:30px;margin-bottom:10px;">
          <!--编辑部分-->
          <div v-if="val.isEdit">
            {{index1+1}}<span style="float:right;" for="bitian" >问答题&nbsp;&nbsp;
            <input type="checkbox" role="bitian"  v-model="val.ischoose"/>是否必填</span>
            <x-textarea title="问题" placeholder="请输入问题" v-model="val.question"></x-textarea>
          </div>
          <!--预览部分-->
          <div v-else>
            {{index1+1}}.{{val.question}}
            <x-textarea placeholder="请输入" v-model="val.resultname"></x-textarea>
          </div>
          <div style="">
            <x-button type="primary"  :mini="true" style="float:right;" v-if="val.isEdit" @click.native="toggleEdit(index1,val)">完成</x-button>
            <x-button type="primary" :mini="true" v-else @click.native="toggleEdit(index1,val)" style="float:right;">编辑</x-button>
            <x-button type="warn" :mini="true" style="float:right;margin-top:0px;margin-right:5px;" @click.native="deleteItem(index1)"> 删除该题</x-button>
          </div>
        </div>

        <!--滑块题-->
        <div v-if="val.type==4" style="margin-top:30px;margin-bottom:10px;">
          <!--编辑部分-->
          <div v-if="val.isEdit">
            {{index1+1}}<span style="float:right;" for="bitian" >滑块题&nbsp;&nbsp;
            <input type="checkbox" role="bitian"  v-model="val.ischoose"/>是否必填</span>
            <x-textarea title="问题" placeholder="请输入问题" v-model="val.question"></x-textarea>
            <!--  <x-input title="起始文字"  v-model="val.range.start" placeholder="请输入起始文字"></x-input>
              <x-input title="结束文字"  v-model="val.range.end" placeholder="请输入结束文字"></x-input>-->
            <x-input title="可选最小值" type="number" v-model="val.range.min" placeholder="请输入数字"></x-input>
            <x-input title="可选最大值" type="number" v-model="val.range.max" placeholder="请输入数字"></x-input>
            <x-input title="   步长" type="number" v-model="val.range.step" placeholder="请输入数字"></x-input>
          </div>

          <!--预览部分-->
          <div v-else>
            {{index1+1}}.{{val.question}}
            <group>
              <cell title="test">
                <range v-model="val.resultname" ></range>
              </cell>
            </group>

          </div>
          <div style="">
            <x-button type="primary"  :mini="true" style="float:right;" v-if="val.isEdit" @click.native="toggleEdit(index1,val)">完成</x-button>
            <x-button type="primary" :mini="true" v-else @click.native="toggleEdit(index1,val)" style="float:right;">编辑</x-button>
            <x-button type="warn" :mini="true" style="float:right;margin-top:0px;margin-right:5px;" @click.native="deleteItem(index1)"> 删除该题</x-button>
          </div>

        </div>
      </div>
      <!--题目部分结束-->
      <br/>
      <!--评分结果部分开始-->
      <group title="评分结果" >

        <!--编辑结果项-->
        <div v-if="results.isEdit==true">
          <div v-for="(val,index) in results.resultArray" style="margin-top:5px;border-bottom:1px dotted grey;">
            <x-input  placeholder="请输入结果项" v-model="val.resultItem" ></x-input>
            <x-button type="warn" :mini="true" style="float:right;margin-top:-36px;" @click.native="deleteResultItem(index)">x</x-button>
          </div>
          <x-button type="primary" :mini="true"  style="float:right;margin-top:5px;" @click.native="addResultItem()" v-if="results.isEdit==true">增加结果选项</x-button>
          <br/><br/>
        </div>
        <!--预览结果-->
        <div v-else>
          <div v-for="(val,index) in results.resultArray ">
            <div>{{val.resultItem}}</div>
          </div>
        </div>
      </group>

      <x-button type="primary" :mini="true" style="float:right;" @click.native="answerToggleEdit()" v-if="results.isEdit==true">完成</x-button>
      <x-button type="primary" :mini="true" style="float:right;" @click.native="answerToggleEdit()" v-else>编辑</x-button>


      <flexbox-item style="margin-top:40px;">
        <x-button type="primary" @click.native="handleClick">保存</x-button>
      </flexbox-item>
    </div>
  </div>

</template>

<script>
  //引入组件
  import {
    XHeader,
    Actionsheet,
    TransferDom,
    ButtonTab,
    ButtonTabItem,
    Cell,
    CellBox,
    CellFormPreview,
    Group,
    Badge,
    XButton,
    Flexbox,
    FlexboxItem,
    XTextarea,
    XInput,
    XProgress,
    XNumber,
    Sticky,
    Radio,
    Checklist,
    Range,
    AjaxPlugin,
    Toast

  } from 'vux';
  import Vue from 'vue';
  Vue.use(AjaxPlugin);//使用ajax
  //console.log(Vue.http);


  //创建构造器
  export default {
    components: {
      XHeader,
      Actionsheet,
      ButtonTab,
      ButtonTabItem,
      Badge,
      Group,
      Cell,
      XButton,
      Flexbox,
      FlexboxItem,
      XTextarea,
      XInput,
      XProgress,
      XNumber,
      Sticky,
      Radio,
      Checklist,
      Range,
      AjaxPlugin,
      Toast
    },

    directives: {
      TransferDom
    },
    data() {
      return {
        menus: {
          menu1: '添加单选题',
          menu2: '添加多选题',
          menu3: '添加问答题',
         /* menu4: '添加滑块题',*/
        },
        showMenus: false,
        subjects:[],
        results:{
          "isEdit":false,
          "resultArray":[{"resultItem":''}]
        },
        testNum:''

      }
    },
    methods:{
      addSubject:function(type){
        switch(type){
          case 1:
            var newSubject={
              "type":"1",
              "isEdit":true,
              "ischoose":false,
              "question":'',
              "answer":[],
              "resultname":''
            };
            this.subjects.push(newSubject);
            return;
          case 2:
            var newSubject={
              "type":"2",
              "isEdit":true,
              "ischoose":false,
              "question":'',
              "answer":[],
              "resultname":[]
            };
            this.subjects.push(newSubject);
            return;
          case 3:
            var newSubject={
              "type":"3",
              "isEdit":true,
              "ischoose":false,
              "question":'',
              "answer":[],
              "resultname":''
            };
            this.subjects.push(newSubject);
            return;
          case 4:
            var newSubject={
              "type":"4",
              "isEdit":true,
              "ischoose":false,
              "question":'',
              "answer":"",
              "resultname":0,
              "range":{
                "min":0,
                "max":0,
                "step":0,
                "start":'',
                "end":''
              }
            };
            this.subjects.push(newSubject);
            return;
        }
      },
      addAnswerItem:function(index){
        var newAnswer={
          "key":'',
          "value":'',
          "point":""
        };
        newAnswer.key=  //

          this.subjects[index].answer.push(newAnswer);
      },
      delAnswerItem:function(index1,index2){
        this.subjects[index1].answer.splice(index2,1);
      },
      deleteItem:function(index){
        this.subjects.splice(index,1);
      },
      toggleEdit:function(index1,val){
        if(val.isEdit){
          for(var j=0;j<val.answer.length;j++){
            if(val.answer.value==''){
              val.answer.splice(j,1);
            }
          }
          if(val.type==1||val.type==2){
            for(var i in val.answer){
              if(val.answer[i].point!='') {
                val.answer[i].value = val.answer[i].value + "(" + val.answer[i].point + "分)";
              }
            }
          }
          val.isEdit=false;
          //console.log(val.resultname);

        }
        else{
          if(val.type==1||val.type==2){
            for(var i in val.answer){
              val.answer[i].value=val.answer[i].value.replace(/(\d{1,3}分)/,'').replace("()","");//正则表达式\d{1,3},指数字有1-3位
            }
          }
          val.isEdit=true;
        }
      },
      addResultItem:function(){
        var newResult={
          "resultItem":''
        };
        this.results.resultArray.push(newResult);

      },
      deleteResultItem:function(index){
        this.results.resultArray.splice(index,1);
      },
      answerToggleEdit:function(){
        if(this.results.isEdit==true){
          this.results.isEdit=false;
        }
        else{
          this.results.isEdit=true;
        }

      },
      handleClick:function(){
        if(true) {
          var that = this;
          this.testNum = this.subjects.length;
          this.$http({
            url:'/inquiryquestionnaire/addFromWeb.action',
            type:'post',
            data: {
              questionnaireJson: JSON.stringify(that.$data),
              accountId: -1
            },
            dataType:"json",
            async:false
          }).then(function(response){
            var data=response.data;
            if(data.code==0){
              that.$vux.toast.show({
                text:"提交问卷成功！"
              });

            }
            else{
              that.$vux.toast.show({
                warn:"提交问卷失败！"
              });
            }
          }).catch(function(error){

            console.log("发生错误！");
            console.log(error);//hahah
            that.$vux.toast.show({
              text:"网络错误！"
            });
           /* window.location.href="/#/addStudyPlan";*/

          });
        }
      }
    }
    /*computed:{
        count1:function(){
          return this.count;
        }
      }*/
  }
</script>


