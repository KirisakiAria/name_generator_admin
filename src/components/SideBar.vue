<template>
  <aside class="side-bar">
    <h4 class="title">
      <span>彼岸自在</span>
    </h4>
    <nav class="nav">
      <ul>
        <li
          :class="{ active: routeId === item.meta.id }"
          v-for="(item, index) in routeList"
          :key="index"
        >
          <button @click="navigate(item.name)">
            <i :class="`iconfont icon-${item.meta.icon}`"></i>
            <span class="name">{{ item.meta.title }}</span>
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    name: 'SideBar',
    computed: {
      routeList() {
        return this.$router.options.routes[0].children
      },
      routeId() {
        return this.$route.meta.id
      },
      ...mapState({
        username: state => state.user.username,
      }),
    },
    methods: {
      navigate(name) {
        if (!this.$route.name.includes(name)) {
          this.$router.push({ name })
        }
      },
    },
  }
</script>
<style lang="less" scoped>
  @import url('../assets/css/style.less');
  .side-bar {
    width: 250px;
    height: 100vh;
    position: relative;
    padding: 0 15px;
    padding-bottom: 30px;
    flex-shrink: 0;
    color: #fff;
    background-image: url('../assets/img/bg.png');
    background-size: cover;
    overflow: auto;

    .toggle-btn {
      position: absolute;
      top: 23px;
      left: 15px;
    }

    .title {
      font-size: 30px;
      padding: 20px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.8);
      text-align: center;
      letter-spacing: 5px;
    }

    li {
      margin-top: 15px;
      .transition;

      button {
        padding: 15px;
        width: 100%;
        text-align: left;
        color: #fff;
        span {
          margin-left: 20px;
        }

        &,
        * {
          cursor: pointer;
        }
      }

      &:hover,
      &.active {
        .br(5px);
        .bg;
      }
    }
  }
</style>
