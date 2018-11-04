<template>
  <div class="material">
    <el-row :gutter="20">
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <div v-html="materials[0]" style="height: 380px; width: 300px; margin: 0 auto;"></div>
            <div style="padding: 14px;">
              <span>左侧</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <div v-html="materials[1]" style="height: 380px; width: 300px; margin: 0 auto;"></div>
            <div style="padding: 14px;">
              <span>右侧</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <div class="front-side" v-html="materials[2]" style="height: 380px; width: 300px; margin: 0 auto;"></div>
            <div style="padding: 14px;">
              <span>正面</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <div class="back-side" v-html="materials[3]" style="height: 380px; width: 300px; margin: 0 auto;"></div>
            <div style="padding: 14px;">
              <span>后面</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="uploadimgs[0]" class="image">
            <div style="padding: 14px;">
              <span>左侧面图片</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="uploadimgs[1]" class="image">
            <div style="padding: 14px;">
              <span>右侧面图片</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'Material',
  methods: {
    getMaterial(work_id) {
      api.getMaterialList(this, {
        work_id: work_id
      }, (response) => {
        this.centerDialogVisible = true;
        console.log(response.body)
        const sides = response.body.repBody[0]
        this.materials = [sides.left, sides.right, sides.front, sides.back];
        this.uploadimgs = sides.img_url.split(';').length == 2 ? sides.img_url.split(';') : [sides.img_url, sides.img_url]
        console.log(this.materials)
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getMaterialList(1);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getMaterialList(val);
    },
    getMaterialList(pageNum) {
      this.currentPage = pageNum;
      api.getMaterialList(this, {
        work_id: 20,
        page_size: this.pageSize,
        page_num: pageNum
      }, (response) => {
        console.log(response)
        if (response.body.resCode == '0') {
          if (response.body.repBody.length) {
            this.tableData = response.body.repBody;
            this.total = parseInt(response.body.repBody[0].total, 10);
          } else {
            this.$message('暂无相关数据！');
          }
        } else {
          this.$message(response.body.resMsg);
        }

      })
    }
  },
  data() {
    return {
      currentPage: 0,
      total: 0,
      pageSize: 10,
      materials: [],
      tableData: []
    };
  },
  created() {
    this.getMaterial(this.$route.params.id);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img  {
    max-width: 100%;
  }
</style>
