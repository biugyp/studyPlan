import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import addStudyPlan from '@/components/addStudyPlan'
import evaluate from '@/components/evaluate'
import self from '@/components/self'
import studyRecord from '@/components/studyRecord'


Vue.use(Router)//全局安装路由功能

//创建路由对象，定义路径
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/addStudyPlan',
      name: 'addStudyPlan',
      component: addStudyPlan
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: evaluate

    },
    {
      path: '/self',
      name: 'self',
      component: self
    },
    {
      path: '/studyRecord',
      name: 'studyRecord',
      component: studyRecord
    }
  ]
});
