<template>
    <div>
        <debug_list level-up="0">
                 <debug_item v-model="caseMsg" text="案件信息" />
                <debug_item v-model="caseMsg.P1" text="测试的对象" />
         </debug_list>
         <el-row class="">
             <el-col :span="1" class="H100"> </el-col>
            <el-col :span="22" class="case-box">
                <div class="case-title">
                    <span>案件名称：{{caseMsg.name?caseMsg.name:"无"}}</span>
                    <span>案号：{{caseMsg.caseId?caseMsg.caseId:"无"}}</span>
                    <span>案件状态：{{caseMsg.status?caseMsg.status:"无"}}</span>
                </div>
                <div>案件描述：{{caseMsg.description?caseMsg.description:"无"}}</div>
                <div>
                    <span>原告单位：{{caseMsg.plaintiffInfo?caseMsg.plaintiffInfo.company:"无"}}</span>
                    <span>原告联系人：{{caseMsg.plaintiffInfo?caseMsg.plaintiffInfo.contact:"无"}}</span>
                </div>
                <div>
                    <span>被告单位：{{caseMsg.defendantInfo?caseMsg.defendantInfo.company:"无"}}</span>
                    <span>被告联系人：{{caseMsg.defendantInfo?caseMsg.defendantInfo.contact:"无"}}</span>
                </div>
                <div>
                    <span>一审单位：{{caseMsg.firstInstanceInfo?caseMsg.firstInstanceInfo.company:"无"}}</span>
                    <span>一审案号：{{caseMsg.firstInstanceInfo?caseMsg.firstInstanceInfo.contact:"无"}}</span>
                    <span>一审承办人：{{caseMsg.firstInstanceInfo?caseMsg.firstInstanceInfo.person:"无"}}</span>
                    <span>一审电话：{{caseMsg.firstInstanceInfo?caseMsg.firstInstanceInfo.phone:"无"}}</span>
                </div>
                <div>
                    <span>诉保单位：{{caseMsg.guaranteeInfo?caseMsg.guaranteeInfo.company:"无"}}</span>
                    <span>诉保承办人：{{caseMsg.guaranteeInfo?caseMsg.guaranteeInfo.person:"无"}}</span>
                    <span>诉保电话：{{caseMsg.guaranteeInfo?caseMsg.guaranteeInfo.phone:"无"}}</span>
                </div>
                <div>
                    <span>二审单位：{{caseMsg.secondInstanceInfo?caseMsg.secondInstanceInfo.company:"无"}}</span>
                    <span>二审案号：{{caseMsg.secondInstanceInfo?caseMsg.secondInstanceInfo.contact:"无"}}</span>
                    <span>二审承办人：{{caseMsg.secondInstanceInfo?caseMsg.secondInstanceInfo.person:"无"}}</span>
                    <span>二审电话：{{caseMsg.secondInstanceInfo?caseMsg.secondInstanceInfo.phone:"无"}}</span>
                </div>
                <div>
                    <span>执行单位：{{caseMsg.executionInfo?caseMsg.executionInfo.company:"无"}}</span>
                    <span>执行案号：{{caseMsg.executionInfo?caseMsg.executionInfo.contact:"无"}}</span>
                    <span>执行承办人：{{caseMsg.executionInfo?caseMsg.executionInfo.person:"无"}}</span>
                    <span>执行电话：{{caseMsg.executionInfo?caseMsg.executionInfo.phone:"无"}}</span>
                </div>
                <div>
                    <span>诉讼费：{{caseMsg.litigationFee?caseMsg.litigationFee:"无"}}</span>
                    <span>担保费：{{caseMsg.guaranteeFee?caseMsg.guaranteeFee:"无"}}</span>
                    <span>保全费：{{caseMsg.insuranceFee?caseMsg.insuranceFee:"无"}}</span>
                </div>
                <div>备注：暂无</div>
                <div>附件：暂无</div>
                </el-col>
         </el-row>
    </div>
</template>

<script>
export default {
    props:{
        caseMsg:Object
    },
    data(){
        return {

        }
    }
}
</script>
<style scoped>
    .case-box{
        font-size: 18px;
    }
    .case-box div{
        padding: 10px 10px;
        margin: 10px 0px;
        border: 1px #ddd solid;
    }
    .case-box div span{
        margin-right: 20px;
    }
</style>

