<template>
  <div class="main">
    <!-- <div class="box-intro">

    </div>-->

    <div class="TAC">
      <space height="30"></space>

      <div class="home-box">
        <h1 class="FS34 FWN " style="margin-bottom:70px;">欢迎使用案件管理系统</h1>
        <div class="box_table">
          <div class="box_group">
            <label>
              <span class="iconfont iconanquanzhuye"></span>
            </label>
            <span>
              案件权限管理
              <br />安全可控
            </span>
          </div>
          <div class="box_group">
            <label>
              <span class="iconfont iconzhifeiji"></span>
            </label>
            <span>
              多维数据展示
              <br />快捷方便
            </span>
          </div>
          <div class="box_group">
            <label>
              <span class="iconfont icongaoxiaoguohu"></span>
            </label>
            <span>
              状态变更提醒
              <br />高效协同
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style lang="scss" >
@import "@/assets/css/util.scss"; //导入公共样式文件
.home-box {
  padding-top: 20px;
  margin-top: 50px;
  // background-color: rgb(230, 230, 230);

  margin-left: auto;

  margin-right: auto;
  border-radius: 20px;
  padding-bottom: 1px;
}
.home-box ul li {
  text-align: left;
  list-style-type: disc;
  line-height: 30px;
}
.remark-box {
  margin: 20px 30px;
}

.box-intro {
  background-image: url(//qn-dmagic.dmagic.cn/202006031441353131_78201_%E8%B0%A8%E5%BA%A6%E5%BE%8B%E5%B8%88%E4%BA%8B%E5%8A%A1%E6%89%80-logo%E5%A4%A7%E5%9B%BE.jpg);
  background-position: center center;
  width: 400px;
  background-color: #000;
  background-size: 200%;
  margin: 160px auto;

  height: 200px;
}




</style>

<style scoped>
.main{
  background-image: url(http://img1.dmagic.cn/bg_sys.png?1);
  background-position: center bottom 30px;
  background-repeat: no-repeat;

  height: calc(100vh - 73px);
}
/*外部节点*/
.box_table {
  width: 900px;
  padding: 0px 10px; /**/
  flex-wrap: wrap; /**/
  display: flex; /**/
  margin: 0 auto;
}
/**/
.box_group {
  display: flex; /**/
  align-items: center; /**/
  margin: 0 0 0 0; /**/
  padding: 5px; /**/
  width: 33.3%; /*宽度*/
}
/**/
.box_group > label {
  width: 100px; /*宽度*/
  margin-right: 10px; /**/
  text-align: right; /**/
  color: #999999; /**/
}
/**/
.box_group > span {
  font-size: 20px; /**/
  flex: 1;
  text-align: left; /**/
}
/**/
.box_group .iconfont {
  color: #ceab71; /**/
  font-size: 50px; /**/
}
</style>