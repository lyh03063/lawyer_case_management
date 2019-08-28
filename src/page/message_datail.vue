<template>
  <div class>

    <h2 class="TAC MT20">消息详情</h2>
    <dm_debug_list>
      <dm_debug_item v-model="newMsgList" text="newMsgList"/>
   
    </dm_debug_list>
    <div v-if="newMsgList.length>0">
      <div>您有{{newMsgList.length}}条新消息：</div>
      <div v-for="(msg,index) in newMsgList" :key="index" class="new-msg-box">
        <div v-for="(item,index) in msg.change" :key="index" class="">


          <a  @click="showCaseDetail(msg.caseId)"   href="javascript:;" class="link-case">【{{msg.caseName?msg.caseName.name:''}}】</a>
          <template
            v-if="item.type==1"
          >修改了状态,&nbsp;&nbsp;状态从{{item.before}},&nbsp;&nbsp;变成{{item.after}}</template>
          <template
            v-if="item.type==2"
          >添加了新的备注,&nbsp;&nbsp;
          <!-- 备注的id是：{{item.remarkId}} -->
          </template>
          <template
            v-if="item.type==3"
          >上传了新的附件,&nbsp;&nbsp;
          <!-- 附件的id是：{{item.fileId}} -->
          </template>
        </div>
        <div
          class=" C_999"
        >操作人：{{msg.memberUser?msg.memberUser.user:''}},&nbsp;&nbsp;时间：{{msg.CreateTime}}</div>
      </div>
    </div>
    <div v-else>您没有新消息</div>


<!--xxx弹窗-->
    <el-dialog custom-class="n-el-dialog" width="90%" title="案件详情"   :close-on-press-escape="false"   :append-to-body="true"  v-bind:visible.sync="showCaseDialog" v-if="showCaseDialog">
  
  <case_detail_dialogs :caseMsg="detailData"></case_detail_dialogs>
  </el-dialog>
  

  </div>
</template>
<script>
import case_detail_dialogs from "@/components/case_detail_dialogs";
export default {
  components:{case_detail_dialogs},
  data() {
    return {
      showCaseDialog:false,//是否显示案件详情弹窗
      newMsgList: [], //保存新消息数据列表
      msgIdList: [], //保存新消息id列表
      detailData:{//案件详情
        aaa:1
      }
    };
  },

  methods: {
     // 
    async showCaseDetail(caseId) {//函数：{显示案件详情弹窗函数}


     let { data } = await axios({
          //请求接口
          method: "post",
          url: PUB.domain+"/crossDetail?page=lawyer_case",
          data: {
            id: caseId
          } //传递参数
        });
        this.detailData = data.Doc;
        this.showCaseDialog=true;
    },
    // 根据会员id或者其他index获取其name的方法，只请求一次接口
    async toName(populateCFEach) {
      let { page, populateColumn, idColumn, idColumn2 } = populateCFEach;
      this.newMsgList = await util.ajaxPopulate({
        listData: this.newMsgList,
        page,
        populateColumn,
        idColumn,
        idColumn2
      });
    },
    // 获取新消息数据列表  请求接口
    async getUnReadMsg() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + "/crossList?page=lawyer_msg",
        data: {
          pageSize: 1000,
          findJson: {
            receiveMemberId: localStorage.userId,
            read: "0"//未读
          }
        }
      });
      this.newMsgList = data.list;
      // 根据会员id以及 案件id获取 会员用户名以及案件名称
      this.toName({
        page: "lawyer_member",
        populateColumn: "memberUser",
        idColumn: "memberId",
        idColumn2: "P1"
      });
      this.toName({
        page: "lawyer_case",
        populateColumn: "caseName",
        idColumn: "caseId",
        idColumn2: "P1"
      });
      // 如果有新消息，保存所有新消息id
      if (this.newMsgList.length > 0) {
        this.newMsgList.forEach(msg => {
          this.msgIdList.push(msg.P1);
        });
        // 将所有新消息设置为已读
        this.modifyMsg();
      }
    },
    // 将新消息设置为已读的方法
    async modifyMsg() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + "/crossModify?page=lawyer_msg",
        data: {
          multi: true,
          findJson: {
            P1: { $in: this.msgIdList }
          },
          modifyJson: { read: 1 }
        }
      });
      // 将新消息数量保存到vuex中
      this.$store.commit("setUnReadCount", undefined);
    }
  },
  mounted() {
    // 页面加载完成之后获取新消息列表
    this.getUnReadMsg();
  }
};
</script>


<style scoped>
.new-msg-box {
  border: 1px solid #ddd;
  border-radius: 5px;
  line-height: 25px;
  padding: 10px;
  margin: 10px 0;
}

a.link-case{
  color: #06c;
}
</style>

