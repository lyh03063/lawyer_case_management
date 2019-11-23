import lodash from 'lodash'//导入lodash方法库

let arrCaseStatus = [
    { value: 11, label: "委托移交" },
    { value: 1, label: "待立案" },
    { value: 2, label: "已立案待保全" },
    { value: 3, label: "已保全" },
    { value: 6, label: "调解中" },
    { value: 7, label: "收款监督" },
    { value: 4, label: "待一审开庭" },
    { value: 12, label: "待一审出判" },
    { value: 5, label: "待二审开庭" },
    { value: 13, label: "待二审出判" },
    { value: 9, label: "执行中" },
    { value: 10, label: "执行终本" },
    { value: 14, label: "代理费清收" },
    { value: 8, label: "已结案" },
    { value: 15, label: "已退案" },
  ];
  
  var dictCaseStatus = lodash.keyBy(arrCaseStatus, "value");
  
  window.arrCaseStatus = arrCaseStatus
  window.dictCaseStatus = dictCaseStatus

  export default {}
