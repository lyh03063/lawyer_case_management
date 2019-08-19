<template>
  <div class>
    <div v-if="remarkList.length>0">
      <div v-for="(item,index) in remarkList" :key="index">
        <div v-if="index>1">
          <div v-if="(!showAll)&&index==2" @click="showAll=true" class="all-remark">查看所有进展</div>
          <div v-if="showAll" class="remarkDetail-box">
            <div class="remarkContent">
              <div class="button-box"  v-if="userID==item.memberId">
                <el-button plain size="mini" v-if="!showModify[index].show" @click="modifyRemark(index)">修改</el-button>
                <el-button plain size="mini" v-if="showModify[index].show" @click="saveRemark(index,item)">保存</el-button>
                <el-button plain size="mini" >删除</el-button>
              </div>
              <table >
                <tr>
                  <td>内容：</td>
                  <td v-if="!modifyContent[index].show">{{item.content}}</td>
                  <td v-if="modifyContent[index].show"><el-input v-model="item.content" placeholder="请输入进展" size="mini" type="textarea"></el-input></td>
                </tr>
                <tr>
                  <td>增加会员：</td>
                  <td>{{item.memberName?item.memberName.user:''}}</td>
                </tr>
                <tr>
                  <td>创建时间:：</td>
                  <td>{{item.CreateTime}}</td>
                </tr>
              </table>
            </div>
          </div>
          <div v-if="showAll&&index==remarkList.length-1" @click="showAll=false" class="all-remark">收起</div>
        </div>
        <div v-else class="remarkDetail-box">
          <div class="remarkContent">
            <div class="button-box"  v-if="userID==item.memberId">
                <el-button plain size="mini" v-if="!showModify[index].show" @click="modifyRemark(index)">修改</el-button>
                <el-button plain size="mini" v-if="showModify[index].show" @click="saveRemark(index,item)">保存</el-button>
                <el-button plain size="mini" @click="deleteRemark(item)">删除</el-button>
          </div>
            <table>
              <tr>
                <td>内容：</td>
                <td v-if="!modifyContent[index].show">{{item.content}}</td>
                <td v-if="modifyContent[index].show"><el-input v-model="item.content" placeholder="请输入进展" size="mini" type="textarea"></el-input></td>
              </tr>
              <tr>
                <td>增加会员：</td>
                <td>{{item.memberName?item.memberName.user:''}}</td>
              </tr>
              <tr>
                  <td>创建时间:：</td>
                  <td>{{item.CreateTime}}</td>
                </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-else>该案件还没有进展</div>
  </div>
</template>
<script>

export default {
  props: {
    caseMsg: Object//父组件传过来的案件数据
  },
  data() {
    return {
      userID:localStorage.userId,
      showAll: false,//显示所有数据的index
      showModify:[],//保存每个修改保存按钮是否显示的index数组
      modifyContent:[],//保存每个修改内容文本域是否显示的index数组
      remarkList: []//进展列表
    };
  },

  methods: {
    // 删除进展的方法
    async deleteRemark(remark){
      let clickStatus = await this.$confirm("确认删除该数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(() => {});

      if (clickStatus == "confirm") {
        //用户点击了确认
        await axios({
          //请求接口
          method: "post",
          url: PUB.domain + '/crossDelete?page=lawyer_remark',
          data: {
            findJson: {
              //用于定位要修改的数据
              P1: remark.P1
            }
          } //传递参数
        }).catch(function(error) {
          alert("异常:" + error);
        });

        this.$message({
          message: "删除成功",
          duration: 1500,
          type: "success"
        });
      }
      this.getRemark();
    },
    // 点击修改按钮触发的方法
    modifyRemark(index){
      this.modifyContent[index].show=true;//显示修改文本域
      this.showModify[index].show=true;//显示保存按钮
    },
    // 请求接口保存修改后的数据
    async saveRemark(index,modifyData){
      this.modifyContent[index].show=false;//显示修改按钮
      this.showModify[index].show=false;//关闭修改文本域
      // 请求接口保存数据
      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + "/crossModify?page=lawyer_remark",
        data: {
          findJson:{
              P1:modifyData.P1,
          },
          modifyJson: {content:modifyData.content}
        }
      });
      this.$message({
          message: "保存成功",
          type: "success"
        });
    },
    // 获取进展列表的方法
    async getRemark() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + "/crossList?page=lawyer_remark",
        data: {
          findJson: { caseId: this.caseMsg.P1 }//根据案件id获取有关的所有进展
        }
      });
      this.remarkList = data.list;
      // 根据进展列表的长度为每个进展框设置初始index
      this.remarkList.forEach((doc)=>{
        let obj = {show:false}
        this.showModify.push(obj)
        this.modifyContent.push(obj)
      })
      // 根据所有会员id请求一次接口获取所有会员用户名
      this.remarkList = await util.ajaxPopulate({
            listData: this.remarkList,
            page:'lawyer_member',
            populateColumn:'memberName',
            idColumn:'memberId',
            idColumn2:'P1'
          });
    }
  },
  mounted() {
    // 页面加载成功之后请求一次接口
    this.getRemark();
  }
};
</script>


<style scoped>
.all-remark{
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
  text-decoration: underline
}
.remarkDetail-box {
  width: 98%;
  border: 1px solid gray;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}
.remarkContent {
  padding-left: 20px;
  line-height: 20px;
}
.button-box{
  float: right;
  margin-right: 10px;

}
</style>

