<template>
  <section class="details-page">
    <el-row>
      <el-col :span="12">app版本：{{ item.appVersion }}</el-col>
      <el-col :span="12">厂商：{{ item.brand }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">系统类型：{{ item.system }}</el-col>
      <el-col :span="12">系统版本：{{ item.systemVersion }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">错误信息：{{ item.error }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">堆栈跟踪：{{ item.stackTrace }}</el-col>
    </el-row>
  </section>
</template>
<script>
  export default {
    name: 'ErrorDetails',
    props: {
      selectedItem: {
        type: Object,
      },
    },
  }
</script>
