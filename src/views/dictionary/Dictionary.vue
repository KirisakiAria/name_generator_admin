<template>
  <section class="dictionary">
    <el-row type="flex">
      <el-col :span="12" v-for="(item, index) in cardList" :key="index">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>分类</span>
          </div>
          <section class="card-body">
            <ClassifyList />
          </section>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>
<script>
  import mixin from '@/mixin/mixin'
  import ClassifyList from './classify/ClassifyList'
  export default {
    name: 'Dictionary',
    mixins: [mixin],
    data() {
      return {
        cardList: [
          {
            title: '词语分类',
            api: 'classify',
          },
        ],
      }
    },
    components: {
      ClassifyList,
    },
  }
</script>
<style lang="less" scoped>
  .dictionary {
    .card-body {
      text-align: center;
      button {
        width: 200px;
      }
    }
  }
</style>
