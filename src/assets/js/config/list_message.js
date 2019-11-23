export default {
    listIndex: "list_message", //vuex对应的字段
    focusMenu:true,//进行菜单聚焦
    twoTitle: "消息",
    // flag:true,
    isShowToolBar:false,
    isShowModify:false,
    isShowDelete:false,
    dynamicDict: [{ page: "lawyer_member",populateColumn: "memberName", idColumn: "memberId", idColumn2: "P1" },
    { page: "lawyer_case",populateColumn: "caseName", idColumn: "caseId", idColumn2: "P1" },
    { page: "lawyer_member",populateColumn: "receiveName", idColumn: "receiveMemberId", idColumn2: "P1" },],
    url: {
      list: "/crossList?page=lawyer_msg", //列表接口
      add: "/crossAdd?page=lawyer_msg", //新增接口
      modify: "/crossModify?page=lawyer_msg", //修改接口
      detail: "/crossDetail?page=lawyer_msg",
      delete: "/crossDelete?page=lawyer_msg" //删除接口
    },
    //-------列配置数组-------
    columns: [
    //   {
    //     label: "消息id",
    //     prop: "P1",
    //     width: 80
    //   },
      {
        label: "查看状态",
        prop: "read",
        width: 120,
        formatter:(data)=>{
          if (data.read==1) {
            return '已读'
          }else{
            return '未读'
          }
        }
      },
      {
        label: "变更内容",
        prop: "change",
        width: 300,
        formatter:(data)=>{
           if (data.memberName&&data.caseName) {
          switch (data.change[0].type) {
            case 1:
              return data.memberName.name+"修改了"+data.caseName.name+"案件的状态,从"+data.change[0].before+"改变为"+data.change[0].after
            case 2:
              return data.memberName.name+"在"+data.caseName.name+"案件上添加了新的备注，"+"备注的id是"+data.change[0].remarkId
            case 3:
              return data.memberName.name+"在"+data.caseName.name+"案件上传了新的附件，"+"附件的id是"+data.change[0].fileId
            default:
              return "无"
              break;
          }
        }
        }
      },
      {
        label: "创建时间",
        prop: "CreateTime",
        width: 150
      },
      {
        label: "发送会员",
        prop: "memberId",
        width: 100,
        formatter:(data)=>{
          if (data.memberName) {
            return data.memberName.name
          }
        }
      },
      {
        label: "接收会员",
        prop: "receiveMemberId",
        width: 100,
        formatter:(data)=>{
          if (data.receiveName) {
            return data.receiveName.name
          }
        }
      },
      {
        label: "案件名称",
        prop: "caseId",
        width: 100,
        formatter:(data)=>{
          if (data.caseName) {
            return data.caseName.name
          }
        }
      }
      
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
    //   {
    //     label: "消息id",
    //     prop: "P1",
    //     type: "input"
    //   },
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
    ],
    //-------详情字段数组-------
    detailItems: [
      {
        label: "消息id",
        prop: "P1",
        width: 80
      },
      {
        label: "变更内容",
        prop: "change",
        width: 300,
        slot:'slot_form_item_change'
      },
      {
        label: "创建时间",
        prop: "CreateTime",
        width: 150
      },
      {
        label: "发送会员",
        prop: "memberId",
        width: 100,
        slot:'slot_form_item_memberId'
      },
      {
        label: "接收会员",
        prop: "receiveMemberId",
        width: 100,
        slot:'slot_form_item_receiveMemberId'
      },
      {
        label: "案件名称",
        prop: "caseId",
        width: 100,
        slot:'slot_form_item_caseId'
      }  
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
     {
        label: "查看状态",
        prop: "read",
        type: "select",
        options:[
          { value: 1, label: "已读" },
          { value: 0, label: "未读" },
        ]
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
        rules: [{ required: true, message: "会员id" }]
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
        rules: [{ required: true, message: "案件id" }]
      },
      
    ]
  }