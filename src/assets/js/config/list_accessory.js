export default {
    search:true,
    searchTerm:{type:'memberId',value:localStorage.userId},
    listIndex: "list_accessory", //vuex对应的字段
    focusMenu:true,//进行菜单聚焦
    twoTitle: "案件",
    threeTitle: "附件列表",
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
    //批量操作按钮的配置
  // batchBtns: {
  //   addon:[
  //     util.cfList.bBtns.delete,
  //   ],
  //   tips:{
  //     text:"数据来源于小程序或赛事的“报名表”中添加",
  //     // style:{"color":"#3a0"}
  //   }
  // },
    dynamicDict: [{ page: "lawyer_member",populateColumn: "memberName", idColumn: "memberId", idColumn2: "P1" },
    { page: "lawyer_case",populateColumn: "caseName", idColumn: "caseId", idColumn2: "P1" },],
    url: {
      list: "/crossList?page=lawyer_file", //列表接口
      add: "/crossAdd?page=lawyer_file", //新增接口
      modify: "/crossModify?page=lawyer_file", //修改接口
      detail: "/crossDetail?page=lawyer_file",
      delete: "/crossDelete?page=lawyer_file" //删除接口
    },
    //-------列配置数组-------
    columns: [
      // {
      //   label: "附件id",
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
        label: "文件说明",
        prop: "name",
        width: 200
      },
      {
        label: "分类",
        prop: "category",
        width: 120,
        formatter:(data)=>{
          return data.category==1?'诉讼附件':'市场附件'
        }
      },
      {
        label: "上传会员",
        prop: "memberId",
        width: 100,
        formatter:(data)=>{
          if (data.memberName) {
            return data.memberName.name
          }
        }
      },      
     
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      // {
      //   label: "附件id",
      //   prop: "P1",
      //   type: "input"
      // },
      {
        label: "文件名",
        prop: "name",
        type: "input_find_vague"
      },
      {
        label: "上传会员",
        prop: "memberId",
        type: "select",
         ajax: {
          url: "/crossList?page=lawyer_member",
          keyLabel: "user",
          keyValue: "P1"
        },
      },
    ],
    //-------详情字段数组-------
    detailItems: [
       {
        label: "附件id",
        prop: "P1",
        width: 80
      },
      {
        label: "文件名",
        prop: "name",
        width: 100
      },
      {
        label: "创建时间",
        prop: "CreateTime",
        width: 150
      },
      {
        label: "上传会员",
        prop: "memberName",
        width: 100,
        formatter:(data)=>{
          if (data.memberName) {
            return data.memberName.name
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
      }  
    ],
    //-------新增、修改表单字段数组-------
    formItems: [
     {
        label: "文件说明",
        prop: "name",
      },
      {
        label: "分类",
        prop: "category",
      },
      {
        label: "文件地址",
        prop: "url",
       type: "upload",
        uploadConfig: {
          limit: 1,
          listType: "text"
        },
        rules: [{ required: true, message: "还未上传文件" }]
      },
      {
        label: "上传会员",
        prop: "memberId",
        type: "select",
         ajax: {
          url: "/crossList?page=lawyer_member",
          keyLabel: "name",
          keyValue: "P1"
        },
        rules: [{ required: true, message: "上传会员id" }]
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
      }
    ]
  }