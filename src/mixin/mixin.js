import API from '../request/API'

const mixin = {
  data() {
    return {
      API: API,
      editDialogVisible: false,
      DetailsDialogVisible: false,
      wordType: ['中国风', '日式', '可爱', '英文'],
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
      if (process.env.NODE_ENV == 'development') {
        return process.env.VUE_APP_BASE_API
      } else {
        return location.origin
      }
    },
    serverUrl() {
      if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:2077'
      } else {
        return 'https://api.bianzizai.com'
      }
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
