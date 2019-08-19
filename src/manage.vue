<template>
  <div id="app" style>
    <el-container>
      <el-header class="MB10">
        <el-row>
          <div class="FL MT13 FS24 C_fff">案件管理系统</div>
          <div class="FR MT30 C_fff">
            <el-badge :value="unReadCount" class="item">
            <span class="el-icon-message msg-alert" ref="msgAlert" @click="checkMsg"></span>
            </el-badge>
            <span class="MR10 ML20">当前登录用户：&nbsp;&nbsp;{{this. currentUserName}}</span>
            <a href="javascript:;" class="MR10" @click="logout" style="color:#fff">退出登录</a>
          </div>
        </el-row>
      </el-header>
    </el-container>
    <el-container>
      <NavMenu :cf="navMenuList"></NavMenu>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";
import NavMenu from "./components/NavMenu/NavMenu";
import { clearInterval } from 'timers';
export default {
  components: { NavMenu }, //注册组件
  methods: {
    async getUnRead(){
        let {data} = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + '/crossList?page=lawyer_msg',
        data: { 
          findJson:{
              receiveMemberId:localStorage.userId,
              read:'0'
          }} 
      });
      if (data.list.length>0) {
        this.$store.commit("setUnReadCount",data.list.length);
      }else{
      this.$store.commit("setUnReadCount",undefined);
      }
    },
    logout() {
      //退出登录函数
      localStorage.isLogin = "0";//登录状态设置为0
      localStorage.superAdmin = 0;//超级管理员登录状态为0
      localStorage.commonMerber=0;//普通会员登录状态为0
      localStorage.userId="",//登录会员的id状态为空
      localStorage.loginUserName = null;//登录会员的用户名为空
      this.$router.push({ path: "/login" }); //跳转到manage
    },
    checkMsg(){
      this.$router.push({ path: "/message_datail" });
    },

  },
  computed: {
    //计算属性
    unReadCount(){
      return this.$store.state.unReadCount;
    },
    activeMenuIndex() {
      //
      //当前激活的菜单index
      return this.$store.state.activeMenuIndex; //从vuex的store里面读取值
    }
  },
  data() {
    return {
      // 导航菜单列表
      navMenuList: [
        {
          //菜单
          index: "listHome",
          route: "/listHome",
          icon: "el-icon-house",
          title: "首页",
          show:true
        },
        
        {
          index: "2",
          icon: "el-icon-document",
          title: "案件",
          menuItem: [
            { index: "list_case", route: "/list_case", title: "案件列表" },
            { index: "list_remark", route: "/list_remark", title: "进展" },
            { index: "list_accessory", route: "/list_accessory", title: "附件列表" }
          ],
          show:true
        },
        {
          index: "list_member",
          route: "/list_member",
          icon: "el-icon-user-solid",
          title: "会员",
          show:true//通过控制来show来设置改导航是否显示
        },
        {
          index: "list_message",
          route: "/list_message",
          icon: "el-icon-s-comment",
          title: "消息",
          show:true
        },
        
        // {
        //   index: "4",
        //   icon: "el-icon-setting",
        //   title: "demo页面",
        //   menuItem: [
        //     {
        //       index: "dynamic_form_demo",
        //       route: "/dynamic_form_demo",
        //       title: "动态表单demo"
        //     },
        //     {
        //       index: "demo_common",
        //       route: "/demo_common",
        //       title: "普通组件demo"
        //     }
        //   ]
        // }
      ]
    };
  },
  created() {
    //*引用当前用户名
    this.currentUserName = localStorage.loginUserName;
    
  },
  mounted(){
    // 如果是普通会员登录,隐藏会员导航栏
    if (localStorage.commonMerber==1) {
      this.navMenuList.forEach((doc)=>{
        if (doc.index=='list_member'||doc.index=="list_message") {
          doc.show = false
        }
        
      })
    }
    this.getUnRead();
    },
     beforeCreate(){
    // 如果用户未登录，跳转登录页面
    if (localStorage.isLogin != 1) {
        this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style >
/* 单选框补丁 */
body .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
  -webkit-box-shadow: -1px 0 0 0 #e6a23c;
  box-shadow: -1px 0 0 0 #e6a23c;
}
.msg-alert{
  font-size: 25px;
  margin-right: 0px;
  margin-top: -3px;
  /* color: rgb(64, 158, 255); */
  cursor: pointer;
}
</style>

