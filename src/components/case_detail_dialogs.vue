<template>
  <div>
    <debug_list level-up="0">
      <debug_item v-model="caseMsg" text="案件信息" />
      <debug_item v-model="caseMsg.P1" text="测试的对象" />
    </debug_list>
    <el-row class>
      <el-col :span="1" class="H100"></el-col>
      <el-col :span="22" class="case-box">
        <div class="subfield">案件基本信息</div>
        <el-row>
          <el-col :span="22" class="case-box-left">
            <table>
                <tr v-for="(item,index) in caseMsgLeft" :key="index">
                    <td>{{item.text}}</td>
                    <td v-if="!item.company">{{caseMsg[item.index]?caseMsg[item.index]:"无"}}</td>
                    <td v-if="item.company">
                        <span>{{item.company}}{{caseMsg[item.index]?caseMsg[item.index].company:"无"}}</span>
                        <span>{{item.contact}}{{caseMsg[item.index]?caseMsg[item.index].contact:"无"}}</span>
                    </td>
                </tr>
            </table>
            <div class="H20"></div>
          </el-col>
        </el-row>
          <div class="subfield">案件流程信息</div>
              <el-row v-for="(item,index) in caseMsgRight" :key="index">
                  <el-col :span="3" class="case-box-right">{{item.text}}</el-col>
                  <el-col :span="20" >
                      <div class="case-box-right">
                        <span>{{item.company}}{{caseMsg[item.index]?caseMsg[item.index].company:"无"}}</span>
                        <span v-if="item.contact">{{item.contact}}{{caseMsg[item.index]?caseMsg[item.index].contact:"无"}}</span>
                        <span v-if="item.caseId">{{item.caseId}}{{caseMsg[item.index]?caseMsg[item.index].caseId:"无"}}</span>
                        <span v-if="item.person">{{item.person}}{{caseMsg[item.index]?caseMsg[item.index].person:"无"}}</span>
                         <span v-if="item.person">{{item.phone}}{{caseMsg[item.index]?caseMsg[item.index].phone:"无"}}</span>
                      </div>
                    </el-col>
              </el-row>
              <div class="H20"></div>
        <div class="subfield">备注</div>
        <div class="subfield">附件</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    caseMsg: Object
  },
  mounted(){
      switch (this.caseMsg.status) {
        case 1:
          this.caseMsg.status = "待立案" 
          break;
        case 2:
          this.caseMsg.status ="已立案待保全" 
          break;
        case 3:
          this.caseMsg.status ="已保全" 
          break;
        case 4:
          this.caseMsg.status ="待一审开庭" 
          break;
        case 5:
          this.caseMsg.status ="待二审开庭" 
          break;
        case 6:
          this.caseMsg.status ="调解中" 
          break;
        case 7:
          this.caseMsg.status ="收款监督" 
          break;
        case 8:
         this.caseMsg.status ="已结案" 
         break;
        default:
         this.caseMsg.status ="无" 
         break;
      }

  },
  methods:{

  },
  data() {
      
    return {
        caseMsgLeft:[{text:"案件名称：",index:'name'},
        {text:"案号：",index:'caseId'},
        {text:"案件状态：",index:'status'},
        {text:"案件描述：",index:'description'},
        {text:"诉讼费：",index:'litigationFee'},
        {text:"担保费：",index:'guaranteeFee'},
        {text:"保全费：",index:'insuranceFee'},
        {text:"原告信息：",index:'plaintiffInfo',company:"原告单位：",contact:"原告联系人："},
        {text:"被告信息：",index:'defendantInfo',company:"被告单位：",contact:"被告联系人："},
      ],
        caseMsgRight:[
        {text:'一审信息：',index:'firstInstanceInfo',company:"一审单位：",caseId:"一审案号：",person:"一审承办人：",phone:"一审电话："},
        {text:'诉保信息：',index:'guaranteeInfo',company:"诉保单位：",person:"诉保承办人：",phone:"诉保电话："},
        {text:'二审信息：',index:'secondInstanceInfo ',company:"二审单位：",caseId:"二审案号：",person:"二审承办人：",phone:"二审电话："},
        {text:'执行信息：',index:'executionInfo',company:"执行单位：",caseId:"执行案号：",person:"执行承办人：",phone:"执行电话："},]
    };
  }
};
</script>
<style scoped>
.case-box {
  font-size: 18px;
}

.case-box div span {
  margin-right: 20px;
}
.subfield{
    margin-left: -30px;
    margin-bottom: 10px;
    padding-left: 20px;;
    height: 50px;
    line-height: 50px;
    background-color: rgb(220, 220, 220);
    color: black;
    font-weight: 700
    
}
.case-box-left table tr td{
    padding-left: 30px;
    padding-top:5px;
}
.case-box-left table tr td:first-child{
    width: 25%;
}
.case-box-right{
    padding-left: 30px;
    padding-top:5px;
}
</style>

