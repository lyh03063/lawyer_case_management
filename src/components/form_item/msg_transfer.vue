<template>
  <div class>
    <div>
      <span class="MR20" v-if="showName&&memberNameList!=''">{{memberNameList}}</span>
      <span class="MR20" v-else-if="memberIdList">{{memberIdList}}</span>
      <el-button plain @click="showTransfer = true" v-if="memberNameList!=''">修改</el-button>
      <el-button plain @click="showTransfer = true" v-else>设置</el-button>
    </div>
    <el-dialog title="提示" :visible.sync="showTransfer" width="50%" :append-to-body="true">
      <dm_debug_list>
        <dm_debug_item v-model="checkedMemberList" />
        <dm_debug_item v-model="memberList" />
        <dm_debug_item v-model="memberNameList" />

        <dm_debug_item v-model="memberIdList" />
      </dm_debug_list>
      <el-transfer
        v-model="memberIdList"
        :titles="['未指定会员', '已指定会员']"
        :data="memberList"
        @change="change"
      >
        <!-- 插槽插入自定义搜索框 -->
        <el-input v-model="search" placeholder="输入关键字搜索" slot="left-footer"></el-input>
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showTransfer = false">取 消</el-button>
        <el-button type="primary" @click="showTransfer = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: Array,
    url: {
      //父组件传过来的地址
      type: String,
      default: "/crossList?page=tangball_member"
    },
    keyValue: {
      //父组件传过来的搜索key
      type: String,
      default: "name"
    },
    showName: {
      type: Boolean,
      default: false
    },
    //ajax查询参数
    findJson: {
      type: Object,
      default: function(){
        return {}
      }
    }
  },
  data() {
    return {
      memberNameList: [],
      showTransfer: false,
      param: {},
      search: "", //搜索框搜索的内容
      memberList: [], //会员数组
      checkedMemberList: [], //已经选中的会员数据
      memberIdList: this.value //父组件传过来的会员id
    };
  },
  watch: {
    //监听主数组的变动，同步checkedMemberList，用于查询后连接进来：刘咏辉20200914
    memberIdList: function (newVal) {
      console.log(`newVal:###`, newVal);
      this.checkedMemberList = this.memberList.filter(d => {
        return this.memberIdList.includes(d.key)
      })

    },

    // 每当搜索框的值发生变化时，请求axios数据
    search: function (event) {
      // 保存用户已选中的数据

      // 根据用户输入的姓名连接接口请求数据 
      this.getMember(event);
    },
    value: async function () {
      if (this.showName) {
        let { data } = await axios({
          //请求接口
          method: "post",
          url: PUB.domain + "/crossList?page=lawyer_member",
          data: {
            findJson: { P1: this.memberIdList }
          }
        })
        this.memberNameList = [],
          data.list.forEach((member) => {
            this.memberNameList.push(member.name)
          })
        this.memberNameList = this.memberNameList.join();

      }
    }
  },
  methods: {
    /**
     * @name 获取会员数据的方法
     * @desc 如果是搜索时调用的，也就是name存在是，就根据name去获取数据
     *       如果name不存在就是一开始调用，就直接获取全部数据
     * @param name 用户输入要搜索的关键字
     */
    async getMember(name) {
      let ajaxParamAddon
      let findJson = this.findJson

      // let findJson = { P1: { "$ne": localStorage.userId } }
      if (name) {//Q1：{查询关键词}存在
        let { data } = await axios({
          //请求接口
          method: "post",
          url: PUB.domain + this.url,
          data: {
            findJson: {
              ...findJson,
              [this.keyValue]: {
                $options: "i",
                $regex: name
              }
            }
          }
        });
        this.memberList = this.transferData(data.list).concat(
          this.checkedMemberList
        );
        // 为什么这里要连接this.checkedMemberList




        console.logs(`this.memberList:`, this.memberList);
        // 防止同时出现两个相同的会员，对象数组去重
        var obj = {};
        this.memberList = this.memberList.reduce((item, next) => {
          obj[next.key] ? "" : (obj[next.key] = true && item.push(next));
          return item;
        }, []);
        console.logs(`this.memberList:`, this.memberList);
      } else {
        let { data } = await axios({//请求接口
          method: "post", url: PUB.domain + this.url, data: { findJson }
        });
        this.memberList = this.transferData(data.list);
      }
    },

    /**
     * @name 改变数据格式的方法
     * @desc 由于要使用element穿梭框组件，所以需要将数据改变成element支持的格式
     *       用这个方法改变数据格式
     * @param
     */
    transferData(data) {
      let newData = [];
      data.forEach(member => {
        let newMember = {};
        newMember.key = member.P1;
        newMember.label = member.P1 + "(" + member[this.keyValue] + ")";
        newData.push(newMember);
      });
      return newData;
    },
    // 数据发生变化时，触发双向绑定
    change() {
      this.$emit("input", this.memberIdList); //触发双向绑定
    }
  },
  async mounted() {
    // 页面加载就调用此方法，参数才不会为空
    this.getMember();
    if (this.showName) {
      if (this.memberIdList) {
        let { data } = await axios({
          //请求接口
          method: "post",
          url: PUB.domain + "/crossList?page=lawyer_member",
          data: {
            findJson: { P1: this.memberIdList }
          }
        });
        this.memberNameList = [],
          data.list.forEach((member) => {
            this.memberNameList.push(member.name)
          })
        this.memberNameList = this.memberNameList.join();
      }

    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
