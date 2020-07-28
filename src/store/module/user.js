export default {
  state: {
    avatar: '',
    username: '',
    token: '',
  },
  mutations: {
    updateData(state, payload) {
      state[payload.key] = payload.value
    },
  },
  namespaced: true,
}
