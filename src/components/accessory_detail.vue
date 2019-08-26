<template>
  <div class>
    <div v-if="accessoryListShow.length>0">
      <div v-for="(item,index) in accessoryListShow" :key="index">
        <div class="remarkDetail-box">
          <div class="remarkContent">
            <div class="button-box" v-if="userID==item.memberId">
              <!-- <el-button plain size="mini" >详情</el-button> -->
              <el-button plain size="mini">删除</el-button>
            </div>
            <div>
              <!-- <span>附件说明：</span> -->
              <a class="link-blue" v-if="getFileUrl(item)" target="_blank" :href="getFileUrl(item)"> <span>{{getFileName(item)}}</span></a>
              

                <span v-if="item.remark" class="ML10">({{item.remark}})</span>

              
            </div>
            <div class="C_999">
              <span>上传人：</span>
              <span>{{item.memberName?item.memberName.user:''}}&nbsp;&nbsp;&nbsp;</span>

              <span>时间：</span>
              <span>{{item.CreateTime}}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class v-if="accessoryList.length>2">
        <div v-if="!showAll" @click="showAll=true" class="all-remark">查看所有（{{accessoryList.length}}条记录）</div>
        <div v-else @click="showAll=false" class="all-remark">收起</div>
      </div>
    </div>
    <div v-else>没有附件</div>
  </div>
</template>
<script>
export default {
  props: {
    caseMsg: Object ,//父组件传过来的案件信息
    category:[Number,String]//附件分类id
  },
  computed: {
    //用于显示的进展列表
    accessoryListShow: function() {
      if (this.accessoryList.length < 3) {
        return this.accessoryList;
      }
      if (this.showAll) {
        //Q1:显示全部
        return this.accessoryList;
      } else {
        //Q2:否则,返回前两条数据
        return [this.accessoryList[0], this.accessoryList[1]];

        return;
      }
    }
  },
  data() {
    return {
      userID: localStorage.userId,
      showAll: false, //显示所有数据的index
      accessoryList: [] //附件列表数据
    };
  },

  methods: {
    
    getFileName(item) {
      let name = this.$lodash.get(item, `url[0].name`);
      return name
      // return util.getFileName(url)

     

    },
    getFileUrl(item) {
      let url = this.$lodash.get(item, `url[0].url`);
      // if (url) {
      //   url += "?attname=";
      // }

      return url;
    },
    //   删除附件的方法
    async deleteRemark(accessory) {
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
          url: PUB.domain + "/crossDelete?page=lawyer_file",
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
          findJson: { caseId: this.caseMsg.P1,category:this.category }
        }
      });
      this.accessoryList = data.list;
      // 根据所有备注会员id请求一次接口 获取到所有会员用户名
      this.accessoryList = await util.ajaxPopulate({
        listData: this.accessoryList,
        page: "lawyer_member",
        populateColumn: "memberName",
        idColumn: "memberId",
        idColumn2: "P1"
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
.all-remark {
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
  text-decoration: underline;
}
.remarkDetail-box {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}
.remarkContent {
  padding-left: 20px;
  line-height: 20px;
}
.button-box {
  float: right;
  margin-right: 10px;
}
</style>

