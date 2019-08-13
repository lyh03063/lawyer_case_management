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
        listIndex: "list_accessory", //vuex对应的字段
        focusMenu:true,//进行菜单聚焦
        twoTitle: "案件",
        threeTitle: "附件列表",
        flag:true,
        dynamicDict: [{ page: "lawyer_member",populateColumn: "memberName", idColumn: "memberId", idColumn2: "P1" },
        { page: "lawyer_case",populateColumn: "caseName", idColumn: "caseId", idColumn2: "P1" },],
        url: {
          list: "/crossList?page=lawyer_file", //列表接口
          add: "/crossAdd?page=lawyer_file", //新增接口
          modify: "/crossModify?page=lawyer_file", //修改接口
          delete: "/crossDelete?page=lawyer_file" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "附件id",
            prop: "P1",
            width: 80
          },
          {
            label: "文件名",
            prop: "name",
            width: 100
          },
          {
            label: "文件类型",
            prop: "suffix",
            width: 100
          },
           {
            label: "文件地址",
            prop: "url",
            width: 300
          },
          {
            label: "创建时间",
            prop: "CreateTime",
            width: 150
          },
          {
            label: "会员id",
            prop: "memberName",
            width: 100,
            formatter:(data)=>{
              if (data.memberName) {
                return data.memberName.user
              }
            }
          },      
         {
            label: "案件id",
            prop: "caseName",
            width: 100,
            formatter:(data)=>{
              if (data.caseName) {
                return data.caseName.name
              }
            }
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "附件id",
            prop: "P1",
            type: "input"
          },
          {
            label: "文件名",
            prop: "name",
            type: "input_find_vague"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
           {
            label: "附件id",
            prop: "P1",
            width: 80
          },
          {
            label: "文件名",
            prop: "name",
            width: 100
          },
          {
            label: "文件类型",
            prop: "suffix",
            width: 100
          },
           {
            label: "文件地址",
            prop: "url",
            width: 300
          },
          {
            label: "创建时间",
            prop: "CreateTime",
            width: 150
          },
          {
            label: "会员id",
            prop: "memberName",
            width: 100,
            formatter:(data)=>{
              if (data.memberName) {
                return data.memberName.user
              }
            }
          },       
          {
            label: "案件id",
            prop: "caseName",
            width: 100,
            formatter:(data)=>{
              if (data.caseName) {
                return data.caseName.name
              }
            }
          }  
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
         {
            label: "文件名",
            prop: "name",
            width: 100
          },
          {
            label: "文件类型",
            prop: "suffix",
            width: 100
          },
          {
            label: "文件地址",
            prop: "url",
          },
          {
            label: "上传会员id",
            prop: "memberId",
            type: "select",
             ajax: {
              url: "/crossList?page=lawyer_member",
              keyLabel: "name",
              keyValue: "P1"
            },
            rules: [{ required: true, message: "上传会员id" }]
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
