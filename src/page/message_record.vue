<template>
  <div class>

    <h2 class="TAC MT20">消息记录</h2>
    <dm_debug_list>
      <dm_debug_item v-model="newMsgList" text="newMsgList"/>
   
    </dm_debug_list>
    <div v-if="newMsgList.length>0">
      <!-- <div>您有{{newMsgList.length}}条新消息：<span style="margin-left:88%">历史消息&nbsp;&nbsp;>></span></div> -->
      <div v-for="(msg,index) in newMsgList" :key="index" class="new-msg-box">
        <div v-for="(item,index) in msg.change" :key="index" class="">


          <a  @click="showCaseDetail(msg.caseId)"   href="javascript:;" class="link-case">【{{msg.caseName?msg.caseName.name:''}}】</a>
          <template
            v-if="item.type==1"
          >修改了状态,&nbsp;&nbsp;状态从{{item.before}},&nbsp;&nbsp;变成{{item.after}}</template>
          <template
            v-if="item.type==2"
          >添加了新的进展,&nbsp;&nbsp;进展的内容：{{msg.remark?msg.remark.content:'该进展已经被删除'}}
          </template>
          <template
            v-if="item.type==3"
          >上传了新的附件：&nbsp;&nbsp;
          <span v-if="msg.file"><a class="link-blue" target="_blank" :href="msg.file.url[0].url">{{msg.file.name}} </a></span>
          <span v-else>该附件已经被删除</span>
          <!-- 附件的id是：{{item.fileId}} -->
          </template>
        </div>
        <div
          class=" C_999"
        >操作人：{{msg.memberUser?msg.memberUser.user:''}},&nbsp;&nbsp;时间：{{msg.CreateTime?msg.CreateTime:''}}</div>
      </div>
    </div>
    <el-pagination
    @size-change="modifyPageSize"
    :page-size="pageSize"
    :current-page="pageIndex"
    @current-change="getUnReadMsg"
    :page-sizes="[5, 10, 20, 50,100]"
  background
  layout="prev, pager, next,sizes"
  :total="pageCount*10">
</el-pagination>
    <!-- <div v-else>您没有新消息</div> -->


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
      },
      pageCount:1,
      pageIndex:1,
      pageSize:10
    };
  },

  methods: {
    //   修改每页条数
      modifyPageSize(val){
          this.pageSize = val
          this.getUnReadMsg()
      },
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
          pageSize: this.pageSize,
          pageIndex:this.pageIndex,
          findJson: {
            receiveMemberId: localStorage.userId,
            // read: "0"//未读
          }
        }
      });
      this.newMsgList = data.list;
      this.pageCount = data.page.pageCount
      this.newMsgList.forEach((item)=>{
        item.remarkId = item.change[0].remarkId==''? 0:item.change[0].remarkId
        item.fileId  = item.change[0].fileId==''?0:item.change[0].fileId
      })
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
      this.toName({
        page: "lawyer_remark",
        populateColumn: 'remark',
        idColumn: 'remarkId',
        idColumn2: "P1"
      });
      this.toName({
        page: "lawyer_file",
        populateColumn: 'file',
        idColumn: 'fileId',
        idColumn2: "P1"
      });
      // 如果有新消息，保存所有新消息id
      if (this.newMsgList.length > 0) {
        this.newMsgList.forEach(msg => {
          this.msgIdList.push(msg.P1);
        });
      }
    },
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

