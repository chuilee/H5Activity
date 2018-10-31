<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :router="false"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1" :route="{name: 'home'}">设计榜单</el-menu-item>
          <el-menu-item index=""><a href="https://tongji.baidu.com/web/welcome/login" target="_blank" style="display: block;">H5日访问量</a></el-menu-item>
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
      activeIndex: '1'
    };
  },
  created() {
    console.log(this.$route)
    this.activeIndex = this.$route.path;
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

