export default {
    search:true,
    searchTerm:{type:'memberId',value:localStorage.userId},
    listIndex: "list_remark", //vuex对应的字段
    focusMenu:true,//进行菜单聚焦
    twoTitle: "案件",
    threeTitle: "进展",
    flag:true,
    isShowToolBar:false,
    // isShowModify:false,
    // isShowDelete:false,
    singleBtns: {
      //按钮列表
      addon: [
    
        util.cfList.sBtns.detail,
      ],
    },
    dynamicDict: [{ page: "lawyer_member",populateColumn: "memberName", idColumn: "memberId", idColumn2: "P1" },
    { page: "lawyer_case",populateColumn: "caseName", idColumn: "caseId", idColumn2: "P1" },],
    url: {
      list: "/crossList?page=lawyer_remark", //列表接口
      add: "/crossAdd?page=lawyer_remark", //新增接口
      modify: "/crossModify?page=lawyer_remark", //修改接口
      delete: "/crossDelete?page=lawyer_remark" ,//删除接口
      detail: "/crossDetail?page=lawyer_remark",
    },
    //-------列配置数组-------
    columns: [
      // {
      //   label: "进展id",
      //   prop: "P1",
      //   width: 80
      // },
      {
        label: "案件名称",
        prop: "caseId",
        width: 300,
        formatter:(data)=>{
          if (data.caseName) {
            return data.caseName.name
          }
        }
      },
      {
        label: "内容",
        prop: "content",
        width: 300
      },
      {
        label: "会员",
        prop: "memberId",
        width: 100,
        formatter:(data)=>{
          if (data.memberName) {
            return data.memberName.name
          }
        }
      },
     
      {
        label: "创建时间",
        prop: "CreateTime",
        width: 150
      },
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      {
        label: "案件名称",
        prop: "caseId",
        type: "select",
         ajax: {
          url: "/crossList?page=lawyer_case",
          keyLabel: "name",
          keyValue: "P1"
        }
      },
      // {
      //   label: "进展id",
      //   prop: "P1",
      // },
    ],
    //-------详情字段数组-------
    detailItems: [
      {
        label: "进展id",
        prop: "P1",
        width: 80
      },
      {
        label: "内容",
        prop: "content",
        width: 100
      },
      {
        label: "会员",
        prop: "memberName",
        width: 100,
        formatter:(data)=>{
          if (data.memberName) {
            return data.memberName.user
          }
        }
      },
      {
        label: "案件名称",
        prop: "caseName",
        width: 100,
        formatter:(data)=>{
          if (data.caseName) {
            return data.caseName.name
          }
        }
      },
      {
        label: "创建时间",
        prop: "CreateTime",
        width: 100
      },
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
     {
        label: "内容",
        prop: "content",
        width: 100,
        type:"textarea"
      },
      {
        label: "会员",
        prop: "memberId",
        type: "select",
         ajax: {
          url: "/crossList?page=lawyer_member",
          keyLabel: "name",
          keyValue: "P1"
        },
        rules: [{ required: true, message: "会员名称" }]
      },
      {
        label: "案件名称",
        prop: "caseId",
        type: "select",
         ajax: {
          url: "/crossList?page=lawyer_case",
          keyLabel: "name",
          keyValue: "P1"
        },
        rules: [{ required: true, message: "案件名称" }]
      }
    ]
  }