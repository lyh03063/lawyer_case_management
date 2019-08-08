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
          detail: "/crossDetail?page=lawyer_case", //详情接口
          delete: "/crossDelete?page=lawyer_case" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "Id",
            prop: "P1",
            width: 80
          },
          {
            label: "案件名称",
            prop: "name",
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
        detailItems: [
          {
            label: "Id",
            prop: "P1",
          },
          {
            label: "案件名称",
            prop: "name",
          } 
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
         {
            label: "案件名称",
            prop: "name",
       
          },
        {
            label: "案号",
            prop: "caseId",
          } ,
          {
            label: "描述",
            prop: "description",
          } ,
          {
            label: "状态",
            prop: "status",
            type: "select",
            default:1,
            options: [{ value: 1, label: "待立案" }, { value: 2, label: "已立案待保全" }]
          },
          {
            label: "诉讼费",
            prop: "litigationFee",
          },
          {
            label: "担保费",
            prop: "guaranteeFee",
          },
          {
            label: "保全费",
            prop: "insuranceFee",
          },
          {
            label: "原告信息",
            prop: "plaintiffInfo",
            default:{},//默认值必须要有，否则新增的时候会出问题
            cfForm: {
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
            default:{},//默认值必须要有，否则新增的时候会出问题
            cfForm: {
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
            default:{},//默认值必须要有，否则新增的时候会出问题
            cfForm: {
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
            default:{},//默认值必须要有，否则新增的时候会出问题
            cfForm: {
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
            default:{},//默认值必须要有，否则新增的时候会出问题
            cfForm: {
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
            default:{},//默认值必须要有，否则新增的时候会出问题
            cfForm: {
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
