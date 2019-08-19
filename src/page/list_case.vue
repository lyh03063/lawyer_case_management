<template>
  <div class>
    <listData :cf="cfList" @afterModify="modify">
      <template v-slot:customDetail="{detailData}">
        <!-- 自定义案件详情弹窗 -->
        <case_detail_dialogs :caseMsg="detailData"></case_detail_dialogs>
      </template>
      <template v-slot:slot_form_item_memberIdList="{formData}">
        <!-- 引入穿梭框组件，注意权限问题 如果是超级管理员，则可以修改,如果是案件负责人，可以修改  不是就只能读取-->
        <msgTransfer
          v-model="formData.collaborator"
          url="/crossList?page=lawyer_member"
          keyValue="name"
          v-if="superAdmin||userId==formData.createPerson"
          :showName="true"
        >
        </msgTransfer>
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
      </template> -->
    </listData>
  </div>
</template>
<script>
import listData from "@/components/list-data/list-data.vue";
import case_detail_dialogs from "@/components/case_detail_dialogs";
import msgTransfer from "../components/form_item/msg_transfer";
import select_ajax from "@/components/form_item/select_ajax.vue";
import id_to_name from "../components/id_to_name";
// import { async } from "q";

export default {
  components: {
    listData,
    case_detail_dialogs,
    msgTransfer,
    select_ajax,
    id_to_name
  },
  methods: {
    //  将案件状态转换成文字状态的方法
    caseStatusToname(status) {
      switch (status) {
        case 1:
          return "待立案";
          break;
        case 2:
          return "已立案待保全";
          break;
        case 3:
          return "已保全";
          break;
        case 4:
          return "待一审开庭";
          break;
        case 5:
          return "待二审开庭";
          break;
        case 6:
          return "调解中";
          break;
        case 7:
          return "收款监督";
          break;
        case 8:
          return "已结案";
          break;
        default:
          return "无";
          break;
      }
    },
    // 修改案件之后触发的回调方法
    modify(newdata, olddata) {
      // 如果案件状态改变的话，修改新消息数据，新消息变更类型,变更前后状态，发送消息的会员id，以及案件id
      if (newdata.status != olddata.status) {
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
    }
  },
  data() {
    return {
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
      cfList: {
        customDetail: true, //使用自定义详情插槽
        // col_span:240,
        listIndex: "list_case", //vuex对应的字段
        focusMenu: true, //进行菜单聚焦
        twoTitle: "案件",
        threeTitle: "案件列表",
        flag: true,
        formDataAddInit:{//新增表单的初始数据
          createPerson: Number(localStorage.userId)
        },
        dynamicDict: [
          {
            page: "lawyer_member",
            populateColumn: "createUser",
            idColumn: "createPerson",
            idColumn2: "P1"
          },
          {
            page: "lawyer_member",
            populateColumn: "collaboratorName",
            idColumn: "collaborator",
            idColumn2: "P1"
          }
        ],
        url: {
          list: "/crossList?page=lawyer_case", //列表接口
          add: "/crossAdd?page=lawyer_case", //新增接口
          modify: "/crossModify?page=lawyer_case", //修改接口
          detail: "/crossDetail?page=lawyer_case", //详情接口
          delete: "/crossDelete?page=lawyer_case" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "案件名称",
            prop: "name",
            width:250
          },
          // {
          //   label: "案件描述",
          //   prop: "description",
          //   width: 150
          // },
          {
            label: "案号",
            prop: "caseId",
            width: 70
          },
          {
            label: "案件状态",
            prop: "status",
            width: 120,
            formatter: function(rowData) {
              switch (rowData.status) {
                case 1:
                  return "待立案";
                  break;
                case 2:
                  return "已立案待保全";
                  break;
                case 3:
                  return "已保全";
                  break;
                case 4:
                  return "待一审开庭";
                  break;
                case 5:
                  return "待二审开庭";
                  break;
                case 6:
                  return "调解中";
                  break;
                case 7:
                  return "收款监督";
                  break;
                case 8:
                  return "已结案";
                  break;
                default:
                  return "无";
                  break;
              }
            }
          },
          {
            label: "创建人",
            prop: "createPerson",
            width: 100,
            formatter: data => {
              if (data.createUser) {
                return data.createUser.name;
              }
            }
          },
          {
            label: "协作者",
            prop: "collaborator",
            width: 150,
            formatter: data => {
              if (data.collaboratorName) {
                let collaboratorList = [];
                data.collaboratorName.forEach(element => {
                  collaboratorList.push(element.name);
                });

                return collaboratorList.join();
              }
            }
          }
          // {
          //   label: "诉讼费",
          //   prop: "litigationFee",
          //   width: 100
          // },
          // {
          //   label: "担保费",
          //   prop: "guaranteeFee",
          //   width: 100
          // },
          // {
          //   label: "保全费",
          //   prop: "insuranceFee",
          //   width: 100
          // }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "案号",
            prop: "caseId"
          },
          {
            label: "案件名称",
            prop: "name",
            type: "input_find_vague"
          }
        ],
        //-------详情字段数组-------

        //-------新增、修改表单字段数组-------
        formItems: [
          // {
          //   label: "创建人",
          //   prop: "createPerson",
          //   type: "select",
          //   slot: "slot_form_item_createPerson"
          // },
          {
            label: "案件名称",
            prop: "name",
            rules: [{ required: true, message: "案件名称不能为空" }]
          },
          {
            label: "协作者",
            prop: "collaborator",
            // type: "jsonEditor",
            slot: "slot_form_item_memberIdList"
          },
          
          {
            label: "案号",
            prop: "caseId"
          },
          {
            label: "描述",
            prop: "description",
            type: "textarea"
          },
          {
            label: "状态",
            prop: "status",
            type: "select",
            default: 1,
            options: [
              { value: 1, label: "待立案" },
              { value: 2, label: "已立案待保全" },
              { value: 3, label: "已保全" },
              { value: 4, label: "待一审开庭" },
              { value: 5, label: "待二审开庭" },
              { value: 6, label: "调解中" },
              { value: 7, label: "收款监督" },
              { value: 8, label: "已结案" }
            ]
          },
          {
            label: "诉讼费",
            prop: "litigationFee"
          },
          {
            label: "担保费",
            prop: "guaranteeFee"
          },
          {
            label: "保全费",
            prop: "insuranceFee"
          },
          {
            label: "原告信息",
            prop: "plaintiffInfo",
            default: {}, //默认值必须要有，否则新增的时候会出问题
            cfForm: {
              col_span: 12,
              formItems: [
                {
                  label: "单位名称",
                  prop: "company"
                },
                {
                  label: "联系人信息",
                  prop: "contact"
                }
              ]
            }
          },
          {
            label: "被告信息",
            prop: "defendantInfo",
            default: {}, //默认值必须要有，否则新增的时候会出问题
            cfForm: {
              col_span: 12,
              formItems: [
                {
                  label: "单位名称",
                  prop: "company"
                },
                {
                  label: "联系人信息",
                  prop: "contact"
                }
              ]
            }
          },
          {
            label: "一审信息",
            prop: "firstInstanceInfo",
            default: {}, //默认值必须要有，否则新增的时候会出问题
            cfForm: {
              col_span: 12,
              formItems: [
                {
                  label: "单位",
                  prop: "company"
                },
                {
                  label: "案号",
                  prop: "caseId"
                },
                {
                  label: "承办人",
                  prop: "person"
                },
                {
                  label: "联系电话",
                  prop: "phone"
                }
              ]
            }
          },
          {
            label: "诉保信息",
            prop: "guaranteeInfo",
            default: {}, //默认值必须要有，否则新增的时候会出问题
            cfForm: {
              col_span: 12,
              formItems: [
                {
                  label: "单位",
                  prop: "company"
                },

                {
                  label: "承办人",
                  prop: "person"
                },
                {
                  label: "联系电话",
                  prop: "phone"
                }
              ]
            }
          },
          {
            label: "二审信息",
            prop: "secondInstanceInfo",
            default: {}, //默认值必须要有，否则新增的时候会出问题
            cfForm: {
              col_span: 12,
              formItems: [
                {
                  label: "单位",
                  prop: "company"
                },
                {
                  label: "案号",
                  prop: "caseId"
                },
                {
                  label: "承办人",
                  prop: "person"
                },
                {
                  label: "联系电话",
                  prop: "phone"
                }
              ]
            }
          },
          {
            label: "执行信息",
            prop: "executionInfo",
            default: {}, //默认值必须要有，否则新增的时候会出问题
            cfForm: {
              col_span: 12,
              formItems: [
                {
                  label: "单位",
                  prop: "company"
                },
                {
                  label: "案号",
                  prop: "caseId"
                },
                {
                  label: "承办人",
                  prop: "person"
                },
                {
                  label: "联系电话",
                  prop: "phone"
                }
              ]
            }
          }
        ]
      }
    };
  },

  mounted() {
    // 如果是超级管理员登录，那么可以修改所有案件负责人以及协作者
    if ((localStorage.superAdmin = 1)) {
      this.superAdmin = true;
    }
  }
};
</script>


<style>
</style>
