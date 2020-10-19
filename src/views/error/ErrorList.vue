<template>
  <section class="table-page">
    <section class="top-area">
      <div class="form">
        <el-input
          v-model="form.searchContent"
          placeholder="请输入厂商"
        ></el-input>
        <el-select
          v-model="form.system"
          placeholder="请选择系统"
          @change="getData(true)"
        >
          <el-option label="全部" value="all"></el-option>
          <el-option label="android" value="android"></el-option>
          <el-option label="ios" value="ios"></el-option>
        </el-select>
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
          @onConfirm="deleteBatch"
        >
          <el-button type="danger" slot="reference">批量删除</el-button>
        </el-popconfirm>
      </div>
    </section>
    <el-table :data="tableData" @selection-change="handleSelectionChange">
      >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="appVersion" label="app版本"></el-table-column>
      <el-table-column prop="brand" label="厂商"></el-table-column>
      <el-table-column prop="system" label="系统类型"></el-table-column>
      <el-table-column prop="systemVersion" label="系统版本"></el-table-column>
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
            @onConfirm="deleteSingle(scope.row._id)"
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
      <ErrorDetails :item="selectedItem" />
    </el-dialog>
  </section>
</template>
<script>
  import ErrorDetails from './ErrorDetails'
  import mixin from '@/mixin/mixin'
  export default {
    name: 'ErrorList',
    mixins: [mixin],
    data() {
      return {
        dialogVisible: false,
        selectedItem: null,
        form: {
          system: 'all',
          searchContent: '',
        },
        pageSize: 15,
        currentPage: 1,
        total: 0,
        tableData: [],
      }
    },
    components: { ErrorDetails },
    methods: {
      checkItem(item) {
        this.dialogVisible = true
        this.selectedItem = item
      },
      deleteBatch() {
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
      async deleteItems(ids) {
        const res = await this.$post(`${this.API.error}/delete`, {
          ids,
          type: this.form.type,
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
        const res = await this.$get(this.API.error, {
          params: {
            system: this.form.system,
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
