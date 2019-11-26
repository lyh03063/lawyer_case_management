<template>
  <div class>
    <dm_list_data :cf="cfList"></dm_list_data>
  </div>
</template>
<script>

export default {
  components: {  },
  data() {
    let cfList = PUB.listCF.list_area 
    cfList.formDataAddInit = {
      CreateUser:localStorage.userId
    }
    return {
      cfList
    };
  },created(){
  }

};
</script>


<style>
</style>
