<template>
  <div class>
    <listData :cf="cfList">
    </listData>
  </div>
</template>
<script>
import listData from "@/components/list-data/list-data.vue";
import id_to_name from "@/components/id_to_name";
export default {
  
  components: { listData,id_to_name },
  data() {
    return {
      cfList: {
        listIndex: "list_remark", //vuex对应的字段
        focusMenu:true,//进行菜单聚焦
        twoTitle: "案件",
        threeTitle: "备注",
        flag:true,
        dynamicDict: [{ page: "lawyer_member",populateColumn: "memberName", idColumn: "memberId", idColumn2: "P1" },
        { page: "lawyer_case",populateColumn: "caseName", idColumn: "caseId", idColumn2: "P1" },],
        url: {
          list: "/crossList?page=lawyer_remark", //列表接口
          add: "/crossAdd?page=lawyer_remark", //新增接口
          modify: "/crossModify?page=lawyer_remark", //修改接口
          delete: "/crossDelete?page=lawyer_remark" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "备注id",
            prop: "P1",
            width: 80
          },
          {
            label: "备注内容",
            prop: "content",
            width: 300
          },
          {
            label: "会员",
            prop: "memberName",
            width: 100,
            formatter:(data)=>{
              if (data.memberName) {
                return data.memberName.user
              }
            }
          },
          {
            label: "案件名称",
            prop: "caseName",
            width: 100,
            formatter:(data)=>{
              if (data.caseName) {
                return data.caseName.name
              }
            }
          },
          {
            label: "创建时间",
            prop: "CreateTime",
            width: 150
          },
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "案件id",
            prop: "caseId",
            type: "input"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "备注id",
            prop: "P1",
            width: 80
          },
          {
            label: "备注内容",
            prop: "content",
            width: 100
          },
          {
            label: "会员",
            prop: "memberName",
            width: 100,
            formatter:(data)=>{
              if (data.memberName) {
                return data.memberName.user
              }
            }
          },
          {
            label: "案件名称",
            prop: "caseName",
            width: 100,
            formatter:(data)=>{
              if (data.caseName) {
                return data.caseName.name
              }
            }
          },
          {
            label: "创建时间",
            prop: "CreateTime",
            width: 100
          },
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
         {
            label: "备注内容",
            prop: "content",
            width: 100,
            type:"textarea"
          },
          {
            label: "会员",
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
            label: "案件名称",
            prop: "caseId",
            type: "select",
             ajax: {
              url: "/crossList?page=lawyer_case",
              keyLabel: "name",
              keyValue: "P1"
            },
            rules: [{ required: true, message: "案件id" }]
          }
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
