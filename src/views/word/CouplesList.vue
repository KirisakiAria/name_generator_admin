<template>
  <section class="table-page">
    <section class="top-area">
      <div class="form">
        <el-input
          v-model="form.searchContent"
          placeholder="请输入搜索内容"
        ></el-input>
        <el-select
          v-model="form.type"
          placeholder="请选择类型"
          @change="getData(true)"
        >
          <el-option label="中国风" value="中国风"></el-option>
          <el-option label="日语" value="日语"></el-option>
        </el-select>
        <el-select
          v-model="form.showable"
          placeholder="是否展示"
          @change="getData(true)"
        >
          <el-option label="全部" value="all"></el-option>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
        <el-select
          v-model="form.length"
          placeholder="请选择字数"
          @change="getData(true)"
        >
          <el-option
            :label="item"
            :value="item"
            v-for="(item, index) in 9"
            :key="index"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="getData(true)">
          搜索
        </el-button>
        <el-button type="primary" @click="addToWordBatch">添加到词库</el-button>
      </div>
      <div class="right">
        <el-button type="primary" @click="outputDialogVisible = true">
          导出
        </el-button>
        <el-button type="primary" @click="toggleShowable">
          批量显示/隐藏
        </el-button>
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
    <el-table :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column label="展示">
        <template slot-scope="scope">
          {{ scope.row.showable | showable }}
        </template>
      </el-table-column>
      <el-table-column prop="word" label="词语">
        <template slot-scope="scope">
          <span>{{ scope.row.words[0] }}</span>
          <span>{{ scope.row.words[1] }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="checkLikedUsers(scope.row)"
            icon="el-icon-user"
            circle
            title="查看点赞用户"
          ></el-button>
          <el-button
            type="success"
            @click="addToWordSingle(scope.row)"
            circle
            title="添加到词语列表"
          >
            <i class="iconfont icon-word-dictionary"></i>
          </el-button>
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
      <EditCouples
        :selectedItem="selectedItem"
        :type="form.type"
        @success="getData"
        @close="closeEditDialog"
      />
    </el-dialog>
    <el-dialog
      title="导出"
      v-if="outputDialogVisible"
      :visible.sync="outputDialogVisible"
      :close-on-click-modal="false"
      width="60%"
    >
      <CouplesOutputFile @close="closeOutputDialog" />
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
  import EditCouples from './EditCouples'
  import CouplesOutputFile from './CouplesOutputFile'
  import LikedUsersDetails from '../LikedUsersDetails'
  export default {
    name: 'CouplesList',
    mixins: [mixin],
    data() {
      return {
        outputDialogVisible: false,
        editDialogVisible: false,
        likedUserDialogVisible: false,
        selectedItem: null,
        checkedItems: [],
        form: {
          type: '中国风',
          length: 2,
          searchContent: '',
          showable: 'all',
        },
        pageSize: 15,
        currentPage: 1,
        total: 0,
        tableData: [],
        likedUsers: [],
      }
    },
    components: {
      EditCouples,
      CouplesOutputFile,
      LikedUsersDetails,
    },
    methods: {
      addToWordBatch() {
        if (!this.checkedItems.length) {
          return this.$message({
            showClose: true,
            message: '请至少选择一项',
            type: 'error',
          })
        }
        this.addToWordList(this.checkedItems)
      },
      addToWordSingle(id) {
        this.addToWordList([id])
      },
      async addToWordList(items) {
        const res = await this.$post(this.API.addToWordList, {
          wordList: items,
        })
        if (res.data.code == '1000') {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success',
          })
        }
      },
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
        const res = await this.$post(this.API.deleteCouples, {
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
        const res = await this.$get(this.API.couples, {
          params: {
            ...this.form,
            pageSize: this.pageSize,
            currentPage: this.currentPage - 1,
          },
        })
        if (res.data.code == '1000') {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
      closeEditDialog() {
        this.editDialogVisible = false
        this.getData()
      },
      closeOutputDialog() {
        this.outputDialogVisible = false
      },
      handleSelectionChange(val) {
        this.checkedItems = val
      },
      async toggleShowable() {
        if (this.form.showable === 'all') {
          return this.$message({
            showClose: true,
            message: '修改显示时请不要选择“全部”',
            type: 'error',
          })
        }
        const res = await this.$post(this.API.toggleshowable, {
          type: this.form.type,
          items: this.checkedItems,
          showable: !this.form.showable,
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
      checkLikedUsers(item) {
        this.likedUsers = item.likedUsers
        this.likedUserDialogVisible = true
      },
    },
    created() {
      this.getData()
    },
  }
</script>
<style lang="less" scoped>
  .cell {
    span {
      vertical-align: baseline;
      &:first-child {
        margin-right: 20px;
      }
    }
  }
  .icon-word-dictionary {
    font-size: 14px;
  }
</style>
