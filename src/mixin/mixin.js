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
  filters: {
    showable(value) {
      if (value) {
        return '是'
      } else {
        return '否'
      }
    },
  },
  computed: {
    url() {
      return process.env.VUE_APP_BASE_API
    },
  },
  methods: {
    time(value) {
      const dateObj = new Date(value)
      const year = this.padZero(dateObj.getFullYear())
      const month = this.padZero(dateObj.getMonth() + 1)
      const date = this.padZero(dateObj.getDate())
      return `${year}-${month}-${date}`
    },
    padZero(value) {
      let newVal = value
      if (value < 10) {
        newVal = `0${value}`
      }
      return newVal
    },
  },
}

export default mixin
