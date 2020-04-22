<template>
    <el-dialog
      title="请重新登录"
      width="30%"
      :visible="showTimeoutLogin"
      :before-close="turnOffShowLoginBox"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" label-width="4em" :rules="rules">
        <el-form-item label="账号">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="text" size="medium" @click="clearSessionAndBack">
            <i class="el-icon-arrow-left" />退出
          </el-button>
          <el-button size="small" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
export default {
  name: "LoginBox",
  data() {
    return {
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      form: {
        username: '',
        password: '',
      },
    };
  },
  computed: mapState(['showTimeoutLogin']),
  methods: {
    ...mapMutations([
      'turnOffShowLoginBox',
    ]),
    ...mapActions([
      'clearSessionAndBack',
      'relogin',
    ]),
    submit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        this.relogin(this.form)
      })
    },
  },
}
</script>

<style scoped>

</style>
