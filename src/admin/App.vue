<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :router="true"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="userList">用户管理</el-menu-item>
          <el-menu-item index="material">素材管理</el-menu-item>
          <el-menu-item index="activityList">活动排行榜</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: 'userList'
    };
  },
  created() {
    this.activeIndex = this.$route.name;
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key)
    }
  }
};
</script>
<style lang="scss" src="./assets/scss/public.scss"></style>
<style lang="scss" scoped>
  .el-header {
    background: rgb(84, 92, 100);
  }
</style>

