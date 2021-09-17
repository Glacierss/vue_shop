<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <!-- username -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item prop="password">
          <el-input
            type="password"
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },

      // 这是表单的验证规则对象
      loginFormRules: {
        //   验证用户名是否合法
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度在3-10个字符",
            trigger: "blur",
          },
        ],
        //   验证密码是否合法
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "长度在6-15个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //   点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    // 点击登录按钮，进行登录判断
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        else {
          const result = await this.$http.post("login", this.loginForm);
          if (result.data.meta.status !== 200)
            return this.$message.error("用户名或密码错误！");
          this.$message.success("您已成功登录！");
          // 1.将登录成功之后的token保存到客户端的sessionStorage中
          //      项目中的其他Api接口必须登录之后才能访问
          //      token只有在当前网站打开期间生效，所以将token保存在sessionStorage中
          sessionStorage.setItem("token", result.data.data.token);
          // 2.通过编程式路由导航跳转至后台主页，路由地址是/home
          this.$router.push("/home");
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);

  .avatar_box {
    background-color: #fff;
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 15px rgb(199, 199, 199);
    position: absolute;
    left: 50%;
    // 根据本盒子高度130px进行百分比计算
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>