<template >
  <div id="app" style="min-width:1200px">
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
    <div class="hint-dialogs" v-if="showAlertCase">
      <el-card class="box-card">
        <div class="alert-case-title">
          <span>案件提醒</span>
          <el-button
            style="float: right; padding: 3px 0;"
            type="text"
            @click="showAlertCase=false"
          >收起</el-button>
        </div>
        <div class="alert-case-box">
          <div v-for="(item,index) in caseAlertAllList" :key="index" class="alert-case-text">
            <div v-if="item.alertType=='alertCase'">
            {{item.name}}案件将于
            <font color="red">{{item.trialDate}}</font>开庭
            </div>
            <div v-if="item.alertType=='collectionControl'">
                {{item.name}}案件将于
                <font color="red">{{item.collectionControl.time}}</font>收款
                <font color="red">{{item.collectionControl.money}}</font>元
            </div>
          </div>
          <div v-if="caseAlertAllList.length<=0">您暂时没有需要提醒的案件</div>
        </div>
      </el-card>
    </div>
    <div v-if="!showAlertCase" class="hidden-alert el-icon-bell" @click="showAlertCase=true"></div>
    <div style="height:1px;width:100%"></div>
  </div>
</template>

<script>
import Vue from "vue";
import NavMenu from "./components/NavMenu/NavMenu";
import { clearInterval, setInterval } from "timers";
export default {
  components: { NavMenu }, //注册组件
  methods: {
    // 合并收款监督以及案件时间提醒的方法
    mergeData(){
      this.alertCaseList.forEach((item)=>item.alertType='alertCase') //每个需要提醒案件增加提醒类型为开庭时间
      this.collectionControlList.forEach((item)=>{
        item.alertType = 'collectionControl'//每个案件对象增加提醒类型为收款监督
        let minDate = ''
        let collectionControl = {}//保存得到的最近的收款监督对象
        // 遍历数组得到最近的收款监督对象并赋值
        item.collectionControl.forEach((item2,index)=>{
          if (index==0) {
            minDate=new Date(item2.time).valueOf();
            collectionControl = item2;
          }else{
            let itemDate = new Date(item2.time).valueOf();
            if (itemDate<minDate) {
              minDate = itemDate
              collectionControl = item2;
            }
          }
        })
        item.collectionControl = collectionControl   
      })
      // 合并收款监督数组和案件开庭时间提醒数组，并用自定义排序方法排序
      this.caseAlertAllList = this.alertCaseList.concat(this.collectionControlList)
      this.caseAlertAllList.sort(this.alertSort)
      // 如果需要提醒的案件数量改变了,显示案件提醒
      if (this.caseAlertAllList.length <= 0) {
        this.showAlertCase = false;
      } else {
        if (this.caseAlertAllList.length != this.$store.state.caseAlertCount) {
          this.showAlertCase = true;
          this.$store.commit("setCaseAlertCount", this.caseAlertAllList.length);
        }
      }
    },
    // 数据合并之后对数组进行排序的方法
    alertSort(obj1,obj2){
      let time1 = obj1.alertType=='alertCase'?obj1.trialDate:obj1.collectionControl.time
      let time2 = obj2.alertType=='alertCase'?obj2.trialDate:obj2.collectionControl.time
      let timeDate1 = new Date(time1).valueOf()
      let timeDate2 = new Date(time2).valueOf()
      if (timeDate1<timeDate2) {
        return -1
      }else if (timeDate1>timeDate2) {
        return 1
      }else{
        // 如果时间相同的时候，开庭时间提醒在前面
        if (obj1.alertType == 'alertCase') {
          return -1
        }
        return 1
      }
    },
    // 请求接口获取案件收款监督数据
    async getCollectionControl() {
      let { data } = await axios({
        method: "post",
        url: PUB.domain +"/crossList?page=lawyer_case",
        data: {
          findJson: this.caseReceiptFindJson//请求接口并向数组传值
        }
      }).catch(() => {});
      this.collectionControlList = [];
      this.collectionControlList = data.list;//请求数据完成之后保存数据
      this.mergeData()//两个请求完毕之后开始合并数组
    },
    // 请求接口获取案件开庭时间提醒数据
    async getCaseList() {
      let { data } = await axios({
        method: "post",
        url: PUB.domain + "/crossList?page=lawyer_case",
        data: {
          sortJson: { trialDate: 1 },
          findJson: this.caseAlertFindJson//向接口传过滤的数据
        }
      }).catch(() => {});
      this.alertCaseList = [];//由于设置了定时器，所以需要先清空已保存的数据
      this.alertCaseList = data.list;//请求完毕之后将数据保存
      this.getCollectionControl();//请求接口获取案件收款监督数据
    },
    // 请求接口获取未读消息数据
    async getUnRead() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + "/crossList?page=lawyer_msg",
        data: {
          pageSize: 1000,
          findJson: {
            receiveMemberId: localStorage.userId,//未读消息数据根据登录的用户过来
            read: "0"
          }
        }
      });
      // 将数据保存到vuex保证实时响应
      if (data.list.length > 0) {
        this.$store.commit("setUnReadCount", data.list.length);
      } else {
        this.$store.commit("setUnReadCount", undefined);
      }
    },
    logout() {
      //退出登录函数
      localStorage.caseManageIsLogin = "0"; //登录状态设置为0
      localStorage.superAdmin = 0; //超级管理员登录状态为0
      localStorage.commonMerber = 0; //普通会员登录状态为0
      (localStorage.userId = ""), //登录会员的id状态为空
        (localStorage.loginUserName = null); //登录会员的用户名为空
      this.$router.push({ path: "/login" }); //跳转到manage
    },
    // 点击消息跳转消息也买你
    checkMsg() {
      this.$router.push({ path: "/message_datail" });//
    }
  },
  computed: {
    //计算属性
    unReadCount() {
      return this.$store.state.unReadCount;//vuex保存的未读消息数据
    },
    activeMenuIndex() {
      //
      //当前激活的菜单index
      return this.$store.state.activeMenuIndex; //从vuex的store里面读取值
    }
  },
  data() {
    return {
      caseReceiptFindJson:{},//请求收款监督接口所传数据
      caseAlertFindJson: {},//请求开庭时间提醒所传数据
      showAlertCase: true,//显示案件提醒key
      caseAlertAllList:[],//需要提醒的所有数据
      collectionControlList : [],//保存收款监督数据数组
      alertCaseList: [],//保存开庭时间提醒数据数组
      // 导航菜单列表
      navMenuList: [
        {
          //菜单
          index: "listHome",
          route: "/listHome",
          icon: "el-icon-house",
          title: "首页",
          show: true
        },

        {
          index: "2",
          icon: "el-icon-document",
          title: "案件",
          menuItem: [
            { index: "list_case", route: "/list_case", title: "案件列表" },
            { index: "list_remark", route: "/list_remark", title: "进展" },
            {
              index: "list_accessory",
              route: "/list_accessory",
              title: "附件列表"
            }
          ],
          show: true
        },
        {
          index: "list_member",
          route: "/list_member",
          icon: "el-icon-user-solid",
          title: "会员",
          show: true //通过控制来show来设置改导航是否显示
        },
        {
          index: "list_message",
          route: "/list_message",
          icon: "el-icon-s-comment",
          title: "消息",
          show: true
        }
      ]
    };
  },
  created() {
    //*引用当前用户名
    this.currentUserName = localStorage.loginUserName;
  },
  mounted() {
    // 获取当前时间
    let DataStart = new Date();
    let DataReceipEnd = DataStart.valueOf() + 7 * 24 * 60 * 60 * 1000;//获取7天后的时间
    let DataEnd = DataStart.valueOf() + 14 * 24 * 60 * 60 * 1000;//获取14天后的时间
    DataReceipEnd = new Date(DataReceipEnd)
    DataEnd = new Date(DataEnd);
    // 如果是普通会员登录,隐藏会员导航栏
    if (localStorage.superAdmin != 1) {
      this.navMenuList.forEach(doc => {
        if (doc.index == "list_member" || doc.index == "list_message") {
          doc.show = false;
        }
      });
      // 普通会员登录请求接口需要过滤与其过关的案件数据
      this.caseAlertFindJson = {
        $or: [
          { createPerson: localStorage.userId },
          { collaborator: localStorage.userId - 0 }
        ],
        trialDate: { $gte: DataStart, $lte: DataEnd }
      };
      this.caseReceiptFindJson = {
        $or: [
          { createPerson: localStorage.userId },
          { collaborator: localStorage.userId - 0 }
        ],
        "collectionControl.time": {
             "$gte": DataStart,
            "$lte": DataReceipEnd
          }
      }
     
    } else {
      // 超级会员登录可以直接提醒所有数据
      this.caseAlertFindJson = {
        trialDate: { $gte: DataStart, $lte: DataEnd }
      };
      this.caseReceiptFindJson = {
         "collectionControl.time": {
             "$gte": DataStart,
            "$lte": DataReceipEnd
          }
      }
      
    }
// 设置案件提醒定时器
      this.getCaseList();
      setInterval(() => {
        this.getCaseList();
      }, 20000);



    // 设置消息提醒定时器
    this.getUnRead();
    setInterval(() => {
      this.getUnRead();
    }, 20000);
  },
  beforeCreate() {}
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
.msg-alert {
  font-size: 25px;
  margin-right: 0px;
  margin-top: -3px;
  /* color: rgb(64, 158, 255); */
  cursor: pointer;
}
.hint-dialogs {
  position: fixed;
  bottom: 20px;
  right: 10px;
  z-index: 100;
  /* height: 300px; */
}
.alert-case-title {
  margin-bottom: 15px;
}
.alert-case-box {
   height: 140px;
  overflow: auto;
}
.box-card {
  width: 450px;
  height: 200px;
}
.alert-case-text {
  padding-top:5px;
  padding-left: 10px;
  line-height: 23px;
  border-bottom:1px solid rgb(230, 230, 230)
}
.hidden-alert {
  position: fixed;
  bottom: 180px;
  right: 0px;
  border-radius: 50%;
  background-color: black;
  opacity: 0.7;
  width: 40px;
  height: 40px;
  font-size: 25px;
  cursor: pointer;
  padding-top: 7px;
  padding-left: 7px;
  color: rgb(64, 158, 255);
  z-index: 100;
}
</style>

