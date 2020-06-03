<template>
  <div class>
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
      <!-- <template v-slot:slot_form_item_createPerson="{formData}">
        <select_ajax
          class
          v-model="formData.createPerson"
          keyLabel="name"
          keyValue="P1"
          ajaxUrl="/crossList?page=lawyer_member"
          v-if="superAdmin||userId==formData.createPerson"
        ></select_ajax>
        <div v-else>
          <id_to_name
            url="/crossList?page=lawyer_member"
            v-model="formData.createPerson"
            keyValue="user"
          ></id_to_name>
        </div>
      </template>-->
    </dm_list_data>
  </div>
</template>
<script>
// let arrCaseStatus = [
//   { value: 1, label: "待立案" },
//   { value: 2, label: "已立案待保全" },
//   { value: 3, label: "已保全" },
//   { value: 4, label: "待一审开庭" },
//   { value: 5, label: "待二审开庭" },
//   { value: 6, label: "调解中" },
//   { value: 7, label: "收款监督" },
//   { value: 8, label: "已结案" },
//   { value: 9, label: "执行中" },
//   { value: 10, label: "执行终本" }
// ];

// var dictCaseStatus = lodash.keyBy(arrCaseStatus, "value");

import case_detail_dialogs from "@/components/case_detail_dialogs";
import msgTransfer from "../components/form_item/msg_transfer";
import select_ajax from "@/components/form_item/select_ajax.vue";
import id_to_name from "../components/id_to_name";
import modify_case_status from "@/components/modify_case_status";
// import { async } from "q";

export default {
  components: {
    case_detail_dialogs,
    msgTransfer,
    select_ajax,
    id_to_name,
    modify_case_status
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
      // switch (status) {
      //   case 1:
      //     return "待立案";
      //     break;
      //   case 2:
      //     return "已立案待保全";
      //     break;
      //   case 3:
      //     return "已保全";
      //     break;
      //   case 4:
      //     return "待一审开庭";
      //     break;
      //   case 5:
      //     return "待二审开庭";
      //     break;
      //   case 6:
      //     return "调解中";
      //     break;
      //   case 7:
      //     return "收款监督";
      //     break;
      //   case 8:
      //     return "已结案";
      //     break;
      //   case 9:
      //     return "执行中";
      //     break;
      //   case 10:
      //     return "执行终本";
      //     break;
      //   default:
      //     return "无";
      //     break;
      // }
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
        this.addMsg();
      }
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
  data() {
    return {
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

      cfList: lodash.cloneDeep(PUB.listCF.list_case_unprocess)//深拷贝
    };
  },

  async created() {
    let areaList = await this.getAreaList()
    this.cfList.columns.forEach(item => {
      if (item.prop == "areaId") {
        item.filters = areaList

      }
    })
    // 如果是超级管理员登录，那么可以修改所有案件负责人以及协作者
    if (localStorage.superAdmin == 1) {
      this.superAdmin = true;
    }
    if (localStorage.superAdmin != 1) {
      this.cfList.findJsonDefault = {
        $and: [{          "$or": [
            { createPerson: localStorage.userId },
            { collaborator: localStorage.userId - 0 },
          ]        },
        { $nor: [{ status: 8 }, { status: 15 }] },
        ]
      };
    }
    this.initialize = true
  },
  mounted() {
    console.log('aaa', this.cfList);

  }
};
</script>


<style>
</style>
