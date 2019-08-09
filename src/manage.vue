<template>
  <div id="app" style>
    <el-container>
      <el-header class="MB10">
        <el-row>
          <div class="FL MT13 FS24 C_fff">案件管理系统</div>
          <div class="FR MT30 C_fff">
            <span class="el-icon-bell msg-alert" ref="msgAlert" @click="checkMsg"></span>
            <span class="MR10">当前登录用户:{{this. currentUserName}}</span>
            <a href="javascript:;" class="MR10" @click="logout">退出登录</a>
            <a target="_blank" href="javascript:;">官网首页</a>
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
    // //函数：{切换调试模式函数}
    // toggleDebug() {
    //   //来自vuex的当前行数据
    //   let debug = this.$store.state.debug;
    //   console.log("debug", debug);
    //   this.$store.commit("setDebug", !debug);

    // },
    logout() {
      //退出登录函数
      localStorage.isLogin = "0";
      localStorage.loginUserName = null;
      this.$router.push({ path: "/login" }); //跳转到manage
    },
    checkMsg(){
      this.newMsg = false;
      window.clearInterval(this.alertTime);
    },
    msgAlert(){
      if (this.$refs.msgAlert.style.color=='white') {
        this.$refs.msgAlert.style.color = 'rgb(64, 158, 255)'
      }else{
        this.$refs.msgAlert.style.color='white'
      }
    }
  },
  computed: {
    //计算属性

    activeMenuIndex() {
      //
      //当前激活的菜单index
      return this.$store.state.activeMenuIndex; //从vuex的store里面读取值
    }
  },
  data() {
    return {
      // 导航菜单列表
      alertTime:0,
      newMsg:true,
      navMenuList: [
        {
          //菜单
          index: "listHome",
          route: "/listHome",
          icon: "el-icon-house",
          title: "首页"
        },
        {
          index: "list_member",
          route: "/list_member",
          icon: "el-icon-user-solid",
          title: "会员",
          show:false
        },
        {
          index: "2",
          icon: "el-icon-document",
          title: "案件",
          menuItem: [
            { index: "list_case", route: "/list_case", title: "案件列表" },
            { index: "list_remark", route: "/list_remark", title: "备注" },
            { index: "list_accessory", route: "/list_accessory", title: "附件列表" }
          ]
        },
        {
          index: "list_message",
          route: "/list_message",
          icon: "el-icon-s-comment",
          title: "消息",
          show:false
        },
        
        {
          index: "4",
          icon: "el-icon-setting",
          title: "demo页面",
          menuItem: [
            {
              index: "dynamic_form_demo",
              route: "/dynamic_form_demo",
              title: "动态表单demo"
            },
            {
              index: "demo_common",
              route: "/demo_common",
              title: "普通组件demo"
            }
          ]
        }
      ]
    };
  },
  created() {
    //*引用当前用户名
    this.currentUserName = localStorage.loginUserName;
    document.onkeydown = e => {
      //绑定ctrl+D事件
      var keyCode = e.keyCode || e.which || e.charCode;
      var ctrlKey = e.ctrlKey || e.metaKey;
      if (ctrlKey && keyCode == 68) {
        console.log("ctrlKey", ctrlKey);
        console.log("keyCode", keyCode);
        // this.toggleDebug();//调用：{切换调试模式函数}

        let debug = this.$store.state.debug;
        console.log("debug", debug);
        this.$store.commit("setDebug", !debug);
        e.preventDefault(); //阻止默认事件
        return false;
      }
    };
  },
  mounted(){
    if(this.newMsg){
      this.$refs.msgAlert.style.color=='white'
        this.alertTime = setInterval(()=>{
      this.msgAlert()
      },300)}
    }
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
  margin-right: 10px;
  color: rgb(64, 158, 255);
  cursor: pointer;
}
</style>

