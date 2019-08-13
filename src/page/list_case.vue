<template>
  <div class>
    <listData :cf="cfList">
      <template v-slot:slot_item_columns_createPerson="{row}">
        <id_to_name v-model="row.createPerson" url="/crossList?page=lawyer_member" keyValue="user"></id_to_name>
      </template>
      <template v-slot:slot_item_columns_collaborator="{row}">
        <id_to_name v-model="row.collaborator" url="/crossList?page=lawyer_member" keyValue="user"></id_to_name>
      </template>
      <template v-slot:customDetail="{detailData}">
        <case_detail_dialogs :caseMsg="detailData"></case_detail_dialogs>
      </template>
      <template v-slot:slot_form_item_memberIdList="{formData}">
        <msgTransfer
          v-model="formData.collaborator"
          url="/crossList?page=lawyer_member"
          keyValue="name"
          v-if="userId==''||userId==formData.P1"
        ></msgTransfer>
        <div v-else>
          <id_to_name v-model="formData.collaborator" url="/crossList?page=lawyer_member" keyValue="user"></id_to_name></div>
      </template>
      <template v-slot:slot_form_item_createPerson="{formData}">
        <select_ajax
          class
          v-model="formData.createPerson"
          keyLabel="name"
          keyValue="P1"
          ajaxUrl="/crossList?page=lawyer_member"
          v-if="userId==''||userId==formData.P1"
        ></select_ajax>
        <div v-else>
          <id_to_name v-model="formData.createPerson" url="/crossList?page=lawyer_member" keyValue="user"></id_to_name>
        </div>
      </template>
    </listData>
  </div>
</template>
<script>
import listData from "@/components/list-data/list-data.vue";
import case_detail_dialogs from "@/components/case_detail_dialogs";
import id_to_name from "@/components/id_to_name";
import msgTransfer from "../components/form_item/msg_transfer";
import select_ajax from "@/components/form_item/select_ajax.vue";

export default {
  components: { listData, case_detail_dialogs, msgTransfer,select_ajax ,id_to_name},
  data() {
    return {
      userId: localStorage.userId,
      cfList: {
        customDetail: true, //使用自定义详情插槽
        // col_span:240,
        listIndex: "list_case", //vuex对应的字段
        focusMenu: true, //进行菜单聚焦
        twoTitle: "案件",
        threeTitle: "案件列表",
        flag: true,
        dynamicDict: [{ page: "crossList?page=lawyer_member",populateColumn: "memberUser", idColumn: "createPerson", idColumn2: "P1" }],
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
            width: 90
          },
          {
            label: "案件描述",
            prop: "description",
            width: 150
          },
          {
            label: "案号",
            prop: "caseId",
            width: 70
          },
          {
            label: "案件状态",
            prop: "status",
            width: 120,
            formatter: rowdata => {
              switch (rowdata.status) {
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
            label: "创建人id",
            prop: "memberUser",
            width: 100,
          },
          {
            label: "协作者id数组",
            prop: "collaborator",
            width: 150,
            // slot:'slot_item_columns_collaborator'
          },
          {
            label: "诉讼费",
            prop: "litigationFee",
            width: 100
          },
          {
            label: "担保费",
            prop: "guaranteeFee",
            width: 100
          },
          {
            label: "保全费",
            prop: "insuranceFee",
            width: 100
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "案件名称",
            prop: "name",
            type: "input_find_vague"
          }
        ],
        //-------详情字段数组-------

        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "创建人id",
            prop: "createPerson",
            type: "select",
            slot: "slot_form_item_createPerson"
          },
          {
            label: "协作者id数组",
            prop: "collaborator",
            type: "jsonEditor",
            slot: "slot_form_item_memberIdList"
          },
          {
            label: "案件名称",
            prop: "name"
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
              col_span: 240,
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
              col_span: 240,
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
              col_span: 120,
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
              col_span: 120,
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
              col_span: 120,
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
              col_span: 120,
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

  methods: {}
};
</script>


<style>
</style>
