import lodash from 'lodash'//导入lodash方法库
PUB.listCF = {}
let F_ITEMS = window.F_ITEMS || {};
let D_ITEMS = window.D_ITEMS || {};
let COLUMNS = window.COLUMNS || {};
let DYDICT = window.DYDICT || {};

//END 数据字典
//#region 数据字典
DYDICT.createPerson = {
    page: "lawyer_member",
    populateColumn: "createUser",
    idColumn: "createPerson",
    idColumn2: "P1"
};
DYDICT.areaId = {
    page: "lawyer_area",
    populateColumn: "areaDoc",
    idColumn: "areaId",
    idColumn2: "P1"
};
DYDICT.reasonId = {
    page: "lawyer_case_reason",
    populateColumn: "reasonDoc",
    idColumn: "reasonId",
    idColumn2: "P1"
};
DYDICT.collaborator = {
    page: "lawyer_member",
    populateColumn: "collaboratorName",
    idColumn: "collaborator",
    idColumn2: "P1"
};


DYDICT.personInCharge = {
    page: "lawyer_member",
    populateColumn: "personInChargeDoc",
    idColumn: "personInCharge",
    idColumn2: "P1"
};
DYDICT.aaaaa = 1111;

//#endregion




//END 基础字段配置



//#region 基础字段配置
{
    let prop = "name", objBase = { label: "案件名称", prop, }
    D_ITEMS["caseName"] = { ...objBase, };
    COLUMNS["caseName"] = { ...objBase, width: 260 };
    F_ITEMS["caseName"] = { ...objBase, rules: [{ required: true, message: "案件名称不能为空" }] };
    F_ITEMS["caseName_search"] = { ...objBase, type: "input_find_vague" };
}
{
    let prop = "caseId", objBase = { label: "案号", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 205 ,align:"center",cfColumn:{"class-name":"TAC"}};
    F_ITEMS[prop] = { ...objBase };
}
{
    let prop = "reasonId", objBase = { label: "案由", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = {
        cfColumn:{"class-name":"TAC"},
        ...objBase, width: 120, formatter: function (row) {
            return lodash.get(row, `reasonDoc.name`);
        }
    };
    F_ITEMS[prop] = {
        ...objBase, type: "select",
        ajax: {
            url: "/crossList?page=lawyer_case_reason",
            keyLabel: "name",
            keyValue: "P1"
        }
    };
}
//END 案件状态字段差异化处理
let arrCaseStatus = [
    { value: 11, label: "委托移交" },
    { value: 1, label: "立案" },
   // { value: 2, label: "已立案待保全" },
    { value: 3, label: "保全" },
    { value: 16, label: "送达" },//新增的
    { value: 6, label: "调解" },
    { value: 7, label: "收款监督" },
    { value: 4, label: "一审" },
   // { value: 12, label: "待一审出判" },
    { value: 5, label: "二审" },
   // { value: 13, label: "待二审出判" },
    { value: 9, label: "执行" },
    { value: 10, label: "执行终本" },
    { value: 14, label: "代理费清收" },
    { value: 8, label: "结案" },
    { value: 15, label: "退案" },
];
var dictCaseStatus = lodash.keyBy(arrCaseStatus, "value");
window.arrCaseStatus = arrCaseStatus
window.dictCaseStatus = dictCaseStatus
let arrCaseStatusFilter = arrCaseStatus.map(item => {
    let obj = {}
    obj.text = item.label
    obj.value = item.value
    return obj
})
let arrCaseStatusFilter1 = arrCaseStatusFilter.filter(item => {
    return item.text != '结案' && item.text != '退案'
})


let arrCaseStatusFilter2 = [
    { value: 8, text: "结案" },
    { value: 15, text: "退案" },
]



{
    let prop = "status", objBase = { label: "案件状态", prop, }
    D_ITEMS["caseStatus"] = { ...objBase, };
    COLUMNS["caseStatus"] = {
        ...objBase, width: 130, filters: arrCaseStatusFilter1,
        cfColumn:{"class-name":"TAC"},
        requireProp: ["collaborator", 'createPerson'],
        columnKey: 'status',
        slot: "slot_columns_item_status",
    };
    //已结案的案件状态列，筛选项不一样
    COLUMNS["caseStatus_end"] = { ...COLUMNS["caseStatus"], filters: arrCaseStatusFilter2 }

    COLUMNS["caseStatus_executing"] = { ...COLUMNS["caseStatus"], }
    delete COLUMNS["caseStatus_executing"].filters//移除筛选配置

    COLUMNS["caseStatus_final_ex"] = COLUMNS["caseStatus_executing"]



    F_ITEMS["caseStatus"] = {
        ...objBase, type: "select",
        default: 1,
        options: arrCaseStatus
    };
}
{
    let prop = "trialDate", objBase = { label: "开庭时间", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = {
        ...objBase, width: 90, formatter: function (row) {
            if (row.trialDate) {
                return moment(row.trialDate).format("YYYY-MM-DD");
            } else {
                return "";
            }
        }
    };
    F_ITEMS[prop] = { ...objBase, type: "date" };
}
{
    let prop = "areaId", objBase = { label: "地区", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = {
        ...objBase, width: 55, filters: [],
        requireProp: ["areaId"],
        columnKey: 'areaId',
        formatter: function (row) {
            return lodash.get(row, `areaDoc.name`);
        }
    };
    F_ITEMS[prop] = {
        ...objBase, type: "select",
        ajax: {
            url: "/crossList?page=lawyer_area",
            keyLabel: "name",
            keyValue: "P1"
        }
    };
}
{
    let prop = "collaborator", objBase = { label: "协作者", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = { ...objBase, slot: "slot_form_item_memberIdList" };
}
{
    let prop = "personInCharge", objBase = { label: "主办律师", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = {
        ...objBase, width: 70,
        cfColumn:{"class-name":"TAC"},
        formatter: data => {
            if (!data.personInChargeDoc) return
            let collaboratorList = [];
            data.personInChargeDoc.forEach(element => {
                if (element) {
                    collaboratorList.push(element.name);
                }
            });
            return collaboratorList.join();
            // return data.collaboratorName
        }
    };
    F_ITEMS[prop] = { ...objBase, slot: "slot_form_item_personInCharge" };
}
{
    let prop = "description2", objBase = { label: "案件备注", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = { ...objBase, type: "textarea" };
}
{
    let prop = "litigationFee", objBase = { label: "诉讼费", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = { ...objBase };
}
{
    let prop = "guaranteeFee", objBase = { label: "担保费", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = { ...objBase };
}
{
    let prop = "insuranceFee", objBase = { label: "保全费", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = { ...objBase };
}
{
    let prop = "plaintiffInfo", objBase = { label: "原告/申请执行人信息", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = {
        ...objBase, default: {}, //默认值必须要有，否则新增的时候会出问题
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
    };
}
{
    let prop = "defendantInfo", objBase = { label: "被告/被执行人信息", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    let objNeed = lodash.cloneDeep(F_ITEMS["plaintiffInfo"]);  //深拷贝
    F_ITEMS[prop] = { ...objNeed, ...objBase };//合并
}
{
    let prop = "firstInstanceInfo", objBase = { label: "一审信息", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = {
        ...objBase,
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
    };
}
{
    let prop = "guaranteeInfo", objBase = { label: "诉保信息", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = {
        ...objBase, default: {}, //默认值必须要有，否则新增的时候会出问题
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
                },
                {
                    label: "保到期时间",
                    prop: "time",
                    type: "date"
                },
                // {
                //     label: "保全费用",
                //     prop: "money"
                // },
                {
                    col_span: 24,
                    label: "保全结果",
                    prop: "result",
                    type: "textarea"
                },
            ]
        }
    };
}
{
    let prop = "secondInstanceInfo", objBase = { label: "二审信息", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = {
        ...objBase, default: {}, //默认值必须要有，否则新增的时候会出问题
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
    };
}
{
    let prop = "executionInfo", objBase = { label: "执行信息", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = {
        ...objBase, default: {}, //默认值必须要有，否则新增的时候会出问题
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
    };
}
{
    let prop = "collectionControl", objBase = { label: "收款监督", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = {
        ...objBase, type: "collection",
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
    };
}
{
    let prop = "description", objBase = { label: "收费标准", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = { ...objBase, type: "textarea" };
}
{
    let prop = "", objBase = { label: "基本信息", prop, }
    D_ITEMS["baseInfo"] = { ...objBase, };
    COLUMNS["baseInfo"] = { ...objBase, width: 90 };
    F_ITEMS["baseInfo"] = {
        ...objBase,
        default: {}, //默认值必须要有，否则新增的时候会出问题
        cfForm: {
            col_span: 12,
            formItems: [
                F_ITEMS["caseId"], F_ITEMS["litigationFee"], F_ITEMS["caseStatus"],
                F_ITEMS["guaranteeFee"], F_ITEMS["trialDate"], F_ITEMS["insuranceFee"],
                F_ITEMS["areaId"], F_ITEMS["reasonId"],
            ]
        }
    };
}



{
    let prop = "name", objBase = { label: "案由名称", prop, }

    D_ITEMS["reasonName"] = { ...objBase, };
    COLUMNS["reasonName"] = { ...objBase, width: 120 };
    F_ITEMS["reasonName"] = { ...objBase };
    F_ITEMS["reasonName_search"] = { ...objBase, type: "input_find_vague" };
}
{
    let prop = "CreateTime", objBase = { label: "创建时间", prop, }
    D_ITEMS[prop] = {
        ...objBase, formatter: function (row) {
            if (!row.CreateTime) return "";
            return moment(row.CreateTime).format("YYYY-MM-DD");
        }
    };
    COLUMNS[prop] = {
        ...D_ITEMS[prop], width: 130,

    };
    F_ITEMS[prop] = { ...objBase };
}
{
    let prop = "UpdateTime", objBase = { label: "更新时间", prop, }
    D_ITEMS[prop] = {
        ...objBase, formatter: function (row) {
            if (!row.UpdateTime) return "";
            return moment(row.UpdateTime).format("YYYY-MM-DD");
        }
    };
    COLUMNS[prop] = {
        ...D_ITEMS[prop], width: 130,
    };
    F_ITEMS[prop] = { ...objBase };
}






{
    let prop = "user", objBase = { label: "用户名", prop, }
    D_ITEMS["userName"] = { ...objBase, };
    COLUMNS["userName"] = { ...objBase, width: 100 };
    F_ITEMS["userName"] = { ...objBase, rules: [{ required: true, message: "用户名不能为空" }] };
    F_ITEMS["userName_search"] = { ...objBase, type: "input_find_vague" };
}
{
    let prop = "name", objBase = { label: "姓名", prop, }
    D_ITEMS["trueName"] = { ...objBase, };
    COLUMNS["trueName"] = { ...objBase, width: 90 };
    F_ITEMS["trueName"] = { ...objBase, rules: [{ required: true, message: "姓名不能为空" }] };
    F_ITEMS["trueName_search"] = { ...objBase, type: "input_find_vague" };
}
{
    let prop = "role", objBase = { label: "角色", prop, }
    D_ITEMS[prop] = {
        ...objBase,
        formatter: (rowData) => {
            switch (rowData.role) {
                case 1:
                    return "超级管理员"
                    break;
                case 2:
                    return "普通律师会员"
                    break;
                default:
                    return "无"
                    break;
            }
        }
    };
    COLUMNS[prop] = {
        ...D_ITEMS[prop], width: 120,

    };
    F_ITEMS[prop] = {
        ...objBase,
        type: "select",
        options: [
            { label: "超级管理员", value: 1 },
            { label: "普通律师会员", value: 2 }
        ],
        rules: [{ required: true, message: "角色未选" }]
    };
}
{
    let prop = "P1", objBase = { label: "会员id", prop, }
    D_ITEMS["userId"] = { ...objBase, };
    COLUMNS["userId"] = { ...objBase, width: 90 };
    F_ITEMS["userId"] = { ...objBase };
}
{
    let prop = "password", objBase = { label: "密码", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = { ...objBase, rules: [{ required: true, message: "姓名不能为空" }] };
}

{
    let prop = "caseCount", objBase = { label: "案件数量", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = { ...objBase };
}
{
    let prop = "fileCount", objBase = { label: "上传附件数量", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = { ...objBase };
}
{
    let prop = "msgCount", objBase = { label: "发送消息数量", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = { ...objBase };
}
{
    let prop = "remarkCount", objBase = { label: "备注数量", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = { ...objBase };
}




{
    let prop = "caseId", objBase = { label: "案件名称", prop, }
    D_ITEMS["caseIdToName"] = { ...objBase, };
    COLUMNS["caseIdToName"] = {
        ...objBase, width: 300,
        formatter: (data) => {
            if (data.caseName) {
                return data.caseName.name
            }
        }
    };
    F_ITEMS["caseIdToName"] = { ...objBase };
    F_ITEMS["caseId_select"] = {
        ...objBase, type: "select",
        ajax: {
            url: "/crossList?page=lawyer_case",
            keyLabel: "name",
            keyValue: "P1"
        },
        rules: [{ required: true, message: "案件id" }]
    };
}

{
    let prop = "name", objBase = { label: "文件名", prop, }
    D_ITEMS["fileName"] = { ...objBase, };
    COLUMNS["fileName"] = { ...objBase, width: 200 };
    F_ITEMS["fileName"] = { ...objBase };
    F_ITEMS["fileName_search"] = { ...objBase, type: "input_find_vague" };
}
{
    let prop = "filecategory", objBase = { label: "分类", prop: "category", }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = {
        ...objBase, width: 120,
        formatter: (data) => {
            return data.category == 1 ? '诉讼附件' : '市场附件'
        }
    };
    F_ITEMS[prop] = { ...objBase };
}
{
    let prop = "memberId", objBase = { label: "上传会员", prop, }
    D_ITEMS[prop] = {
        ...objBase, formatter: (data) => {
            if (data.memberName) {
                return data.memberName.name
            }
        }
    };
    COLUMNS[prop] = {
        ...D_ITEMS[prop],
        width: 100,

    };
    F_ITEMS["memberId_search"] = {
        ...objBase,
        type: "select",
        ajax: {
            url: "/crossList?page=lawyer_member",
            keyLabel: "name",
            keyValue: "P1"
        },

    };
    F_ITEMS[prop] = {
        ...F_ITEMS["memberId_search"],
        rules: [{ required: true, message: "上传会员id" }]
    };



}
{
    let prop = "fileId", objBase = { label: "附件id", prop: "P1", }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = { ...objBase };
}
{
    let prop = "getCaseName", objBase = { label: "案件名称", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = {
        ...objBase, width: 100,
        formatter: (data) => {
            if (data.caseName) {
                return data.caseName.name
            }
        }
    };
    F_ITEMS[prop] = {
        ...objBase, type: "select",
        ajax: {
            url: "/crossList?page=lawyer_case",
            keyLabel: "name",
            keyValue: "P1"
        },
        rules: [{ required: true, message: "案件id" }]
    };
}

{
    let prop = "fileUrl", objBase = { label: "文件地址", prop: "url", }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = {
        ...objBase, type: "upload",
        uploadConfig: {
            limit: 1,
            listType: "text"
        },
        rules: [{ required: true, message: "还未上传文件" }]
    };
}
{
    let prop = "aaaa", objBase = { label: "0000", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = { ...objBase };
}
{
    let prop = "aaaa", objBase = { label: "0000", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = { ...objBase };
}
{
    let prop = "aaaa", objBase = { label: "0000", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = { ...objBase };
}
{
    let prop = "aaaa", objBase = { label: "0000", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 90 };
    F_ITEMS[prop] = { ...objBase };
}

//#endregion




//END:#region 诉讼案件列表配置(新)
{
    let listIndex = "list_case_unprocess"
    PUB.listCF[listIndex] = {
        customDetail: true, //使用自定义详情插槽
        focusMenu: true, //进行菜单聚焦
        flag: true,
        listIndex, //vuex对应的字段
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "案件" }, { value: "诉讼案件" }],
        findJsonDefault: {//初始查询参数
            $nor: [{ status: 8 }, { status: 9 }, { status: 10 }, { status: 15 }]
        },
        singleBtns: {
            addon: [
                util.cfList.sBtns.detail,
                util.cfList.sBtns.modify,
            ]
        },

        formDataAddInit: {
            createPerson: Number(localStorage.userId) //新增表单的初始数据
        },
        dynamicDict: [
            DYDICT.createPerson, DYDICT.areaId,
            DYDICT.reasonId, DYDICT.collaborator, DYDICT.personInCharge
        ],
        url: {
            list: "/crossList?page=lawyer_case", //列表接口
            add: "/crossAdd?page=lawyer_case", //新增接口
            modify: "/crossModify?page=lawyer_case", //修改接口
            detail: "/crossDetail?page=lawyer_case", //详情接口
            delete: "/crossDelete?page=lawyer_case" //删除接口
        },
        //-------列配置数组------- 
        columns: ["caseName", "caseId", "reasonId", "personInCharge", "caseStatus", "trialDate", "areaId",],
        //-------筛选表单字段数组------- 
        searchFormItems: ["caseId", "caseName_search",],
        //-------新增、修改表单字段数组------- 
        formItems: [
            "caseName", "collaborator", "personInCharge", "description2", "description",
            "baseInfo", "plaintiffInfo", "defendantInfo", "firstInstanceInfo", "guaranteeInfo",
            "secondInstanceInfo", "executionInfo", "collectionControl",
        ]

    }
    util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion



//END:#region 执行案件列表配置(新)

{
    let listIndex = "list_case_executing"
    PUB.listCF[listIndex] = { ...PUB.listCF["list_case_unprocess"] }
    //差异化配置
    let listCFAdd = {
        listIndex, //vuex对应的字段
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "案件" }, { value: "执行案件" }],
        // findJsonDefault: {
        //     status: 9//执行中状态
        // },
        findJsonDefault: {
            $or: [{ status: 9 }, { status: 10 }]
        },
        //-------列配置数组------- 
        columns: ["caseName", "caseId", "reasonId", "personInCharge", "caseStatus_executing", "trialDate", "areaId",],
    }
    Object.assign(PUB.listCF[listIndex], listCFAdd);//合并对象
    util.reformCFListItem(PUB.listCF[listIndex])

}
//END:#region 执行终本案件列表配置(新)-废弃

{
    let listIndex = "list_case_final_ex"
    PUB.listCF[listIndex] = { ...PUB.listCF["list_case_unprocess"] }
    //差异化配置
    let listCFAdd = {
        listIndex, //vuex对应的字段
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "案件" }, { value: "执行终本案件" }],
        findJsonDefault: {
            status: 10//执行终本状态
        },
        //-------列配置数组------- 
        columns: ["caseName", "caseId", "reasonId", "personInCharge", "caseStatus_final_ex", "trialDate", "areaId",],
    }
    Object.assign(PUB.listCF[listIndex], listCFAdd);//合并对象
    util.reformCFListItem(PUB.listCF[listIndex])

}

//END:#region 已结案的案件列表配置(新)

{
    let listIndex = "list_case_end"
    PUB.listCF[listIndex] = { ...PUB.listCF["list_case_unprocess"] }
    //差异化配置
    let listCFAdd = {
        listIndex, //vuex对应的字段
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "案件" }, { value: "归档案件" }],
        findJsonDefault: {
            $or: [{ status: 8 }, { status: 15 }]
        },
        //-------列配置数组------- 
        columns: ["caseName", "caseId", "reasonId", "personInCharge", "caseStatus_end", "trialDate", "areaId",],
    }
    Object.assign(PUB.listCF[listIndex], listCFAdd);//合并对象
    util.reformCFListItem(PUB.listCF[listIndex])

}

//#endregion



import list_remark from '@/assets/js/config/list_remark.js'
import list_message from '@/assets/js/config/list_message.js'
import list_area from '@/assets/js/config/list_area.js'

//TODO:会员列表配置
{
    let listIndex = "list_member"
    PUB.listCF[listIndex] = {
        listIndex, //vuex对应的字段
        focusMenu: true,//进行菜单聚焦
        twoTitle: "会员",
        flag: true,
        url: {
            list: "/crossList?page=lawyer_member", //列表接口
            add: "/crossAdd?page=lawyer_member", //新增接口
            modify: "/crossModify?page=lawyer_member", //修改接口
            detail: "/crossDetail?page=lawyer_member",
            delete: "/crossDelete?page=lawyer_member" //删除接口
        },
        //-------列配置数组-------
        columns: [
            "userName", "trueName", "role",
        ],
        searchFormItems: [
            "userName_search", "trueName_search",
        ],
        //-------详情字段数组-------
        detailItems: [
            // "caseCount", "fileCount", "msgCount", "remarkCount",
            "userId", "userName", "trueName", "password", "role",
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
            "userName", "trueName", "password", "role",
        ]
    }
    util.reformCFListItem(PUB.listCF[listIndex])
}
//TODO:附件列表配置
{
    let listIndex = "list_accessory"
    PUB.listCF[listIndex] = {
        search: true,
        searchTerm: { type: 'memberId', value: localStorage.userId },
        listIndex, //vuex对应的字段
        focusMenu: true,//进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "系统管理" }, { value: "附件列表" }],
        flag: true,
        isShowToolBar: false,

        singleBtns: {
            //按钮列表
            addon: [

                util.cfList.sBtns.detail,
            ],
        },

        dynamicDict: [{ page: "lawyer_member", populateColumn: "memberName", idColumn: "memberId", idColumn2: "P1" },
        { page: "lawyer_case", populateColumn: "caseName", idColumn: "caseId", idColumn2: "P1" },],
        url: {
            list: "/crossList?page=lawyer_file", //列表接口
            add: "/crossAdd?page=lawyer_file", //新增接口
            modify: "/crossModify?page=lawyer_file", //修改接口
            detail: "/crossDetail?page=lawyer_file",
            delete: "/crossDelete?page=lawyer_file" //删除接口
        },
        //-------列配置数组-------
        columns: [
            "caseIdToName", "fileName", "filecategory", "memberId",
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
            "fileName_search", "memberId_search",
        ],
        //-------详情字段数组-------
        detailItems: [
            "fileId", "fileName", "CreateTime", "memberId", "caseIdToName"
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
            "fileName", "filecategory", "fileUrl", "memberId", "caseId_select"
        ]
    }
    util.reformCFListItem(PUB.listCF[listIndex])
}






PUB.listCF.list_remark = list_remark
PUB.listCF.list_message = list_message
PUB.listCF.list_area = list_area
{
    let listIndex = "list_case_reason"
    PUB.listCF[listIndex] = {
        listIndex, //vuex对应的字段
        focusMenu: true,//进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "系统管理" }, { value: "案由" }],
        flag: true,
        url: {
            list: "/crossList?page=lawyer_case_reason", //列表接口
            add: "/crossAdd?page=lawyer_case_reason", //新增接口
            modify: "/crossModify?page=lawyer_case_reason", //修改接口
            delete: "/crossDelete?page=lawyer_case_reason" //删除接口
        },
        //-------列配置数组-------
        columns: ["reasonName", "CreateTime", "UpdateTime",],
        //-------筛选表单字段数组-------
        searchFormItems: ["reasonName_search"],
        //-------详情字段数组-------
        detailItems: ["reasonName", "CreateTime", "UpdateTime",],
        //-------新增、修改表单字段数组-------
        formItems: ["reasonName",]
    }
    util.reformCFListItem(PUB.listCF[listIndex])

}
export default {}