<template>
  <section class="table-page">
    <section class="top-area">
      <div class="form">
        <el-input
          v-model="form.searchContent"
          placeholder="请输入搜索内容"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getData(true)">
          搜索
        </el-button>
      </div>
      <div class="right">
        <el-popconfirm
          class="pop-confirm"
          confirmButtonText="好的"
          cancelButtonText="不用了"
          icon="el-icon-info"
          iconColor="red"
          title="确定删除吗？"
          @confirm="deleteBatch"
        >
          <el-button type="danger" slot="reference">批量删除</el-button>
        </el-popconfirm>
      </div>
    </section>
    <el-table :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="tel" label="手机号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="email" label="联系邮箱"></el-table-column>
      <el-table-column prop="date" label="反馈时间"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="checkItem(scope.row)"
            icon="el-icon-document"
            circle
            title="查看详情"
          ></el-button>
          <el-popconfirm
            class="pop-confirm"
            confirmButtonText="好的"
            cancelButtonText="不用了"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除吗？"
            @confirm="deleteSingle(scope.row._id)"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              title="删除"
              slot="reference"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <section class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        :total="total"
        @current-change="getData"
      ></el-pagination>
    </section>
    <el-dialog
      title="详情"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
    >
      <FeedbackDetails :selectedItem="selectedItem" />
    </el-dialog>
  </section>
</template>
<script>
  import FeedbackDetails from './FeedbackDetails'
  import mixin from '@/mixin/mixin'
  export default {
    name: 'FeedbackList',
    mixins: [mixin],
    data() {
      return {
        dialogVisible: false,
        selectedItem: null,
        checkedItems: [],
        form: {
          searchContent: '',
        },
        pageSize: 15,
        currentPage: 1,
        total: 0,
        tableData: [],
      }
    },
    components: { FeedbackDetails },
    methods: {
      checkItem(item) {
        this.selectedItem = item
        this.dialogVisible = true
      },
      deleteBatch() {
        console.log(1)
        if (!this.checkedItems.length) {
          return this.$message({
            showClose: true,
            message: '请至少选择一项',
            type: 'error',
          })
        }
        this.deleteItems(this.checkedItems)
      },
      deleteSingle(id) {
        this.deleteItems([id])
      },
      async deleteItems(items) {
        const res = await this.$post(`${this.API.feedback}/delete`, {
          items,
        })
        if (res.data.code == '1000') {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success',
          })
          this.getData()
        }
      },
      async getData(search = false) {
        if (search === true) {
          this.currentPage = 1
        }
        const res = await this.$get(this.API.feedback, {
          params: {
            searchContent: this.form.searchContent,
            pageSize: this.pageSize,
            currentPage: this.currentPage - 1,
          },
        })
        if (res.data.code == '1000') {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
      closeDialog() {
        this.dialogVisible = false
      },
      handleSelectionChange(val) {
        this.checkedItems = val
      },
    },
    created() {
      this.getData()
    },
  }
</script>
