<template>
  <div class="activity-list">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-form status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      api.get(this, {
        userAccount: this.username,
        userPass: this.password
      }, (response) => {
        console.log(response);
        if (response.body.resCode == "0") {
          this.$router.go(-1)
        } else {
          this.$message(response.body.resMsg);
        }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
