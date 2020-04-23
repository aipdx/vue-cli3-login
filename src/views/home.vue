<template>
  <div>
    <h1>登录成功</h1>
    <h2 @click="loginout">退出</h2>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getClassify } from '../api/login.js'
export default {
  name: "home",
  mounted() {
    this.getUserInfo()
  },
  methods:{
    ...mapActions([
      'loginout'
    ]),
    getUserInfo() {
      getClassify().then(res => {
        if (res.code === 1) {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
