<template>
  <div class>
    <listData :cf="cfList"></listData>
  </div>
</template>
<script>
import listData from "@/components/list-data/list-data.vue";

export default {
  
  components: { listData },
  data() {
    return {
      cfList: {
        listIndex: "list_case", //vuex对应的字段
        focusMenu:true,//进行菜单聚焦
        twoTitle: "案件",
        threeTitle: "案件列表",
        flag:true,
        url: {
          list: "/crossList?page=lawyer_case", //列表接口
          add: "/crossAdd?page=lawyer_case", //新增接口
          modify: "/crossModify?page=lawyer_case", //修改接口
          delete: "/crossDelete?page=lawyer_case" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "案件名称",
            prop: "name",
            width: 120
          },
          {
            label: "案件描述",
            prop: "description",
            width: 350
          },
          {
            label: "案号",
            prop: "caseId",
            width: 100
          },
           {
            label: "状态",
            prop: "status",
            width: 65
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
            label: "会员名称",
            prop: "name",
            type: "input_find_vague"
          },
          {
            label: "身份证号",
            prop: "idCard",
            type: "input"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "案件名称",
            prop: "name",
          },
          {
            label: "描述",
            prop: "description",
          },
          {
            label: "案号",
            prop: "caseId",
          },
          {
            label: "状态",
            prop: "status",
          },
          {
            label: "诉讼费",
            prop: "litigationFee",
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
            prop: "plaintiffInfo"
          },
          {
            label: "被告信息",
            prop: "defendantInfo"
          },
          {
            label: "一审信息",
            prop: "firstInstanceInfo"
          },
          {
            label: "诉保信息",
            prop: "guaranteeInfo"
          },
          {
            label: "二审信息",
            prop: "secondInstanceInfo"
          },
          {
            label: "执行信息",
            prop: "executionInfo"
          },
          
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
         {
            label: "会员姓名",
            prop: "name",
            width: 100
          },
          {
            label: "微信openid",
            prop: "openid",
            width: 100
          },
          {
            label: "性别",
            prop: "sex",
            type: "select",
            default:1,
            options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
          },
          {
            label: "身份证号",
            prop: "idCard",
            width: 100
          },
          {
            label: "备注",
            prop: "remark",
            width: 150
          } ,
          {
            label: "职业",
            prop: "career",
            type: "input"
          },
          {
            label: "球龄",
            prop: "ballAge",
            type: "select",
            options: [
              { label: "一年以下", value: 1 },
              { label: "一到三年", value: 2 },
              { label: "三到五年", value: 3 },
              { label: "五到十年", value: 4 },
              { label: "十年以上", value: 5 }
            ]
          }, 
        ]
      }
    };
  },

  methods: {
    
  }
};
</script>


<style>
</style>
