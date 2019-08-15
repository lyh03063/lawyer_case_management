<template>
  <div class>
      <h2 class="TAC MT20">消息详情</h2>
      <div v-if="newMsgList.length>0">
          <div>您有{{newMsgList.length}}条新消息：</div>
          <div v-for="(msg,index) in newMsgList" :key="index" class="new-msg-box">
              <div>第{{index+1}}条消息是:</div>
              <div v-for="(item,index) in msg.change" :key="index" class="ML30">
                <div v-if="item.type==1">
                  {{msg.caseName?msg.caseName.name:''}}案件修改了状态,&nbsp;&nbsp;状态从{{item.before}},&nbsp;&nbsp;变成{{item.after}}
                </div>
                <div v-if="item.type==2">
                  {{msg.caseName?msg.caseName.name:''}}案件添加了新的备注,&nbsp;&nbsp;备注的id是：{{item.remarkId}}
                </div>
                <div v-if="item.type==3">
                  {{msg.caseName?msg.caseName.name:''}}案件上传了新的附件,&nbsp;&nbsp;附件的id是：{{item.fileId}}
                </div>
              </div>
              <div class="ML30">发送消息的会员是：{{msg.memberUser?msg.memberUser.user:''}},&nbsp;&nbsp;消息发送的时间是：{{msg.CreateTime}}</div>
          </div>
      </div>
      <div v-else>
          您没有新消息
      </div>
      
  </div>
</template>
<script>
export default {
  data() {
    return{
        newMsgList:[],
        msgIdList:[],
        
    }
  },

  methods: {
    async toName(populateCFEach){
      let { page, populateColumn, idColumn, idColumn2 } = populateCFEach;
      this.newMsgList = await util.ajaxPopulate({
            listData: this.newMsgList,
            page,
            populateColumn,
            idColumn,
            idColumn2
          });
    },
    async getUnReadMsg(){
        let {data} = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + '/crossList?page=lawyer_msg',
        data: { 
          findJson:{
              receiveMemberId:localStorage.userId,
              read:'0'
          }} 
      });
      this.newMsgList = data.list
      console.log('this.newMsgList',this.newMsgList);
      this.toName({page:'lawyer_member',populateColumn:"memberUser",idColumn:"memberId",idColumn2:"P1"})
      this.toName({page:'lawyer_case',populateColumn:"caseName",idColumn:"caseId",idColumn2:"P1"})
      if (this.newMsgList.length>0) {
        this.newMsgList.forEach(msg=>{
        this.msgIdList.push(msg.P1)
      })
        this.modifyMsg()
      }
    },
      async modifyMsg(){
        let {data} = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + '/crossModify?page=lawyer_msg',
        data: { 
          "multi": true,
          findJson:{
              P1:{"$in":this.msgIdList},
          },
          modifyJson: {read:1}
          }
      });
      this.$store.commit("setUnReadCount",undefined);
      }
  },
  mounted(){
    this.getUnReadMsg()
    console.log(util.ajaxPopulate);
    
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

