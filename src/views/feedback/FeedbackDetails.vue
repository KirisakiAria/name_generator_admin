<template>
  <section class="details-page">
    <el-row>
      <el-col :span="12">手机号：{{ item.tel }}</el-col>
      <el-col :span="12">用户名：{{ item.username }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">邮箱：{{ item.email }}</el-col>
      <el-col :span="12">反馈时间：{{ time(item.time) }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">反馈信息：{{ item.content }}</el-col>
    </el-row>
  </section>
</template>
<script>
  import mixin from '@/mixin/mixin'
  export default {
    name: 'FeedbackDetails',
    mixins: [mixin],
    props: {
      item: {
        type: Object,
      },
    },
  }
</script>
