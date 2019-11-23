import case_status_config from '@/assets/js/config/case.status.config'
  
  let arrCaseStatusFilter = arrCaseStatus.map(item=>{
    let obj ={}
    obj.text = item.label
    obj.value = item.value
    return obj
  })
  arrCaseStatusFilter = arrCaseStatusFilter.filter(item=>{
    return item.text!='已结案'&&item.text!='已退案'
  })

export default {
    customDetail: true, //使用自定义详情插槽
    // col_span:240,
    listIndex: "list_case_unprocess", //vuex对应的字段
    focusMenu: true, //进行菜单聚焦
    twoTitle: "案件",
    threeTitle: "在办案件列表",
    flag: true,
    findJsonDefault:{
      $nor:[{status:8},{status:15}]
    },
    formDataAddInit: {
      //新增表单的初始数据
      createPerson: Number(localStorage.userId)
    },
    dynamicDict: [
      {
        page: "lawyer_member",
        populateColumn: "createUser",
        idColumn: "createPerson",
        idColumn2: "P1"
      },
      {
        page: "lawyer_member",
        populateColumn: "collaboratorName",
        idColumn: "collaborator",
        idColumn2: "P1"
      }
    ],
    url: {
      list: "/crossList?page=lawyer_case", //列表接口
      add: "/crossAdd?page=lawyer_case", //新增接口
      modify: "/crossModify?page=lawyer_case", //修改接口
      detail: "/crossDetail?page=lawyer_case", //详情接口
      delete: "/crossDelete?page=lawyer_case" //删除接口
    },
    //-------列配置数组-------
    columns: [
      {
        label: "案件名称",
        prop: "name",
        width: 400
      },

      {
        label: "案号",
        prop: "caseId",
        width: 230
      },
      {
        label: "案件状态",
        prop: "status",
        width: 120,
        filters:arrCaseStatusFilter,
        columnKey:'status',
        formatter: function(rowData) {
          return lodash.get(dictCaseStatus, `[${rowData.status}].label`,"无");
        }
      },
      {
        label: "开庭时间",
        prop: "trialDate",
        width: 100,
        formatter: function(row) {
          if (row.trialDate) {
            return moment(row.trialDate).format("YYYY-MM-DD");
          } else {
            return "";
          }
        }
      },
      // {
      //   label: "创建人",
      //   prop: "createPerson",
      //   width: 80,
      //   formatter: data => {
      //     if (data.createUser) {
      //       return data.createUser.name;
      //     }
      //   }
      // },
      // {
      //   label: "协作者",
      //   prop: "collaborator",
      //   width: 140,
      //   formatter: data => {
      //     if (data.collaboratorName) {
      //       let collaboratorList = [];
      //       data.collaboratorName.forEach(element => {
      //         if (element) {
      //           collaboratorList.push(element.name);
      //         }
              
      //       });

      //       return collaboratorList.join();
      //       // return data.collaboratorName
      //     }
      //   }
      // },

      // {
      //   label: "诉讼费",
      //   prop: "litigationFee",
      //   width: 100
      // },
      // {
      //   label: "担保费",
      //   prop: "guaranteeFee",
      //   width: 100
      // },
      // {
      //   label: "保全费",
      //   prop: "insuranceFee",
      //   width: 100
      // }
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      {
        label: "案号",
        prop: "caseId"
      },
      {
        label: "案件名称",
        prop: "name",
        type: "input_find_vague"
      }
    ],
    //-------详情字段数组-------

    //-------新增、修改表单字段数组-------
    formItems: [
         {
        label: "案件名称",
        prop: "name",
        rules: [{ required: true, message: "案件名称不能为空" }]
      },
      {
        label: "协作者",
        prop: "collaborator",
        // type: "jsonEditor",
        slot: "slot_form_item_memberIdList"
      },
      {
        label: "案件备注",
        prop: "description2",
        type: "textarea"
      },
      {
        label: "收费标准",
        prop: "description",
        type: "textarea"
      },
   
      // {
      //   label: "创建人",
      //   prop: "createPerson",
      //   type: "select",
      //   slot: "slot_form_item_createPerson"
      // },
      {
        label: "基本信息",
        prop: "",
        default: {}, //默认值必须要有，否则新增的时候会出问题
        cfForm: {
          col_span: 12,
          formItems: [
         
     
      {
        label: "案号",
        prop: "caseId"
      },
      
      {
        label: "诉讼费",
        prop: "litigationFee"
      },
      {
        label: "状态",
        prop: "status",
        type: "select",
        default: 1,
        options: arrCaseStatus
      },
      {
        label: "担保费",
        prop: "guaranteeFee"
      },
     
       {
        label: "开庭时间",
        prop: "trialDate",
        type: "date"
      },
       {
        label: "保全费",
        prop: "insuranceFee"
      },
      
          ]
        }
      },
      
      {
        label: "原告信息",
        prop: "plaintiffInfo",
        default: {}, //默认值必须要有，否则新增的时候会出问题
        cfForm: {
          col_span: 12,
          formItems: [
            {
              label: "单位名称",
              prop: "company"
            },
            {
              label: "联系人信息",
              prop: "contact"
            }
          ]
        }
      },
      {
        label: "被告信息",
        prop: "defendantInfo",
        default: {}, //默认值必须要有，否则新增的时候会出问题
        cfForm: {
          col_span: 12,
          formItems: [
            {
              label: "单位名称",
              prop: "company"
            },
            {
              label: "联系人信息",
              prop: "contact"
            }
          ]
        }
      },
      {
        label: "一审信息",
        prop: "firstInstanceInfo",
        default: {}, //默认值必须要有，否则新增的时候会出问题
        cfForm: {
          col_span: 12,
          formItems: [
            {
              label: "单位",
              prop: "company"
            },
            {
              label: "案号",
              prop: "caseId"
            },
            {
              label: "承办人",
              prop: "person"
            },
            {
              label: "联系电话",
              prop: "phone"
            }
          ]
        }
      },
      {
        label: "诉保信息",
        prop: "guaranteeInfo",
        default: {}, //默认值必须要有，否则新增的时候会出问题
        cfForm: {
          col_span: 12,
          formItems: [
            {
              label: "单位",
              prop: "company"
            },

            {
              label: "承办人",
              prop: "person"
            },
            {
              label: "联系电话",
              prop: "phone"
            }
          ]
        }
      },
      {
        label: "二审信息",
        prop: "secondInstanceInfo",
        default: {}, //默认值必须要有，否则新增的时候会出问题
        cfForm: {
          col_span: 12,
          formItems: [
            {
              label: "单位",
              prop: "company"
            },
            {
              label: "案号",
              prop: "caseId"
            },
            {
              label: "承办人",
              prop: "person"
            },
            {
              label: "联系电话",
              prop: "phone"
            }
          ]
        }
      },
      {
        label: "执行信息",
        prop: "executionInfo",
        default: {}, //默认值必须要有，否则新增的时候会出问题
        cfForm: {
          col_span: 12,
          formItems: [
            {
              label: "单位",
              prop: "company"
            },
            {
              label: "案号",
              prop: "caseId"
            },
            {
              label: "承办人",
              prop: "person"
            },
            {
              label: "联系电话",
              prop: "phone"
            }
          ]
        }
      },
         {
        label: "收款监督",
        prop: "collectionControl",
        type: "collection",
        collectionlistType: "form",
        collectionCfForm: {
          col_span: 12,
          formItems: [
            {
              label: "时间",
              prop: "time",
              type: "date"
            },
            {
              label: "金额",
              prop: "money"
            }
          ]
        }
      },
    ]
  }