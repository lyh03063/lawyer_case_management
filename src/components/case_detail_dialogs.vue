<template>
  <div>
    <debug_list level-up="0">
      <debug_item v-model="caseMsg" text="案件信息" />
      <debug_item v-model="caseMsg.P1" text="测试的对象" />
    </debug_list>
    
      <div class="case-box">
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
          <el-col :span="20">
            <div class="case-box-right">
              <span>{{item.company}}{{caseMsg[item.index]?caseMsg[item.index].company:"无"}}</span>
              <span
                v-if="item.contact"
              >{{item.contact}}{{caseMsg[item.index]?caseMsg[item.index].contact:"无"}}</span>
              <span
                v-if="item.caseId"
              >{{item.caseId}}{{caseMsg[item.index]?caseMsg[item.index].caseId:"无"}}</span>
              <span
                v-if="item.person"
              >{{item.person}}{{caseMsg[item.index]?caseMsg[item.index].person:"无"}}</span>
              <span
                v-if="item.person"
              >{{item.phone}}{{caseMsg[item.index]?caseMsg[item.index].phone:"无"}}</span>
            </div>
          </el-col>
        </el-row>
        <div class="H20"></div>
        <div class="subfield">
          <div style="float:left">进展</div>
          <div class="button-box">
            <el-button size="mini" type="info" @click="showAddRemark = true">新增</el-button>
          </div>
        </div>
        <div>
          <remarkDetail :caseMsg="caseMsg" ref="remarkDetail"></remarkDetail>
        </div>
        <div class="subfield">
          <div style="float:left">附件</div>
          <div class="button-box">
            <el-button size="mini" type="info" @click="showAddAccessory = true">新增</el-button>
          </div>
        </div>
        <div>
          <accessory_detail :caseMsg="caseMsg" ref="accessoryDetail"></accessory_detail>
        </div>
      </div>
    <!-- 新增进展弹窗 -->
    <el-dialog title="新增" :visible.sync="showAddRemark" width="60%" append-to-body>
        <dm_dynamic_form v-model="remarkAdd" :cf="cfRemarkAdd" @submit="addRemark" @cancel="showAddRemark=false">
        <template v-slot:[item.slot]="{formData}" v-for="item in cfRemarkAdd.formItems">
          <!--根据cf.formItems循环输出插槽--新增修改表单弹窗-->
          <slot :name="item.slot" :formData="formData" v-if="item.slot"></slot>
        </template>
      </dm_dynamic_form>
    </el-dialog>
    <!-- 新增附件弹窗 -->
    <el-dialog title="新增" :visible.sync="showAddAccessory" width="60%" append-to-body>
        <dm_dynamic_form v-model="accessoryAdd" :cf="cfAccessoryAdd" @submit="addAccessory" @cancel="showAddAccessory=false">
        <template v-slot:[item.slot]="{formData}" v-for="item in cfAccessoryAdd.formItems">
          <!--根据cf.formItems循环输出插槽--新增修改表单弹窗-->
          <slot :name="item.slot" :formData="formData" v-if="item.slot"></slot>
        </template>
      </dm_dynamic_form>
    </el-dialog>
  </div>
</template>

