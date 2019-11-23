<template>
  <div class>
    <dm_list_data :cf="cfList" @after-add='addMsg'>
    </dm_list_data>
  </div>
</template>
<script>
export default {
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
      cfList: PUB.listCF.list_accessory
    };
  },
  created(){
    if (localStorage.superAdmin != 1) {
      this.cfList.findJson= {type:'memberId',value:localStorage.userId}
    }
  },
 
};
</script>


<style>
</style>
