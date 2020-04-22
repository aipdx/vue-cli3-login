<template>
  <div>
    <h1>登录成功</h1>
    <h2 @click="logout">退出</h2>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "home",
  methods:{
    ...mapActions([
      'logout'
    ]),
  }
}
</script>

<style scoped>

</style>
