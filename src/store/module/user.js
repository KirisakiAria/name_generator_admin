export default {
  state: {
    uid: '',
    avatar: '',
    username: '',
    token: '',
  },
  mutations: {
    changeUserData(state, payload) {
      state.uid = payload.uid
      state.avatar = payload.avatar
      state.username = payload.username
      state.token = payload.token
    },
  },
  namespaced: true,
}
