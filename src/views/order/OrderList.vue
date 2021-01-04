<template>
  <section class="table-page">
    <section class="top-area">
      <div class="form">
        <el-input
          v-model="form.searchContent"
          placeholder="请输入手机号"
        ></el-input>
        <el-date-picker
          v-model="form.time"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
          :picker-options="pickerOptions"
        ></el-date-picker>
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
      <el-table-column prop="orderNo" label="订单ID"></el-table-column>
      <el-table-column prop="body" label="订单描述"></el-table-column>
      <el-table-column prop="tel" label="手机号"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">
          {{ moment(scope.row.time).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="支付方式">
        <template slot-scope="scope">
          {{ transferPaymentMethodName(scope.row.paymentMethod) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status ? '已完成' : '未完成' }}
        </template>
      </el-table-column>
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
      <EditOrder
        :selectedItem="selectedItem"
        :paymentMethodList="paymentMethodList"
        @success="getData"
        @close="closeEditDialog"
      />
    </el-dialog>
  </section>
</template>
<script>
  import mixin from '@/mixin/mixin'
  import EditOrder from './EditOrder'
  import moment from 'moment'
  export default {
    name: 'OrderList',
    mixins: [mixin],
    data() {
      return {
        form: {
          searchContent: '',
          time: [],
        },
        editDialogVisible: false,
        selectedItem: null,
        checkedItems: [],
        pageSize: 15,
        currentPage: 1,
        total: 0,
        tableData: [],
        paymentMethodList: [],
        moment: moment,
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              },
            },
          ],
        },
      }
    },
    components: {
      EditOrder,
    },
    methods: {
      transferPaymentMethodName(value) {
        const item = this.paymentMethodList.find(e => e.paymentId == value)
        if (item) {
          return item.name
        } else {
          return '华为支付'
        }
      },
      async getPaymentMethodData() {
        const res = await this.$get(this.API.paymentMethod, {
          params: {
            ...this.form,
            pageSize: this.pageSize,
            currentPage: this.currentPage - 1,
          },
        })
        if (res.data.code == '1000') {
          this.paymentMethodList = res.data.data.list
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
        const res = await this.$post(this.API.deleteOrder, {
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
        const res = await this.$get(this.API.order, {
          params: {
            searchContent: this.form.searchContent,
            startTime: this.form.time ? this.form.time[0] : '',
            endTime: this.form.time ? this.form.time[1] : '',
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
      handleSelectionChange(val) {
        this.checkedItems = val
      },
    },
    created() {
      if (this.$route.query.tel) {
        this.form.searchContent = this.$route.query.tel
      }
      this.getPaymentMethodData()
      this.getData()
    },
  }
</script>
