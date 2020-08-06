<template>
  <header class="header">
    <div class="left">
      <button @click="back" class="back-btn" title="后退">
        <i class="iconfont icon-back"></i>
      </button>
      <div class="current">{{ currentRouteName }}</div>
    </div>
    <el-popover placement="top-start" width="150" trigger="hover">
      <ul class="info-list">
        <li>uid：{{ uid }}</li>
        <li>用户名：{{ username }}</li>
      </ul>
      <div class="avatar" slot="reference">
        <img :src="url + avatar" />
      </div>
    </el-popover>
  </header>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    name: 'headerBar',
    data() {
      return {}
    },
    computed: {
      currentRouteName() {
        return this.$route.meta.title
      },
      url() {
        return process.env.VUE_APP_BASE_API
      },
      ...mapState({
        avatar: state => state.user.avatar,
        username: state => state.user.username,
        uid: state => state.user.uid,
      }),
    },
    methods: {
      back() {
        if (!this.$route.meta.show) {
          this.$router.go(-1)
        }
      },
    },
  }
</script>
<style lang="less" scoped>
  @import url('../assets/css/style.less');
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 10px 30px;
    background: #fff;
    box-shadow: -2px 0px 10px 0px rgba(0, 0, 0, 0.1);
    z-index: 5;

    .left {
      display: flex;
    }

    .back-btn {
      margin-right: 10px;
      .iconfont {
        color: #666;
        font-size: 20px;
      }
    }

    .current {
      font-size: 18px;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
  }
</style>
