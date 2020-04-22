<template>
  <div class="login-wrapper">
    <div class="login-box">
      <h2 class="g-ta-c g-f-600 g-fz-18">欢迎登录</h2>
      <div class="g-mt-20">
        <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="登录名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" effect="dark" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" style="width: 380px;" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--<router-link to="/home">去首页</router-link>-->
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      labelPosition: 'right',//文字的对齐方式left、right、top
      ruleForm: {
        name: '',
        password: '',
      },
      rules: { //验证规则
        name:[{ required: true, message: '请输入登录名', trigger: 'blur' },],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min:6 , max:16, message : '请输入6到16位字母、英文符号或数字',trigger : 'blur'}
        ],
      }
    }
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            username: this.ruleForm.name,
            password: this.ruleForm.password,
          }
          this.$store.dispatch('login',param)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped lang="less">
.login-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #D9D9D9;
  .login-box {
    padding: 15px 20px 15px 0;
    width: 500px;
    margin: 20% auto;
    background-color: #fff;
    /*box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.5);*/
  }
}
</style>
