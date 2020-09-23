<template>
  <div class>
    <el-select
      v-model="nowStatus"
      placeholder="请设定案件状态"
      @change="modifyStatus"
      size="mini"
      style="width:90%;"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: ["status", "case"],
  data() {
    return {
      options: arrCaseStatus,
      nowStatus: this.status,
      oldStatus: ""
    };
  },
  methods: {
    async modifyStatus() {
      let data = await axios({
        method: "post",
        url: PUB.domain + "/crossModify?page=lawyer_case",
        data: {
          findJson: {
            P1: this.case.P1
          },
          modifyJson: {
            status: this.nowStatus
          }
        }
      });
      let nowData = JSON.parse(JSON.stringify(this.case));
      nowData.status = this.nowStatus;
      let oldData = JSON.parse(JSON.stringify(this.case));
      oldData.status = this.oldStatus;
      this.$emit("getDataList", nowData, oldData);//抛出事件到外部，触发消息发送？
      this.oldStatus = JSON.parse(JSON.stringify(this.nowStatus));
    }
  },
  created() {},
  mounted() {
    this.oldStatus = JSON.parse(JSON.stringify(this.nowStatus));
  }
};
</script>

<style scoped>
</style>