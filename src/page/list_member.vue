<template>
  <div class>
    <dm_list_data :cf="cfList"></dm_list_data>
  </div>
</template>
<script>

export default {
  data() {
    return {
      cfList: PUB.listCF.list_member
    };
  },

  methods: {

  },
  created() {

    if (localStorage.superAdmin != 1) {// Q1：如果不是超级管理员登录，取消删除按钮

      //去掉删除按钮
      this.cfList.singleBtns = {
        addon: [
          util.cfList.sBtns.detail, util.cfList.sBtns.modify,
        ]
      }
      //去掉批量删除按钮
      this.cfList.batchBtns = {
        addon: [
          util.cfList.bBtns.add,

        ]
      }


    }
  },
  mounted() {
    // window.console.log('aaaa',PUB);
  }
};
</script>


<style>
</style>
