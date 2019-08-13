<template>
  <div class>
    <listData :cf="cfList">

    </listData>
  </div>
</template>
<script>
import listData from "@/components/list-data/list-data.vue";

export default {
  
  components: { listData },
  data() {
    return {
      cfList: {
        listIndex: "list_message", //vuex对应的字段
        focusMenu:true,//进行菜单聚焦
        twoTitle: "消息",
        flag:true,
        url: {
          list: "/crossList?page=lawyer_msg", //列表接口
          add: "/crossAdd?page=lawyer_msg", //新增接口
          modify: "/crossModify?page=lawyer_msg", //修改接口
          delete: "/crossDelete?page=lawyer_msg" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "消息id",
            prop: "P1",
            width: 80
          },
          {
            label: "已读",
            prop: "read",
            width: 80
          },
          {
            label: "变更内容",
            prop: "change",
            width: 300
          },
          {
            label: "创建时间",
            prop: "CreateTime",
            width: 150
          },
          {
            label: "会员id",
            prop: "memberId",
            width: 100
          },
          {
            label: "案件id",
            prop: "caseId",
            width: 100
          }
          
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "消息id",
            prop: "P1",
            type: "input"
          },
          {
            label: "案件id",
            prop: "caseId",
            type: "input"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "消息id",
            prop: "P1",
            width: 80
          },
          {
            label: "变更内容",
            prop: "change",
            width: 300
          },
          {
            label: "创建时间",
            prop: "CreateTime",
            width: 150
          },
          {
            label: "会员id",
            prop: "memberId",
            width: 100
          },
          {
            label: "案件id",
            prop: "caseId",
            width: 100
          }  
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
         {
            label: "会员姓名",
            prop: "name",
          },
         {
            label: "已读",
            prop: "read",
          },
         {
            label: "会员id",
            prop: "memberId",
            type: "select",
             ajax: {
              url: "/crossList?page=lawyer_member",
              keyLabel: "name",
              keyValue: "P1"
            },
            rules: [{ required: true, message: "会员id" }]
          },
         {
            label: "案件id",
            prop: "caseId",
            type: "select",
             ajax: {
              url: "/crossList?page=lawyer_case",
              keyLabel: "name",
              keyValue: "P1"
            },
            rules: [{ required: true, message: "案件id" }]
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
