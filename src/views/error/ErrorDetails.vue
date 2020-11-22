<template>
  <section class="details-page">
    <el-row>
      <el-col :span="12">app版本：{{ selectedItem.appVersion }}</el-col>
      <el-col :span="12">厂商：{{ selectedItem.brand }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">系统类型：{{ selectedItem.system }}</el-col>
      <el-col :span="12">系统版本：{{ selectedItem.systemVersion }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">错误信息：{{ selectedItem.error }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">堆栈跟踪：{{ selectedItem.stackTrace }}</el-col>
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
