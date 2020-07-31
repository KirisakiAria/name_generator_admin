<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    created() {
      const uid = localStorage.getItem('uid')
      const avatar = localStorage.getItem('avatar')
      const username = localStorage.getItem('username')
      this.$store.commit('user/updateData', {
        uid,
        avatar,
        username,
      })
    },
  }
</script>
