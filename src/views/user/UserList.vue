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
        <el-button type="success" @click="add">新增</el-button>
      </div>
    </section>
    <el-table :data="tableData" @sort-change="sortChange">
      <el-table-column prop="avatare" label="头像" width="80">
        <template slot-scope="scope">
          <img :src="serverUrl + scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column
        prop="uid"
        label="UID"
        width="100"
        sortable="custom"
      ></el-table-column>
      <el-table-column prop="tel" label="手机号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="date" label="注册日期"></el-table-column>
      <el-table-column
        prop="lastLoginTime"
        label="最后登录时间"
        sortable="custom"
      ></el-table-column>
      <el-table-column label="VIP开始时间">
        <template slot-scope="scope">
          {{ scope.row.vipStartTime | startTime }}
        </template>
      </el-table-column>
      <el-table-column label="VIP过期时间">
        <template slot-scope="scope">
          {{ scope.row.vipEndTime | endTime }}
        </template>
      </el-table-column>
      <el-table-column prop="vip" label="是否VIP">
        <template slot-scope="scope">
          {{ scope.row.vip ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="checkOrder(scope.row)"
            icon="el-icon-s-order"
            circle
            title="用户订单"
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
            @confirm="deleteItem(scope.row)"
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
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
    >
      <EditUser :selectedItem="selectedItem" @close="closeDialog" />
    </el-dialog>
  </section>
</template>
<script>
  import mixin from '@/mixin/mixin'
  import EditUser from './EditUser'
  import moment from 'moment'
  export default {
    name: 'UserList',
    mixins: [mixin],
    data() {
      return {
        dialogVisible: false,
        selectedItem: null,
        form: {
          searchContent: '',
        },
        pageSize: 15,
        currentPage: 1,
        total: 0,
        tableData: [],
        sort: { order: '', prop: '' },
      }
    },
    components: {
      EditUser,
    },
    filters: {
      startTime(value) {
        if (!value) {
          return '无'
        } else {
          return moment(value).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      endTime(value) {
        if (!value) {
          return '无'
        } else if (value > 0) {
          return moment(value).format('YYYY-MM-DD HH:mm:ss')
        } else {
          return '永久'
        }
      },
    },
    methods: {
      add() {
        this.selectedItem = null
        this.dialogVisible = true
      },
      editItem(item) {
        this.selectedItem = item
        this.dialogVisible = true
      },
      async deleteItem(item) {
        const res = await this.$delete(`${this.API.user}/${item._id}`, {
          params: {
            tel: item.tel,
          },
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
        const res = await this.$get(this.API.user, {
          params: {
            searchContent: this.form.searchContent,
            pageSize: this.pageSize,
            currentPage: this.currentPage - 1,
            sort: this.sort,
          },
        })
        if (res.data.code == '1000') {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
      checkOrder(item) {
        this.$router.push(`order?tel=${item.tel}`)
      },
      closeDialog() {
        this.dialogVisible = false
        this.getData()
      },
      sortChange(item) {
        this.sort = {
          order: item.order,
          prop: item.prop,
        }
        this.getData()
      },
    },
    created() {
      this.getData()
    },
  }
</script>
<style lang="less" scoped>
  td img {
    width: 40px;
  }
</style>
