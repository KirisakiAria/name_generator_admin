<template>
  <section class="details-page liked-users">
    <el-row>
      <span>点赞总人数：{{ likedUsers.length }}</span>
    </el-row>
    <el-row>
      <span>点赞用户：</span>
      <ul class="user-list">
        <li v-for="(item, index) in likedUsers" :key="index">{{ item }}，</li>
      </ul>
    </el-row>
  </section>
</template>
<script>
  import mixin from '@/mixin/mixin'
  export default {
    name: 'LikedUsersDetails',
    mixins: [mixin],
    props: {
      likedUsers: {
        type: Array,
      },
    },
  }
</script>
<style lang="less" scoped>
  .liked-users {
    .el-row {
      display: flex;
      span {
        display: block;
        flex-shrink: 0;
        flex-grow: 0;
        padding-top: 10px;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        margin: 10px 0;
      }
    }
  }
</style>
