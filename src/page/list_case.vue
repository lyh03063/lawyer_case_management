<template>
  <div class="out hide_slect_all">
    <dm_list_data :cf="cfList" @after-modify="modify" ref="caseUnprocess" v-if="initialize">
      <template v-slot:customDetail="{detailData}">
        <!-- 自定义案件详情弹窗 -->
        <case_detail_dialogs :caseMsg="detailData"></case_detail_dialogs>
      </template>
      <!-- 列表状态修改插槽 -->
      <template v-slot:slot_columns_item_status="{row}">
        <modify_case_status :status="row.status" :case="row" @getDataList="getDataList"></modify_case_status>
      </template>
      <template v-slot:slot_form_item_memberIdList="{formData}">
        <!-- 引入穿梭框组件，注意权限问题 如果是超级管理员，则可以修改,如果是案件负责人，可以修改  不是就只能读取-->
        <msgTransfer
          v-model="formData.collaborator"
          url="/crossList?page=lawyer_member"
          keyValue="name"
          v-if="superAdmin||userId==formData.createPerson"
          :findJson="{ P1: { '$ne': localStorage.userId }}"
          :showName="true"
        ></msgTransfer>
        <div v-else>
          <id_to_name
            url="/crossList?page=lawyer_member"
            v-model="formData.collaborator"
            keyValue="user"
          ></id_to_name>
        </div>
      </template>
      <!--主办律师穿梭框插槽-->
      <template v-slot:slot_form_item_personInCharge="{formData}">
        <!-- 引入穿梭框组件，注意权限问题 如果是超级管理员，则可以修改,如果是案件负责人，可以修改  不是就只能读取-->
        <msgTransfer
          v-model="formData.personInCharge"
          url="/crossList?page=lawyer_member"
          keyValue="name"
          v-if="superAdmin||userId==formData.createPerson"
          :showName="true"
        ></msgTransfer>
        <div v-else>
          <id_to_name
            url="/crossList?page=lawyer_member"
            v-model="formData.personInCharge"
            keyValue="user"
          ></id_to_name>
        </div>
      </template>
    </dm_list_data>
  </div>
</template>
<script>


import case_detail_dialogs from "@/components/case_detail_dialogs";
import msgTransfer from "../components/form_item/msg_transfer";
import select_ajax from "@/components/form_item/select_ajax.vue";
import id_to_name from "../components/id_to_name";
import modify_case_status from "@/components/modify_case_status";


