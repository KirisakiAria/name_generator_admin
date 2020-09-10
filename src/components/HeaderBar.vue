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
      <el-button
        @click="logout"
        class="logout"
        icon="el-icon-switch-button"
        type="danger"
      >
        注销
      </el-button>
      <div class="avatar" slot="reference">
        <img :src="url + avatar" />
      </div>
    </el-popover>
  </header>
</template>
<script>
  import { mapState } from 'vuex'
  import mixin from '@/mixin/mixin'
  export default {
    name: 'HeaderBar',
    mixins: [mixin],
    data() {
      return {}
    },
    computed: {
      currentRouteName() {
        return this.$route.meta.title
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
      logout() {
        localStorage.clear()
        this.$router.replace('login')
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
      margin-right: 15px;
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