<script>
import listData from "@/components/list-data/list-data.vue";
import remarkDetail from "@/components/remark_detail";
import accessory_detail from '@/components/accessory_detail'
export default {
  components: { listData, remarkDetail,accessory_detail},
  props: {
    caseMsg: Object//父组件传过来的案件信息
  },
  methods: {
    // 新增附件的方法
    async addAccessory(){
      this.showAddAccessory=false//关闭新增会话框
      // 请求新增附件的接口
      let {data} = await axios({
          method: "post",
          url: PUB.domain + '/crossAdd?page=lawyer_file',
          data: { data: this.accessoryAdd}//将新增数据传进接口中
        })
        this.$message({
            message: "新增成功",
            type: "success",
          });
          // 重定义新增附件数据，其中案件id以及会员id固定
        this.accessoryAdd={caseId:this.caseMsg.P1,memberId:localStorage.userId},
        // 设置新增消息类型，及附件id
        this.addMsgData.change[0].type = 3
        this.addMsgData.change[0].fileId = data.addData.P1
        // 设置新增消息的案件id  以及会员id
       this.addMsgData.caseId = this.accessoryAdd.caseId
       this.addMsgData.memberId = this.accessoryAdd.memberId
      //  如果案件有协作者时，为不是消息发送人和不是案件负责人发送消息,保存数据在addMsglist中
       if (this.caseMsg.collaborator) {
         this.caseMsg.collaborator.forEach(memberId => {
           if (memberId!=this.addMsgData.memberId) {
             if (memberId!=this.caseMsg.createPerson) {
             this.addMsgData.receiveMemberId = memberId
             let addData = JSON.parse(JSON.stringify(this.addMsgData))
             this.addMsglist.push(addData);
             }
           }
       })
      }else{
        return false
      }
      // 当案件负责人不是消息发送人时，对其发送消息
       if (this.caseMsg.createPerson!=this.addMsgData.memberId) {
              this.addMsgData.receiveMemberId = this.caseMsg.createPerson
             let addData = JSON.parse(JSON.stringify(this.addMsgData))
             this.addMsglist.push(addData);
           }
          //  新增消息,然后触发子组件刷新附件列表的方法
      this.addMsg();
      this.$refs.accessoryDetail.getAccessory();
    },
    // 新建进展的方法
    async addRemark() {
        this.showAddRemark=false//关闭进展弹窗
        // 请求进展接口
        let { data } = await axios({
          method: "post",
          url: PUB.domain + '/crossAdd?page=lawyer_remark',
          data: { data: this.remarkAdd }//向接口传递新增进展数据
        })
        this.$message({
            message: "新增成功",
            type: "success",
          });
        // 新增完成之后重新定义新增进展数据，其中案件id以及会员id固定
        this.remarkAdd={caseId:this.caseMsg.P1,memberId:localStorage.userId},
        // 设置新增消息的数据，进展id，案件id，发送消息会员id
        this.addMsgData.change[0].type = 2
        this.addMsgData.change[0].remarkId = data.addData.P1
       this.addMsgData.caseId = this.remarkAdd.caseId
       this.addMsgData.memberId = this.remarkAdd.memberId
        //  如果案件有协作者时，为不是消息发送人和不是案件负责人发送消息,保存数据在addMsglist中
       if (this.caseMsg.collaborator) {
         this.caseMsg.collaborator.forEach(memberId => {
           if (memberId!=this.addMsgData.memberId) {
             if (memberId!=this.caseMsg.createPerson) {
             this.addMsgData.receiveMemberId = memberId
             let addData = JSON.parse(JSON.stringify(this.addMsgData))
             this.addMsglist.push(addData);
             }
           }
       })
      }else{
        return false
      }
      // 当案件负责人不是消息发送人时，对其发送消息
       if (this.caseMsg.createPerson!=this.addMsgData.memberId) {
              this.addMsgData.receiveMemberId = this.caseMsg.createPerson
             let addData = JSON.parse(JSON.stringify(this.addMsgData))
             this.addMsglist.push(addData);
           }
      //  新增消息,然后触发子组件刷新附件列表的方法
      this.addMsg();
      this.$refs.remarkDetail.getRemark();
    },
    // 新增消息的方法
    async addMsg(){
      await axios({
        method: "post",
        url: PUB.domain + '/crossAdd?page=lawyer_msg',
        data: { data: this.addMsglist} 
      })
      // 清空新增消息列表，及新增消息数据
      this.addMsglist=[],
      this.addMsgData={read:0,change:[{type:0,remarkId:'',fileId:''}],memberId:'',caseId:'',receiveMemberId:''}
    }
  },
  data() {
    return {
      // 每条新增消息数据
      addMsgData:{read:0,change:[{type:0,remarkId:'',fileId:''}],memberId:'',caseId:'',receiveMemberId:''},
      addMsglist:[],//保存新增消息对象的列表
      showAddRemark:false,//新增进展弹窗index
      remarkAdd: {caseId:this.caseMsg.P1,memberId:localStorage.userId},//新增进展数据对象
      showAddAccessory:false,//新增附件弹窗index
      accessoryAdd:{caseId:this.caseMsg.P1,memberId:localStorage.userId},//新增附件数据对象
      cfAccessoryAdd:{//给动态表单组件传过去的新增附件配置
        formItems: [
         {
            label: "文件说明",
            prop: "name",
            width: 100,
            rules: [{ required: true, message: "文件说明不能为空" }]

          },
          // {
          //   label: "文件类型",
          //   prop: "suffix",
          //   width: 100
          // },
          // {
          //   label: "文件地址",
          //   prop: "url",
          // },
           {
            label: "文件上传",
            prop: "url",
            type: "upload",
            uploadConfig: {
              limit: 1,
              listType: "text",
             
            }
          },
        ],
        btns: [
          { text: "新增", event: "submit", type: "primary", validate: true },
          { text: "取消", event: "cancel" }
        ]
      },
      cfRemarkAdd: {//给动态表单组件传过去的新增进展配置
        formItems:[
         {
            label: "进展内容",
            prop: "content",
            width: 100,
            type:"textarea",
            rules: [{ required: true, message: "进展内容不能为空" }]
          }
        ],
        btns: [
          { text: "新增", event: "submit", type: "primary", validate: true },
          { text: "取消", event: "cancel" }
        ]
      },
      // 案件基本信息配置
      caseMsgLeft: [
        { text: "案件名称：", index: "name" },
        { text: "案号：", index: "caseId" },
        { text: "案件状态：", index: "status" },
        { text: "案件描述：", index: "description" },
        { text: "诉讼费：", index: "litigationFee" },
        { text: "担保费：", index: "guaranteeFee" },
        { text: "保全费：", index: "insuranceFee" },
        {
          text: "原告信息：",
          index: "plaintiffInfo",
          company: "原告单位：",
          contact: "原告联系人："
        },
        {
          text: "被告信息：",
          index: "defendantInfo",
          company: "被告单位：",
          contact: "被告联系人："
        }
      ],
      // 案件流程信息配置
      caseMsgRight: [
        {
          text: "一审信息：",
          index: "firstInstanceInfo",
          company: "一审单位：",
          caseId: "一审案号：",
          person: "一审承办人：",
          phone: "一审电话："
        },
        {
          text: "诉保信息：",
          index: "guaranteeInfo",
          company: "诉保单位：",
          person: "诉保承办人：",
          phone: "诉保电话："
        },
        {
          text: "二审信息：",
          index: "secondInstanceInfo ",
          company: "二审单位：",
          caseId: "二审案号：",
          person: "二审承办人：",
          phone: "二审电话："
        },
        {
          text: "执行信息：",
          index: "executionInfo",
          company: "执行单位：",
          caseId: "执行案号：",
          person: "执行承办人：",
          phone: "执行电话："
        }
      ],
     
    };
  },
   mounted() {
    //  页面初始化时修改案件状态为中文
    switch (this.caseMsg.status) {
      case 1:
        this.caseMsg.status = "待立案";
        break;
      case 2:
        this.caseMsg.status = "已立案待保全";
        break;
      case 3:
        this.caseMsg.status = "已保全";
        break;
      case 4:
        this.caseMsg.status = "待一审开庭";
        break;
      case 5:
        this.caseMsg.status = "待二审开庭";
        break;
      case 6:
        this.caseMsg.status = "调解中";
        break;
      case 7:
        this.caseMsg.status = "收款监督";
        break;
      case 8:
        this.caseMsg.status = "已结案";
        break;
      default:
        this.caseMsg.status = "无";
        break;
    }
  },
};
</script>
<style scoped>
.case-box {
  margin-left:30px;
  margin-right: 10px;
  font-size: 14px;
}

.case-box div span {
  margin-right: 20px;
}
.subfield {
  margin-left: -30px;
  margin-bottom: 10px;
  padding-left: 20px;
  height: 50px;
  line-height: 50px;
  background-color: rgb(220, 220, 220);
  color: black;
  font-weight: 700;
}
.case-box-left table tr td {
  padding-left: 30px;
  padding-top: 5px;
}
.case-box-left table tr td:first-child {
  width: 25%;
}
.case-box-right {
  padding-left: 30px;
  padding-top: 5px;
}
.button-box {
  float: right;
  margin-right: 10px;
}
</style>

