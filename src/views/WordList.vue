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
          @change="getData"
        >
          <el-option label="中国风" value="中国风"></el-option>
          <el-option label="日语" value="日语"></el-option>
        </el-select>
        <el-select
          v-model="form.number"
          placeholder="请选择字数"
          @change="getData"
        >
          <el-option
            :label="item"
            :value="item"
            v-for="(item, index) in 5"
            :key="index"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="getData">
          搜索
        </el-button>
      </div>
      <div class="right">
        <el-button type="success" @click="add">新增</el-button>
      </div>
    </section>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="word" label="词语"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="editItem(scope.row)"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-popconfirm
            class="pop-confirm"
            confirmButtonText="好的"
            cancelButtonText="不用了"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除吗？"
            @onConfirm="deleteItem(scope.row)"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
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
      width="60%"
    >
      <EditWord
        :id="selectedItemId"
        :word="selectedItemWord"
        :type="form.type"
        @close="closeDialog"
      />
    </el-dialog>
  </section>
</template>
<script>
  import mixin from '../mixin/mixin'
  import EditWord from './EditWord'
  export default {
    name: 'wordList',
    mixins: [mixin],
    data() {
      return {
        dialogVisible: false,
        selectedItemId: '',
        selectedItemWord: '',
        form: {
          type: '日语',
          number: 4,
          searchContent: '',
        },
        pageSize: 15,
        currentPage: 1,
        total: 0,
        tableData: [],
      }
    },
    components: {
      EditWord,
    },
    methods: {
      add() {
        this.$router.push(`/edit?type=${this.form.type}`)
      },
      editItem(item) {
        this.selectedItemId = item._id
        this.selectedItemWord = item.word
        this.dialogVisible = true
      },
      async deleteItem(item) {
        const res = await this.$delete(`${this.API.word}/${item._id}`, {
          params: {
            type: this.form.type,
            number: this.form.number,
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
      async getData() {
        const res = await this.$get(this.API.word, {
          params: {
            type: this.form.type,
            number: this.form.number,
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
        this.getData()
      },
    },
    created() {
      this.getData()
    },
  }
</script>
<style lang="less" scoped>
  @import url('../assets/css/style.less');
</style>
