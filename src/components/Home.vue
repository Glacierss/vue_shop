<template>
  <div>
    <el-button type="info" @click="logOut">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logOut() {
      //   点击退出按钮，清空sessionStorage
      sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
</style>