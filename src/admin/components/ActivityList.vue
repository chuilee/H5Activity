<template>
  <div class="activity-list">
    <el-table
      :data="tableData"
      :default-sort="{prop: 'like', order: 'ascending'}"
      @sort-change="sortChange"
      style="width: 100%">
      <el-table-column
        prop="rank"
        label="排名"
        sortable="custom"
        width="180">
      </el-table-column>
      <el-table-column
        prop="work_id"
        label="作品编号">
      </el-table-column>
      <el-table-column
        label="用户头像"
        width="180">
        <template slot-scope="scope">
          <img :src="scope.row.img_url" />
        </template>
      </el-table-column>
      <el-table-column
        prop="nick_name"
        label="用户名称">
      </el-table-column>
      <el-table-column
        prop="rn"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="ctime"
        sortable="custom"
        :formatter="formatter"
        label="提交时间">
      </el-table-column>
      <el-table-column
        label="最终效果"
        width="180">
        <template slot-scope="scope">
          <img :src="scope.row.img_url" />
        </template>
      </el-table-column>
      <el-table-column
        prop="like"
        @sort-method="sortMethod"
        sortable="custom"
        label="当前票数"
        width="180">
      </el-table-column>
      <el-table-column
        label="设计图片">
        <template slot-scope="scope">
          <a href="javascript:;" @click="getMaterial(scope.row.work_id, scope.row.img_url)">查看图片</a>
        </template>
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
    <el-dialog
      title="素材展示"
      :fullscreen="true"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="materials[5]" class="image">
            <div style="padding: 14px;">
              <span>整体效果</span>
            </div>
          </el-card>
        </el-col>
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
            <div v-html="materials[2]" style="height: 380px; width: 300px; margin: 0 auto;"></div>
            <div style="padding: 14px;">
              <span>正面</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <div v-html="materials[3]" style="height: 380px; width: 300px; margin: 0 auto;"></div>
            <div style="padding: 14px;">
              <span>后面</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="materials[4]" class="image">
            <div style="padding: 14px;">
              <span>侧面图片</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'ActivityList',
  methods: {
    getMaterial(work_id, img_url) {
      api.getMaterialList(this, {
        work_id: work_id
      }, (response) => {
        this.centerDialogVisible = true;
        console.log(response.body)
        const sides = response.body.repBody[0]
        this.materials = [sides.left, sides.right, sides.front, sides.back, sides.img_url];
        this.materials.push(img_url);
        console.log(this.materials)
      })
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getWorksList(1, this.type, this.order);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getWorksList(val, this.type, this.order);
    },
    getWorksList(pageNum, type, order) {
      this.$router.push({
        name: 'activityList',
        params: {
          page: pageNum
        }
      })
      this.currentPage = pageNum;
      api.getWorksList(this, {
        page_size: this.pageSize,
        page_num: pageNum,
        type: type,
        order: order,
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
    },
    formatter(row, column) {
      return row.ctime.split(' ')[0];
    },

    sortChange(order) {
      let page = this.currentPage;
      let type = order.prop == 'ctime' ? 'time' : 'like';
      let sort = order.order == 'descending' ? 'desc' : 'asc';
      this.getWorksList(page, type, sort);
    },

    sortMethod(a, b) {
    }
  },
  data() {
    return {
      currentPage: 0,
      total: 0,
      pageSize: 10,
      tableData: [],
      centerDialogVisible: false,
      materials: [],
      type: 'like',
      order: 'desc'
    };
  },
  created() {

  },

  mounted() {
    this.currentPage = parseInt(this.$route.params.page, 10)
    this.getWorksList(this.currentPage, this.type, this.order);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  table img {
    width: 160px;
  }

  .el-card__body img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 380px;
  }

  .el-col {
    height: 500px;
  }
</style>
