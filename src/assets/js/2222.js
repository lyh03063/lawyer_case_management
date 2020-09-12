
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