const mixin = {
  data() {
    return {
      editDialogVisible: false,
      DetailsDialogVisible: false,
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem('token')) {
      next(vm => {
        vm.$axios.defaults.headers.common['Authorization'] = ''
        vm.$router.replace('/login')
      })
    } else {
      next()
    }
  },
  methods: {
    openEditDialog() {
      this.editDialogVisible = true
    },
    closeEditDialog() {
      this.editDialogVisible = false
    },
    openDetailsDialog() {
      this.DetailsDialogVisible = true
    },
    closeDetailsDialog() {
      this.DetailsDialogVisible = false
    },
  },
}

export default mixin
