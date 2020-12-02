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
        <el-button type="success" @click="add">新增</el-button>
      </div>
    </section>
    <el-table
      ref="datatable"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="chinese.title" label="中文标题"></el-table-column>
      <el-table-column prop="japanese.title" label="日文标题"></el-table-column>
      <el-table-column prop="date" label="时间"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="checkItem(scope.row)"
            icon="el-icon-user"
            circle
            title="查看点赞用户"
          ></el-button>
          <el-button
            type="primary"
            @click="editItem(scope.row)"
            icon="el-icon-edit"
            circle
            title="编辑"
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
      title="编辑"
      v-if="editDialogVisible"
      :visible.sync="editDialogVisible"
      :close-on-click-modal="false"
      width="60%"
    >
      <EditInspiration
        :selectedItem="selectedItem"
        @success="getData"
        @close="closeEditDialog"
      />
    </el-dialog>
    <el-dialog
      title="点赞用户"
      v-if="likedUserDialogVisible"
      :visible.sync="likedUserDialogVisible"
      :close-on-click-modal="false"
      width="60%"
    >
      <LikedUsersDetails :likedUsers="likedUsers" />
    </el-dialog>
  </section>
</template>
<script>
  import mixin from '@/mixin/mixin'
  import EditInspiration from './EditInspiration'
  import LikedUsersDetails from './LikedUsersDetails'
  export default {
    name: 'InspirationList',
    mixins: [mixin],
    data() {
      return {
        outputDialogVisible: false,
        editDialogVisible: false,
        selectedItem: null,
        checkedItems: [],
        form: {
          searchContent: '',
        },
        pageSize: 15,
        currentPage: 1,
        total: 0,
        tableData: [],
        likedUserDialogVisible: false,
        likedUsers: [],
      }
    },
    components: {
      EditInspiration,
      LikedUsersDetails,
    },
    methods: {
      add() {
        this.selectedItem = null
        this.editDialogVisible = true
      },
      editItem(item) {
        this.selectedItem = item
        this.editDialogVisible = true
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
      async deleteItems(items) {
        const res = await this.$post(this.API.deleteInspiration, {
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
        const res = await this.$get(this.API.inspiration, {
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
      checkItem(item) {
        this.likedUsers = item.likedUsers
        this.likedUserDialogVisible = true
      },
      closeEditDialog() {
        this.editDialogVisible = false
        this.getData()
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
