

Vue.config.productionTip = false
import lodash from 'lodash'//导入lodash方法库
window.lodash = lodash
Vue.prototype.$lodash = lodash//让vue实例中可访问$lodash
import axios from "axios";
window.axios = axios;
import ajax from "@/assets/js/ajax.js";
window.ajax = ajax;
import moment from "moment";
window.moment = moment;
import config from '@/assets/js/config.js'

// import Vue from 'vue'
// Vue.config.productionTip = false

// import lodash from 'lodash'//导入lodash方法库
// window.lodash=lodash
// Vue.prototype.$lodash = lodash//让vue实例中可访问$store

// import axios from "axios";
// window.axios = axios;

// import ajax from "@/assets/js/ajax.js";
// window.ajax = ajax;
// import util from "@/assets/js/util.js";
// window.util=util;



// import moment from "moment";
// window.moment = moment; 
// import  "./assets/js/mix.js";//注意位置要提前



// import dm_components from "dmagic-components";
// Vue.use(dm_components);




import space from './components/space/index.js';   //默认情况下找的是index文件
Vue.use(space);   //必须有install
import debug_list from './components/common/debug_list/index.js';   //导入debug_list
Vue.use(debug_list);   //作为全局组件，必须有install
import debug_item from './components/common/debug_item/index.js';   //导入debug_item
Vue.use(debug_item);   //作为全局组件，必须有install
import ajax_populate from './components/common/ajax_populate/index.js';   //导入ajax_populate
Vue.use(ajax_populate);   //作为全局组件，必须有install
import loading from './components/common/loading/index.js';   //导入loading
Vue.use(loading);   //作为全局组件，必须有install



// import VueRouter from 'vue-router'
Vue.use(VueRouter)






// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login',
     component: resolve => require(['@/login'],resolve),},
    {
      path: '/manage',
      component:resolve => require(['@/manage'],resolve),
      redirect: '/listHome', //跳转
      children: [//子路由
      
        {
          path: '/list_member',
          component:resolve => require(['@/page/list_member'],resolve),
        },
       
        {
          path: '/listHome',
          component:resolve => require(['@/page/listHome'],resolve),
        },
       
        {
          path: '/dynamic_form_demo',
          component:resolve => require(['@/page/dynamic_form_demo'],resolve),
        },
        {
          path: '/demo_common',
          component:resolve => require(['@/demo/common.vue'],resolve),
        },
        {
          path: '/list_area',
          component:resolve => require(['@/page/list_area.vue'],resolve),
        },
        {
          path: '/list_case_reason',
          component:resolve => require(['@/page/list_case_reason.vue'],resolve),
        },
        {
          path: '/list_case_unprocess',
          component:resolve => require(['@/page/list_case_unprocess'],resolve),
        },
        {
          path: '/list_case_end',
          component:resolve => require(['@/page/list_case_end'],resolve),
        },
        {
          path: '/list_remark',
          component:resolve => require(['@/page/list_remark'],resolve),
        },
        {
          path: '/list_message',
          component:resolve => require(['@/page/list_message'],resolve),
        },
        {
          path: '/list_accessory',
          component:resolve => require(['@/page/list_accessory'],resolve),
        },
        {
          path: '/message_datail',
          component:resolve => require(['@/page/message_datail'],resolve),
        },
        {
          path: '/message_record',
          component:resolve => require(['@/page/message_record'],resolve),
        },
        
      ]
    },
  ]
})

router.beforeEach((to,from,next)=>{
  // 如果用户未登录，跳转登录页面
  if (localStorage.caseManageIsLogin != 1) {
    if (to.path=='/login') {
      next();
    }else{
    next('/login');
  }
  }else{
    next();
  }
})




// import Vuex from 'vuex'//导入vuex模块
// Vue.use(Vuex)//应用组件

const store = new Vuex.Store({//定义Vuex的存储对象
  state: {
    caseAlertCount:0,
    unReadCount:undefined,
    debug:false,
    activeMenuIndex: "",//当前激活的菜单index
    listState: {//存放列表的共享状态，

    }, 
    defultFindJson: {//存放列表的默认查询参数，
      // list_article:{articleCategory:3  }

    },   
  },
 
  mutations: {//变更事件
    setDebug(state, param) {//设置debug模式
      state.debug= param;
    },
    setCaseAlertCount(state,count){
      state.caseAlertCount = count
    },
    setUnReadCount(state,count){
      state.unReadCount = count
    },
    setListFindJson(state, param) {//设置列表的初始筛选参数值
      state.defultFindJson[param.listIndex] = param.findJson;
      //对listState进行整个对象的变更（深拷贝），因为listState是有注册的，可以触发响应
      let str = JSON.stringify(state.defultFindJson)//对象转换成字符串
      state.defultFindJson = JSON.parse(str)//字符串转换成对象
    },

    initListState(state, param) {//改变列表的初始状态值
      state.listState[param.listIndex] = param.objState;
      //对listState进行整个对象的变更（深拷贝），因为listState是有注册的，可以触发响应
      let str = JSON.stringify(state.listState)//对象转换成字符串
      state.listState = JSON.parse(str)//字符串转换成对象
    },
    changeActiveMenu(state, activeMenuIndex) {//改变聚焦菜单
      state.activeMenuIndex = activeMenuIndex
    },
    openDialogAdd(state, listIndex) {//打开新增弹窗事件
      state.listState[listIndex].isShowDialogAdd = true;
    },
    closeDialogAdd(state, listIndex) {//关闭新增弹窗事件
      state.listState[listIndex].isShowDialogAdd = false;
    },
    openDialogDetail(state, param) {//打开详情弹窗事件
      state.listState[param.listIndex].isShowDialogDetail = true;
      // state.listState[param.listIndex].tableDataDetail.forEach(doc => {
      //   //遍历详情弹窗的表格数据
      //   doc.itemValue = param.row[doc.field]; //修改itemValue
      // });
      state.listState[param.listIndex].row = param.row;//将行数据保存到vuex
    },
    closeDialogDetail(state, listIndex) {//关闭详情弹窗事件
      state.listState[listIndex].isShowDialogDetail = false;
    },
  }
})

Vue.prototype.$store = store//让vue实例中可访问$store
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI);


import Main from './main.vue'
new Vue({
  render: h => h(Main),
  router,
}).$mount('#app')