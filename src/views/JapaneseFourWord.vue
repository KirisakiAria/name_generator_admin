<template>
  <section class="table-page">
    <section class="top-area">
      <div class="form">
        <el-input
          v-model="searchContent"
          placeholder="请输入搜索内容"
        ></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <el-button type="success" @click="add">新增</el-button>
    </section>
    <el-table :data="tableData">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="word" label="词"></el-table-column>
    </el-table>
  </section>
</template>
<script>
  export default {
    name: 'japaneseFourWord',
    data() {
      return {
        searchContent: '',
        tableData: [
          {
            id: '',
            word: '王小虎',
          },
        ],
      }
    },
    methods: {
      add() {
        this.$router.push('/edit?type=2&number=4')
      },
    },
  }
</script>
<style lang="less" scoped>
  @import url('../assets/css/style.less');
</style>
