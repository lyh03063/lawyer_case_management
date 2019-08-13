<template>
  <div class>
      <h2 class="TAC MT20">消息详情</h2>
      <div v-if="newMsgList.length>0">
          <div>您有{{newMsgList.length}}条新消息：</div>
          <div v-for="(msg,index) in newMsgList" :key="index" class="new-msg-box">
              <id_to_name v-model="msg.memberId" url="/crossList?page=lawyer_member" keyValue='user' v-show="false"></id_to_name>
              <id_to_name v-model="msg.caseId" url="/crossList?page=lawyer_case" keyValue='name' v-show="false"></id_to_name>
              <div>第{{index+1}}条消息是:</div>
              <div v-for="(item,index) in msg.change" :key="index" class="ML30">
                <div v-if="item.type==1">
                  {{msg.caseId}}案件修改了内容,&nbsp;&nbsp;修改前的内容是：{{item.before}},&nbsp;&nbsp;修改后的内容是：{{item.after}}
                </div>
                <div v-if="item.type==2">
                  {{msg.caseId}}案件添加了新的备注,&nbsp;&nbsp;备注的id是：{{item.fileId}}
                </div>
                <div v-if="item.type==3">
                  {{msg.caseId}}案件上传了新的附件,&nbsp;&nbsp;附件的id是：{{item.remarkId}}
                </div>
              </div>
              <div class="ML30">发送消息的会员是：{{msg.memberId}},&nbsp;&nbsp;消息发送的时间是：{{msg.CreateTime}}</div>
          </div>
      </div>
      <div v-else>
          您没有新消息
      </div>
      
  </div>
</template>
<script>
import id_to_name from "@/components/id_to_name";
export default {
  components: { id_to_name },
  data() {
    return{
        newMsgList:[
            {P1:1,change:[{type:1,before:"1111",after:"2222"},{type:2,fileId:1},],CreateTime:"2019-8-10",memberId:1,caseId:2},
            {P1:2,change:[{type:1,before:"xxx案件",after:"案件kkk"},{type:3,fileId:1},],CreateTime:"2019-8-15",memberId:2,caseId:1},
            {P1:1,change:[{type:2,fileId:3},],CreateTime:"2019-9-10",memberId:2,caseId:4},
        ]
    }
  },

  methods: {
    
  }
};
</script>


<style scoped>
  .new-msg-box{
    width: 90%;
    border: 1px solid gray;
    line-height: 25px;
    padding-left: 10px;;
    margin: 10px 20px;
  }
</style>

