<template>
  <div class>
    <listData :cf="cfList" @after-add='addMsg'>
    </listData>
  </div>
</template>
<script>
import listData from "@/components/list-data/list-data.vue";
export default {
  components: { listData },
   methods: {
    // 如果新增附件就新增对应的消息，需要注意的是需要先通过案件id先获取案件负责人及协作者
      addMsg(data){
       this.addMsgData.change[0].fileId = data.P1
       this.addMsgData.caseId = data.caseId
       this.addMsgData.memberId = localStorage.userId
       this.getMerberId(data.caseId)
     },
    //  通过案件id先获取案件负责人及协作者
     async getMerberId(caseId){
      //  通过案件id请求接口
       let {data} = await axios({
        method: "post",
        url: PUB.domain + '/crossList?page=lawyer_case',
        data: { findJson: {
          P1:caseId
        }} 
      })
      // 如果有协作者就为每一个协作者创建对应的消息对象,保存在addMsglist中
      if (data.list[0].collaborator) {
         data.list[0].collaborator.forEach(memberId => {
           if (memberId!=this.addMsgData.memberId) {
              if (memberId!=data.list[0].createPerson) {
             this.addMsgData.receiveMemberId = memberId
             let addData = JSON.parse(JSON.stringify(this.addMsgData))
             this.addMsglist.push(addData);
              }
           }
       })
      }else{
        return false
      }
      // 创建负责人消息对象，保存在addMsglist中
      if (data.list[0].createPerson!=this.addMsgData.memberId) {
              this.addMsgData.receiveMemberId = data.list[0].createPerson
             let addData = JSON.parse(JSON.stringify(this.addMsgData))
             this.addMsglist.push(addData);
           }
      await axios({
        //请求接口,新建消息
        method: "post",
        url: PUB.domain + '/crossAdd?page=lawyer_msg',
        data: { data: this.addMsglist} 
      })
      // 清空新消息数组
      this.addMsglist = []
     }
  },
  data() {
    return {
      // 新消息对象的默认状态
      addMsgData:{read:0,change:[{type:3,fileId:''}],memberId:'',caseId:'',receiveMemberId:''},
      addMsglist:[],//保存所有新消息对象的数组
      cfList: {
        search:true,
        searchTerm:{type:'memberId',value:localStorage.userId},
        listIndex: "list_accessory", //vuex对应的字段
        focusMenu:true,//进行菜单聚焦
        twoTitle: "案件",
        threeTitle: "附件列表",
        flag:true,
        isShowToolBar:false,
        isShowModify:false,
        isShowDelete:false,
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
            label: "文件说明",
            prop: "name",
            width: 100
          },
          {
            label: "上传会员",
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
            label: "文件说明",
            prop: "name",
            type: "input_find_vague"
          },
          {
            label: "上传会员",
            prop: "memberId",
            type: "select",
             ajax: {
              url: "/crossList?page=lawyer_member",
              keyLabel: "user",
              keyValue: "P1"
            },
          },
        ],
        //-------详情字段数组-------
        detailItems: [
           {
            label: "附件id",
            prop: "P1",
            width: 80
          },
          {
            label: "文件说明",
            prop: "name",
            width: 100
          },
          {
            label: "创建时间",
            prop: "CreateTime",
            width: 150
          },
          {
            label: "上传会员",
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
          }  
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
         {
            label: "文件说明",
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
            label: "上传会员",
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

 
};
</script>


<style>
</style>
