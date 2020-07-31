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
            v-for="(item, index) in 4"
            :key="index"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="getData">
          搜索
        </el-button>
      </div>
      <el-button type="success" @click="add">新增</el-button>
    </section>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="word" label="词语"></el-table-column>
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
  </section>
</template>
<script>
  import mixin from '../mixin/mixin'
  export default {
    name: 'wordList',
    mixins: [mixin],
    data() {
      return {
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
    methods: {
      add() {
        this.$router.push(`/edit?type=${this.type}&number=${this.number}`)
      },
      async getData() {
        const res = await this.$get(this.API.getWordList, {
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
    },
    created() {
      this.getData()
    },
  }
</script>
<style lang="less" scoped>
  @import url('../assets/css/style.less');
</style>
