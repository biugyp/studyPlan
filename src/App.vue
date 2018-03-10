<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->

   <!-- <loading v-model="isLoading" text="页面加载中"></loading>-->
    <router-view></router-view><!--在根组件中使用<router-view>渲染组件-->
  </div>
</template>

<script>
  import { Loading } from 'vux'
  import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    Loading
  },
 /* data(){
    return {
      isLoading: "页面加载中。。。"
    }
  },*/
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 /* text-align: center;*/
  color: #2c3e50;
 /* margin-top: 60px;*/
}
body {
  background-color: #fbf9fe;/*整体背景色*/
}
</style>
