<template>
  <section class="table-page">
    <section class="top-area">
      <div class="form"></div>
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
      <el-table-column prop="planId" label="id"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="originalPrice" label="原价"></el-table-column>
      <el-table-column prop="currentPrice" label="现价"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
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
    <el-dialog
      title="编辑"
      v-if="editDialogVisible"
      :visible.sync="editDialogVisible"
      :close-on-click-modal="false"
      width="60%"
    >
      <EditPlan
        :selectedItem="selectedItem"
        @success="getData"
        @close="closeEditDialog"
      />
    </el-dialog>
  </section>
</template>
<script>
  import mixin from '@/mixin/mixin'
  import EditPlan from './EditPlan'
  export default {
    name: 'PlanList',
    mixins: [mixin],
    data() {
      return {
        editDialogVisible: false,
        selectedItem: null,
        checkedItems: [],
        tableData: [],
      }
    },
    components: {
      EditPlan,
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
        const res = await this.$post(this.API.deletePlan, {
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
        const res = await this.$get(this.API.plan)
        if (res.data.code == '1000') {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
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
