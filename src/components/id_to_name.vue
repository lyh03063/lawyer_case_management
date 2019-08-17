<template>
  <div class="float:left">
    {{name}}
  </div>
</template>

<script>
export default {
  props: ['value','url','keyValue','return'],
  watch:{
    value:function(){
      this.getMerber()
    }
  },
  data() {
    return {
        name:''
    };
  },
  methods: {
   async getMerber(){
       let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + this.url,
        data: {
            findJson: {P1:this.value}
        }
      });
      if (data.list.length==1) {
          this.name = data.list[0][this.keyValue]
          if (this.return) {
             this.$emit('input',this.name)
          }
         
      }else{
          this.name = []
          data.list.forEach(doc => {
              this.name.push(doc.user)
          });
          if (this.return) {
             this.$emit('input',this.name)
          }
      }
   }
  },
  mounted() {
      this.getMerber()
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
