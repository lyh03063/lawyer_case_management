<template>
  <div class>
    <div v-if="remarkListShow.length>0">
      <div v-for="(item,index) in remarkListShow" :key="index">
        <div class="remarkDetail-box">
          <div class="remarkContent">
            <div class="button-box" v-if="userID==item.memberId">
              <el-button
                plain
                size="mini"
                @click="$emit('show-modify-dialog',item)"
              >修改</el-button>
              <el-button plain size="mini" @click="deleteRemark(item)">删除</el-button>
            </div>
            <div>
              <span >{{item.content}}</span>
            </div>
            <div class="C_999">
              <span>创建人：{{item.memberName?item.memberName.user:''}}&nbsp;&nbsp;&nbsp;</span>
              <span>时间：{{item.CreateTime}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class v-if="remarkList.length>2">
        <div v-if="!showAll" @click="showAll=true" class="all-remark">查看所有（{{remarkList.length}}条记录）</div>
        <div v-else @click="showAll=false" class="all-remark">收起</div>
      </div>
    </div>
    <div v-else style="padding-left:20px;margin-bottom:10px;">该案件还没有进展</div>
  </div>
</template>
<script>
export default {
  props: {
    caseMsg: Object //父组件传过来的案件数据
  },
  computed: {
    //用于显示的进展列表
    remarkListShow: function() {
      if (this.remarkList.length < 3) {
        return this.remarkList;
      }
      if (this.showAll) {
        //Q1:显示全部
        return this.remarkList;
      } else {
        //Q2:否则,返回前两条数据
        return [this.remarkList[0], this.remarkList[1]];

        return;
      }
    }
  },
  data() {
    return {
      userID: localStorage.userId,
      showAll: false, //显示所有数据的index
      remarkList: [] //进展列表,
    };
  },

  methods: {
    // 删除进展的方法
    async deleteRemark(remark) {
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
          url: PUB.domain + "/crossDelete?page=lawyer_remark",
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
    // 获取进展列表的方法
    async getRemark() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + "/crossList?page=lawyer_remark",
        data: {
          findJson: { caseId: this.caseMsg.P1 } //根据案件id获取有关的所有进展
        }
      });
      this.remarkList = data.list;
      // 根据所有会员id请求一次接口获取所有会员用户名
      this.remarkList = await util.ajaxPopulate({
        listData: this.remarkList,
        page: "lawyer_member",
        populateColumn: "memberName",
        idColumn: "memberId",
        idColumn2: "P1"
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

