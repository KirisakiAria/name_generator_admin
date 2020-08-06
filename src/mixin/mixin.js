import API from '../request/API'

const mixin = {
  data() {
    return {
      API: API,
      editDialogVisible: false,
      DetailsDialogVisible: false,
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem('token') && !to.path.includes('login')) {
      next(vm => {
        vm.$axios.defaults.headers.common['Authorization'] = ''
        vm.$router.replace('/login')
      })
    } else {
      next()
    }
  },
}

export default mixin
