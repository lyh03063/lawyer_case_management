<template>
  <div class>
    <json_prop class v-model="obj.son" prop="name"></json_prop>
    <json_prop class v-model="obj.son" prop="name"></json_prop>
    <json_prop class v-model="obj.son" prop="age.a"></json_prop>

    <tree_power v-model="power"></tree_power>

    <time_period v-model="timePeriod"></time_period>
    <div class="PT10 PB10 C_f30 PL10">dynamic-form组件的内置表单字段类型--</div>
    <debug_list level-up="0">
  
      <debug_item v-model="obj" text="测试的对象" />
      <debug_item v-model="formData" text="表单数据" />
      <debug_item v-model="power" text="外部的权限" />
    </debug_list>
    <dm_dynamic_form :cf="cfForm" v-model="formData">
      <!--description字段插槽组件-->
      <template v-slot:slot_form_item_description="{formData}">
        <form_item_test class v-model="formData.description"></form_item_test>
      </template>
      <!--自定义复选框插槽组件-->
      <template v-slot:slot_form_item_diycheckbox="{formData}">
        <checkbox_diy v-model="formData.diycheckbox" :options="options"></checkbox_diy>
      </template>
    </dm_dynamic_form>
  </div>
</template>
<script>
import form_item_test from "@/components/form_item_test.vue";
import checkbox_diy from "@/components/form_item/checkbox_diy.vue";
import time_period from "@/components/form_item/time_period.vue";
import tree_power from "@/components/form_item/tree_power.vue";
import json_prop from "@/components/form_item/json_prop.vue";

export default {
  components: {
    form_item_test,
    checkbox_diy,
    time_period,
    tree_power,
    json_prop
  },
  data() {
    return {
      obj: { a: 1, name: "abc11", son: { a: "222" } },
      power: { normalPagePower: { home: true } },
      timePeriod: null,

      options: [
        { label: "label1", value: "1" },
        { label: "label2", value: "2" }
      ],
      formData: {
        extend: { aaa: 1, name: "lucy" },
        prop_checkbox: [], //复选框字段的默认数组
        prop1: "abcd",
        prop_dateTime: "2019-7-24 14:09",
        diycheckbox: [1]
      },
      cfForm: {
        labelWidth: "150px",
        formItems: [
          //   {
          //   label: "extend",
          //   prop: "extend",
          //   type: "jsonEditor",

          // },
          {
            label: "联系人信息",
            prop: "extend",
            default: {},
            cfForm: {
              formItems: [
                {
                  label: "姓名",
                  prop: "name",
                  type: "input"
                },
                {
                  label: "下拉框(select)",
                  prop: "sex",
                  type: "select",
                  default: 2,
                  options: [
                    { value: 1, label: "男" },
                    { value: 2, label: "女" }
                  ]
                },
                {
                  label: "联系人信息2",
                  prop: "extend1",
                   default: {},
                   
                  cfForm: {
                    col_span:12,
                    formItems: [
                      {
                        label: "姓名",
                        prop: "name",
                        type: "input",
                        col_span:12,
                      },
                      {
                        label: "下拉框(select)",
                        prop: "sex",
                        type: "select",
                        default: 2,
                        options: [
                          { value: 1, label: "男" },
                          { value: 2, label: "女" }
                        ],
                        col_span:12,
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            label: "负责人信息",
            // prop: "extend",
            cfForm: {
              formItems: [
                {
                  label: "姓名",
                  prop: "name",
                  type: "input"
                },
                {
                  label: "下拉框(select)",
                  prop: "sex",
                  type: "select",
                  default: 2,
                  options: [
                    { value: 1, label: "男" },
                    { value: 2, label: "女" }
                  ]
                }
              ]
            }
          },
          {
            label: "纬度",
            prop: "extend",
            path: "latitude"
          },
          {
            label: "普通文本框(input)",
            prop: "prop1",
            type: "input",
            default: "默认文本",
            rules: [
              { required: true, message: "不能为空" },

              {
                pattern: /^[\u4E00-\u9FA5]+$/,
                message: "用户名只能为中文"
              }
            ]
          },
          {
            label: "密码框2(password)",
            prop: "prop_password",
            type: "password"
          },
          {
            label: "用于模糊查询文本框(input_find_vague)",
            prop: "prop_input_find_vague",
            type: "input_find_vague"
          },
          {
            label: "文本域(textarea)",
            prop: "prop_textarea",
            type: "textarea"
          },
          {
            label: "下拉框(select)",
            prop: "sex",
            type: "select",
            default: 2,
            options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
          },
          {
            label: "sex【联动】",
            prop: "sex_relative",
            type: "input",
            //显示条件
            term: { $or: [{ sex: 2 }, { prop_textarea: 2 }] }
          },
          {
            label: "下拉框(select+ajax)",
            prop: "prop4",
            type: "select",
            ajax: {
              url: "/crossList?page=mabang-member",
              param: { a: 1 },
              keyLabel: "nickName",
              keyValue: "userName"
            }
          },

          {
            label: "单选框(radio)",
            prop: "prop_radio",
            type: "radio",
            default: 2,
            options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
          },
          {
            label: "复选框(checkbox)",
            prop: "prop_checkbox",
            type: "checkbox",
            default: [2],
            options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
          },
          {
            label: "日期时间(dateTime)",
            prop: "prop_dateTime",
            type: "dateTime"
          },
          {
            label: "日期选择器(date)",
            prop: "prop_date",
            type: "date"
          },
          {
            label: "图片上传",
            prop: "prop_upload",
            type: "upload"
          },
          {
            label: "json编辑器(jsonEditor)",
            prop: "prop_jsonEditor",
            type: "jsonEditor"
          },
          {
            label: "json编辑器(vueJsonEditor)",
            prop: "prop_vueJsonEditor",
            type: "vueJsonEditor"
          },
          {
            label: "富文本编辑器(editor)",
            prop: "prop_editor",
            type: "editor"
          },
          {
            label: "自定义组件(slot实现)",
            prop: "description",
            slot: "slot_form_item_description",
            rules: [{ required: true, message: "不能为空" }]
          },
          {
            label: "diycheckbox(slot实现)",
            prop: "diycheckbox",
            slot: "slot_form_item_diycheckbox",
            rules: [{ required: true, message: "不能为空" }]
          }
        ],
        btns: [
          { text: "提交111", event: "submit", type: "primary", validate: true },
          { text: "取消222", event: "cancel" }
        ]
      }
    };
  },
  beforeCreate() {}
};
</script>



