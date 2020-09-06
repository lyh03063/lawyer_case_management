
import list_member from '@/assets/js/config/list_member.js'
import list_accessory from '@/assets/js/config/list_accessory.js'
import list_case_unprocess from '@/assets/js/config/list_case_unprocess.js'
import list_case_end from '@/assets/js/config/list_case_end.js'
import list_remark from '@/assets/js/config/list_remark.js'
import list_message from '@/assets/js/config/list_message.js'
import list_area from '@/assets/js/config/list_area.js'
PUB.listCF = {}

PUB.listCF.list_member = list_member
PUB.listCF.list_accessory = list_accessory
PUB.listCF.list_case_unprocess = list_case_unprocess
PUB.listCF.list_case_end = list_case_end
PUB.listCF.list_remark = list_remark
PUB.listCF.list_message = list_message
PUB.listCF.list_area = list_area

PUB.listCF.list_case_reason = {
    listIndex: "list_case_reason", //vuex对应的字段
    focusMenu: true,//进行菜单聚焦
    flag: true,
    url: {
        list: "/crossList?page=lawyer_case_reason", //列表接口
        add: "/crossAdd?page=lawyer_case_reason", //新增接口
        modify: "/crossModify?page=lawyer_case_reason", //修改接口
        delete: "/crossDelete?page=lawyer_case_reason" //删除接口
    },

    //-------列配置数组-------
    columns: [
        {
            label: "案由名称",
            prop: "name",
            width: 120
        },

        {
            label: "创建时间",
            prop: "CreateTime",
            width: 130,
            formatter: function (row) {
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
            formatter: function (row) {
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
            label: "案由名称",
            prop: "P2",
            type: "input_find_vague"
        }
    ],
    //-------详情字段数组-------
    detailItems: [
        {
            label: "案由名称",
            prop: "name",
            width: 120
        },

        {
            label: "创建时间",
            prop: "CreateTime",
            width: 130,
            formatter: function (row) {
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
            formatter: function (row) {
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

export default {}