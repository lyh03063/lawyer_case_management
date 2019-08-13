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
        listIndex: "list_member", //vuex对应的字段
        focusMenu:true,//进行菜单聚焦
        twoTitle: "会员",
        flag:true,
        url: {
          list: "/crossList?page=lawyer_member", //列表接口
          add: "/crossAdd?page=lawyer_member", //新增接口
          modify: "/crossModify?page=lawyer_member", //修改接口
          delete: "/crossDelete?page=lawyer_member" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "会员id",
            prop: "P1",
            width: 80
          },
          {
            label: "用户名",
            prop: "user",
            width: 100
          },
          {
            label: "姓名",
            prop: "name",
            width: 100
          },
           {
            label: "密码",
            prop: "password",
            width: 120
          },
          {
            label: "案件数量",
            prop: "caseCount",
            width: 100
          },
          {
            label: "上传附件数量",
            prop: "fileCount",
            width: 150,
          },
          {
            label: "发送消息数量",
            prop: "msgCount",
            width: 150,
          },       
          {
            label: "备注数量",
            prop: "remarkCount",
            width: 100
          },
          {
            label: "角色",
            prop: "role",
            width: 120,
            formatter: (rowData)=>{
              switch (rowData.role) {
                case 1:
                  return "超级管理员"
                  break;
                case 2:
                   return "普通律师会员"
                  break;
                default:
                  return "无"
                  break;
              }
            }
          },
        ],
        searchFormItems: [
          {
            label: "会员id",
            prop: "P1",
            type: "input"
          },
          {
            label: "用户名",
            prop: "user",
            type: "input_find_vague"
          },
          {
            label: "姓名",
            prop: "name",
            type: "input_find_vague"
          },
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "会员id",
            prop: "P1",
            width: 80
          },
          {
            label: "用户名",
            prop: "user",
            width: 100
          },
          {
            label: "姓名",
            prop: "name",
            width: 100
          },
           {
            label: "密码",
            prop: "password",
            width: 120
          },
          {
            label: "案件数量",
            prop: "caseCount",
            width: 100
          },
          {
            label: "上传附件数量",
            prop: "fileCount",
            width: 65,
          },
          {
            label: "发送消息数量",
            prop: "msgCount",
            width: 65
          },       
          {
            label: "备注数量",
            prop: "remarkCount",
            width: 65
          },
          {
            label: "角色",
            prop: "role",
            width: 120,
            formatter: (rowData)=>{
              switch (rowData.role) {
                case 1:
                  return "超级管理员"
                  break;
                case 2:
                   return "普通律师会员"
                  break;
                default:
                  return "无"
                  break;
              }
            }
          },  
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
         {
            label: "用户名",
            prop: "user",
            type:"input"
          },
          {
            label: "姓名",
            prop: "name",
            type:"input"
          },
          {
            label: "密码",
            prop: "password",
            type:"input"
          },
          {
            label: "角色",
            prop: "role",
            type: "select",
            options: [
              { label: "超级管理员", value: 1 },
              { label: "普通律师会员", value: 2 }
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
