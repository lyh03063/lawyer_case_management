<template>
  <div class>
    <div v-if="accessoryList.length>0">
      <div v-for="(item,index) in accessoryList" :key="index">
        <div v-if="index>1">
          <div v-if="(!showAll)&&index==2" @click="showAll=true" class="all-remark">查看所有附件</div>
          <div v-if="showAll" class="remarkDetail-box">
            <div class="remarkContent">
              <div class="button-box">
                <el-button plain size="mini" >详情</el-button>
                <el-button plain size="mini" >删除</el-button>
              </div>
              <table >
                <tr>
                  <td>上传会员：</td>
                  <td>{{item.memberName?item.memberName.user:''}}</td>
                </tr>
                <tr>
                  <td>附件名字：</td>
                  <td >{{item.name}}</td>
                </tr>
              </table>
            </div>
          </div>
          <div v-if="showAll&&index==accessoryList.length-1" @click="showAll=false" class="all-remark">收起</div>
        </div>
        <div v-else class="remarkDetail-box">
          <div class="remarkContent">
            <div class="button-box">
                <el-button plain size="mini"  >详情</el-button>
                <el-button plain size="mini" @click="deleteRemark(item)">删除</el-button>
          </div>
            <table>
              <tr>
                <td>上传会员：</td>
                <td>{{item.memberName?item.memberName.user:''}}</td>
              </tr>
              <tr>
                <td>附件名字：</td>
                <td>{{item.name}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-else>该案件还没有附件</div>
  </div>
</template>
<script>

export default {
  props: {
    caseMsg: Object//父组件传过来的案件信息
  },
  data() {
    return {
      showAll: false,//显示所有数据的index
      accessoryList: []//附件列表数据
    };
  },

  methods: {
    //   删除附件的方法 
    async deleteRemark(accessory){
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
          url: PUB.domain + '/crossDelete?page=lawyer_file',
          data: {
            findJson: {
              //用于定位要修改的数据
              P1: accessory.P1
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
      this.getAccessory();
    },
    // 获取附件列表的方法
    async getAccessory() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + "/crossList?page=lawyer_file",
        data: {
          findJson: { caseId: this.caseMsg.P1 }
        }
      });
      this.accessoryList = data.list;
      // 根据所有备注会员id请求一次接口 获取到所有会员用户名
      this.accessoryList = await util.ajaxPopulate({
            listData: this.accessoryList,
            page:'lawyer_member',
            populateColumn:'memberName',
            idColumn:'memberId',
            idColumn2:'P1'
          });
    }
  },
  mounted() {
    //   页面加载后获取附件列表
    this.getAccessory();
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

