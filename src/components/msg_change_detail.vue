<template>
  <div class>
      <div v-if="msg.change[0].type!=3">{{this.changeContent}}</div>
      <div v-else-if="this.msgAccessory!=''">
          {{this.changeContent}}案件上传了新的附件：&nbsp;&nbsp;
          <span><a class="link-blue" target="_blank" :href="this.msgAccessory.url[0].url">{{this.msgAccessory.name}} </a></span>
      </div>
    
  </div>
</template>

<script>
export default {
    props:['msg'],
  data() {
    return {
        changeContent:'',
        msgAccessory:''
    };
  },
  methods: {
      async getCase () {
	        let { data } = await axios({
          method: "post",
          url: PUB.domain + "/crossList?page=lawyer_case",
          data: {
            findJson: {
              P1:this.msg.caseId
            }
          }
        }).catch(() => {});
        if (this.msg.change[0].type==1) {
            this.changeContent = `${data.list[0].name}案件的案件状态从${this.msg.change[0].before}改变为${this.msg.change[0].after}`
        }else if (this.msg.change[0].type==2) {
            this.changeContent = data.list[0].name + '案件'
            this.getRemark();
        }else if (this.msg.change[0].type==3) {
            this.changeContent = data.list[0].name + '案件'
            this.getAccessory();
        }
        },
      async getRemark () {
	    let { data } = await axios({
          method: "post",
          url: PUB.domain + "/crossList?page=lawyer_remark",
          data: {
            findJson: {
                P1:this.msg.change[0].remarkId
            }
          }
        }).catch(() => {})
          this.changeContent = this.changeContent + '添加了新的进展，进展的内容是：'+(data.list.length>0?data.list[0].content:'该进展已经被删除')
        },
        async getAccessory () {
	        let { data } = await axios({
                method: "post",
                url: PUB.domain + "/crossList?page=lawyer_file",
                data: {
                    findJson: {
                        P1:this.msg.change[0].fileId
                    }
          }
        }).catch(() => {});
        this.msgAccessory = (data.list.length>0?data.list[0]:'该附件已经被删除')
        }


  },
  mounted() {
      this.getCase()
  }
};
</script>

<style scoped>

</style>