<template>
  <div class="material">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="rn"
        label="排名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="nick_name"
        label="昵称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="联系电话">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'Material',
  methods: {
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
      tableData: []
    };
  },
  created() {
    this.getMaterialList(1);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
