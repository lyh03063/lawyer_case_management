
export default {
      listIndex: "list_area", //vuex对应的字段
     
      focusMenu: true,//进行菜单聚焦
      flag: true,
      url: {
        list: "/crossList?page=lawyer_area", //列表接口
        add: "/crossAdd?page=lawyer_area", //新增接口
        modify: "/crossModify?page=lawyer_area", //修改接口
        delete: "/crossDelete?page=lawyer_area" //删除接口
      },
  
      //-------列配置数组-------
      columns: [
        {
          label: "地区名称",
          prop: "name",
          width: 120
        },
        // {
        //   label: "创建人",
        //   prop: "CreateUser",
        //   width: 120
        // },
        {
          label: "创建时间",
          prop: "CreateTime",
          width: 130,
          formatter: function(row) {
            if (row.CreateTime) {
              return moment(row.CreateTime).format("YYYY-MM-DD");
            } else {
              return "";
            }
          }
        },
        {
          label: "更新时间",
          prop: "UpdateTime",
          width: 130,
          formatter: function(row) {
            if (row.UpdateTime) {
              return moment(row.UpdateTime).format("YYYY-MM-DD");
            } else {
              return "";
            }
          }
        }
      ],
      //-------筛选表单字段数组-------
      searchFormItems: [
        {
          label: "地区名称",
          prop: "P2",
          type: "input_find_vague"
        }
      ],
      //-------详情字段数组-------
      detailItems: [
        {
          label: "地区名称",
          prop: "name",
          width: 120
        },
        // {
        //   label: "创建人",
        //   prop: "CreateUser",
        //   width: 120
        // },
        {
          label: "创建时间",
          prop: "CreateTime",
          width: 130,
          formatter: function(row) {
            if (row.CreateTime) {
              return moment(row.CreateTime).format("YYYY-MM-DD");
            } else {
              return "";
            }
          }
        },
        {
          label: "更新时间",
          prop: "UpdateTime",
          width: 130,
          formatter: function(row) {
            if (row.UpdateTime) {
              return moment(row.UpdateTime).format("YYYY-MM-DD");
            } else {
              return "";
            }
          }
        }
      ],
      //-------新增、修改表单字段数组-------
      formItems: [
        {
          label: "地区名称",
          prop: "name",
          width: 120
        }
      ]
    }
  