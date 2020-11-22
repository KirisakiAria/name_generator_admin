<template>
  <section class="details-page">
    <el-row>
      <el-col :span="12">手机号：{{ selectedItem.tel }}</el-col>
      <el-col :span="12">用户名：{{ selectedItem.username }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">邮箱：{{ selectedItem.email }}</el-col>
      <el-col :span="12">反馈时间：{{ time(selectedItem.date) }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">反馈信息：{{ selectedItem.content }}</el-col>
    </el-row>
  </section>
</template>
<script>
  import mixin from '@/mixin/mixin'
  export default {
    name: 'FeedbackDetails',
    mixins: [mixin],
    props: {
      selectedItem: {
        type: Object,
      },
    },
  }
</script>
