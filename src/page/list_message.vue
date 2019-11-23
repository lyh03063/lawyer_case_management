<template>
  <div class>
    <dm_list_data :cf="cfList">
      <template v-slot:slot_form_item_change="{row}">
        <msg_change_detail :msg='row'></msg_change_detail>
      </template>
      <template v-slot:slot_form_item_memberId="{row}">
        <dm_ajax_populate :id="row.memberId" populateKey="name" page="lawyer_member">
        </dm_ajax_populate>
      </template>
      <template v-slot:slot_form_item_receiveMemberId="{row}">
        <dm_ajax_populate :id="row.receiveMemberId" populateKey="name" page="lawyer_member">
        </dm_ajax_populate>
      </template>
      <template v-slot:slot_form_item_caseId="{row}">
        <dm_ajax_populate :id="row.caseId" populateKey="name" page="lawyer_case">
        </dm_ajax_populate>
      </template>
    </dm_list_data>
  </div>
</template>
<script>
import msg_change_detail from "@/components/msg_change_detail";
export default {
components:{msg_change_detail},
  data() {
    return {
      cfList: PUB.listCF.list_message
    };
  },

  methods: {
    
  }
};
</script>


<style>
</style>
