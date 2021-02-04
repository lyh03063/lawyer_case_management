<template>
  <div>
    <div class="dialog-cover"></div>
    <div class="login-father-box">
      <div class="login-box">
        <h1>案件管理系统</h1>
        <h2>管理员登录</h2>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="userName">
            <div class>
              <el-input
                v-model.number="ruleForm.userName"
                placeholder="请输入用户名"
              >
                <template slot="prepend">用户名</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input
              v-model="ruleForm.passWord"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="WP100"
              @click="submitForm('ruleForm')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    // 饿了么定义的登录框校验
    var validateuserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入管理员账户"));
      } else {
        callback(); //通过校验
      }
    };
    var validatepassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      else {
        callback(); //通过校验
      }
    };

    return {
   
      objURL: {
        list: "/crossList?page=tangball_admin"
      },
      ruleForm: {
        //表单数据.
        userName: "",//熊旋
        passWord: ""//123456
      },
      rules: {
        //校验规则，需要定在el-form的rules属性上
        // validateuserName校验器是一个回调函数
        // trigger: "blur" 规则的触发方式，失焦事件
        userName: [{ validator: validateuserName, trigger: "blur" }],
        passWord: [{ validator: validatepassWord, trigger: "blur" }]
      },
      userLog: {}
    };
  },

  methods: {
    
    // 用户登录的方法
    async userLogin() {
      let resp = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + "/crossDetail?page=lawyer_member",
        data: {
          findJson: {
            user: this.ruleForm.userName,
            password: this.ruleForm.passWord
          }
        } //传递参数
      }).catch(function (error) {
        alert("异常:" + error);
      });
      let docMember = lodash.get(resp, `data.doc`);
      console.log(`docMember:###`, docMember);
      if (!docMember) return this.$message.error("用户名或密码错误");
      this.$message({ message: '登录成功', type: 'success' });
      // 如果是超级管理员登录
      if (docMember.role == 1) {
        // 超级管理员可以看到所有页面,所以不用设置id
        localStorage.userId = docMember.P1,
          // 超级管理员登录为1
          localStorage.superAdmin = 1
      } else {
        // 普通管理员只能看到关于他的信息，保存普通会员的id
        localStorage.userId = docMember.P1
        // 普通管理员登录为1 
        localStorage.commonMerber = 1
      }
      // 用户登录
      localStorage.caseManageIsLogin = 1;
      localStorage.loginUserName = docMember.user//存储用户名
      localStorage.loginPassword = docMember.password//存储密码-待优化
      this.$router.push({ path: "/listhome" });

    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        //表单组件执行validate校验方法
        if (valid) {
          //如果validate为真执行以下放方法
          this.userLogin()
        }
      });
    }
  },
  beforeCreate() {
    // 页面渲染钱判断用户是否已经登录,已登录跳回home界面
    if (localStorage.caseManageIsLogin == 1) {
      this.$message({
        message: '登录成功',
        type: 'success'
      });
      setTimeout(() => {
        this.$router.push({ path: "/listHome" });
      }, 10);
    }
  },
  mounted() {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
.login-box {
  width: 100%;
  padding: 40px;

  h1 {
    padding: 20px 20px 20px 5px;
    font-size: 28px;
    font-weight: 400;
  }
  h2 {
    margin: 20px 20px 20px 5px;
    padding-left: 5px;
    color: #999999;
    font-size: 16px;
    font-weight: 400;
  }
}

.login-father-box {
  /*弹窗绝对居中*/
  width: 500px;
  height: 400px;
  border: 1px solid #000;
  background: #ffffff;
  margin-left: -250px;
  margin-top: -200px;
  position: fixed;
  top: 50%;
  left: 50%;
}
@media screen and (max-width: 768px) {
  .login-father-box {
    border: none;
    top: 0;
    left: 0;
    width: 100%;
    margin-top: 0;
    margin-left: 0;
  }
  .dialog-cover {
    display: none;
  }
}

.login-form {
  width: 100%;
  margin: 20px;
}
/* 遮罩层 */
.dialog-cover {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #f3f9fa;
  left: 0;
  top: 0;
  opacity: 0.5;
  /* display: none; */
}
</style>
