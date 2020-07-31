export default {
  state: {
    uid: '',
    avatar: '',
    username: '',
    token: '',
  },
  mutations: {
    updateData(state, payload) {
      state.uid = payload.uid
      state.avatar = payload.avatar
      state.username = payload.username
      state.token = payload.token
    },
  },
  namespaced: true,
}
