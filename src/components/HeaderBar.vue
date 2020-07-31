<template>
  <header class="header">
    <button @click="back" title="后退">
      <i class="iconfont icon-back"></i>
    </button>
    <div class="current">{{ currentRouteName }}</div>
    <div class="avatar">
      <img :src="avatar" />
    </div>
  </header>
</template>
<script>
  export default {
    name: 'headerBar',
    data() {
      return {}
    },
    computed: {
      currentRouteName() {
        return this.$route.meta.title
      },
      avatar() {
        return this.$store.state.user.avatar
      },
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
    align-items: center;
    position: relative;
    padding: 20px;
    background: #fff;
    box-shadow: -2px 0px 10px 0px rgba(0, 0, 0, 0.1);
    z-index: 5;

    button {
      margin-right: 10px;
      .iconfont {
        color: #666;
        font-size: 20px;
      }
    }

    .current {
      font-size: 18px;
    }
  }
</style>
