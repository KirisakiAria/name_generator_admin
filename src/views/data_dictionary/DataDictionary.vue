<template>
  <section class="dictionary">
    <el-row type="flex" justify="space-around">
      <el-col :span="11">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>词语分类</span>
          </div>
          <section class="card-body">
            <ClassifyList />
          </section>
        </el-card>
      </el-col>
      <el-col :span="11">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>支付方式</span>
          </div>
          <section class="card-body">
            <PaymentMethodList />
          </section>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>
<script>
  import mixin from '@/mixin/mixin'
  import ClassifyList from './classify/ClassifyList'
  import PaymentMethodList from './payment_method/PaymentMethodList'
  export default {
    name: 'Dictionary',
    mixins: [mixin],
    data() {
      return {}
    },
    components: {
      ClassifyList,
      PaymentMethodList,
    },
  }
</script>
<style lang="less" scoped>
  .dictionary {
    .card-body {
      button {
        width: 200px;
      }
    }
  }
</style>