export default {
  components: {
    case_detail_dialogs,
    msgTransfer,
    select_ajax,
    id_to_name,
    modify_case_status
  },


  data() {

    let { type = "unprocess" } = this.$route.query;//类型参数

    return {
      localStorage:window.localStorage,
      initialize: false,//是否开始初始化key
      // 新消息对象的默认状态
      addMsgData: {
        read: 0,
        change: [{ type: "", before: "", after: "" }],
        memberId: "",
        caseId: "",
        receiveMemberId: ""
      },
      addMsglist: [], //保存每个新消息对象的数组
      userId: localStorage.userId, //保存当前用户登录的id
      superAdmin: false, //是否是超级超级员登录

      cfList: lodash.cloneDeep(PUB.listCF[`list_case_${type}`])//深拷贝
    };
  },

  methods: {
    // 获取地区数据的方法
    async getAreaList() {
      let { data } = await axios({
        method: "post",
        url: PUB.domain + "/crossList?page=lawyer_area",
        data: {
          findJson: {}
        }
      }).catch(() => { });
      let areaList = data.list.map(item => {
        let obj = { value: item.P1, text: item.name }
        return obj
      })
      console.log('areaList', areaList);

      return areaList
    },
    // 刷新列表的方法
    getDataList(nowData, oldData) {
      this.$refs.caseUnprocess.getDataList()
      this.modify(nowData, oldData)
      // console.log(nowData,oldData);

    },
    //  将案件状态转换成文字状态的方法
    caseStatusToname(status) {
      return dictCaseStatus[status].label;

    },
    // 修改案件之后触发的回调方法
    modify(newdata, olddata) {


      // 如果案件状态改变的话，修改新消息数据，新消息变更类型,变更前后状态，发送消息的会员id，以及案件id
      if (newdata.status != olddata.status) {
        // console.log(newdata, olddata);
        this.addMsgData.change[0].type = 1;
        this.addMsgData.change[0].before = this.caseStatusToname(
          olddata.status
        );
        this.addMsgData.change[0].after = this.caseStatusToname(newdata.status);
        this.addMsgData.memberId = localStorage.userId;
        this.addMsgData.caseId = newdata.P1;
        // 如果案件有协作者，当协作者不是发送消息的或者不是负责人，就为其发送消息
        // 每个消息对象保存在addMsglist中
        if (newdata.collaborator) {
          newdata.collaborator.forEach(memberId => {
            if (memberId != this.addMsgData.memberId) {
              if (memberId != newdata.createPerson) {
                this.addMsgData.receiveMemberId = memberId;
                let addData = JSON.parse(JSON.stringify(this.addMsgData));
                this.addMsglist.push(addData);
              }
            }
            //  如果案件的负责人不是消息的发送人,就为其发送消息
            if (newdata.createPerson != this.addMsgData.memberId) {
              this.addMsgData.receiveMemberId = newdata.createPerson;
              let addData = JSON.parse(JSON.stringify(this.addMsgData));
              this.addMsglist.push(addData);
            }
          });
        }
        // 新增消息的方法
        this.addMsg();//调用：{新增消息函数}
          this.addProgress({caseId:newdata.P1,content:`将案件进展设置为${this.caseStatusToname(newdata.status)}`});//调用：{新增消息函数}

      }
    },
    // TODO://函数：{新增进展函数}
    async addProgress({caseId,content}) {

      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + "/crossAdd?page=lawyer_remark",
        data: { data: {caseId,"memberId":localStorage.userId,content} } //所有新消息对象传递给接口
      });
      this.addMsglist = []//发送完清空数组，避免切换状态时消息一直堆叠-刘咏辉20200603修改
    },
    // 调用接口，新增消息
    async addMsg() {

      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + "/crossAdd?page=lawyer_msg",
        data: { data: this.addMsglist } //所有新消息对象传递给接口
      });
      this.addMsglist = []//发送完清空数组，避免切换状态时消息一直堆叠-刘咏辉20200603修改
    }
  },


  async created() {
    let areaList = await this.getAreaList()
    this.cfList.columns.forEach(item => {
      if (item.prop == "areaId") {
        item.filters = areaList

      }
    })

    if (localStorage.superAdmin == 1) {// Q1：如果是超级管理员登录，那么可以修改所有案件负责人以及协作者
      this.superAdmin = true;
    } else {// Q2：非超级管理员,加入特殊过滤条件
      //去掉删除按钮
      this.cfList.singleBtns = {
        addon: [
          util.cfList.sBtns.detail, util.cfList.sBtns.modify,
        ]
      }
      //去掉批量删除按钮
      this.cfList.batchBtns = {
        addon: [
          util.cfList.bBtns.add,

        ]
      }

      let findJsonOld = lodash.cloneDeep(this.cfList.findJsonDefault);//原来的查询条件
      this.cfList.findJsonDefault = {
        $and: [{
          "$or": [
            { createPerson: localStorage.userId },
            { collaborator: localStorage.userId - 0 },
          ]
        },
          findJsonOld,//原来的查询条件
        ]
      };
    }

    this.initialize = true
  },
  mounted() {


  }
};
</script>
<style scoped>


.out >>> .TAC .cell{
  text-align: center;
}
</style>

<style>
/* 隐藏全选按钮 */
.hide_slect_all  .n-table-head .el-table-column--selection .cell {
    display: none !important;
}
</style>
