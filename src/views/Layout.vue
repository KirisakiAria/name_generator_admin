<template>
  <div class="main-wrapper">
    <SideBar />
    <section class="content">
      <HeaderBar />
      <main class="main">
        <router-view />
      </main>
    </section>
  </div>
</template>
<script>
  export default {
    name: 'Layout',
  }
</script>
<style lang="less" scoped>
  .main-wrapper {
    display: flex;
    height: 100vh;

    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }

    ::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      background-color: #fdcb6e;
    }

    ::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      background: #f2f2f2;
      border-radius: 10px;
    }

    .content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-shrink: 0;
    }

    .main {
      height: calc(~'100% - 60px');
      flex-shrink: 0;
      padding: 20px;
      overflow: auto;
    }
  }
</style>
