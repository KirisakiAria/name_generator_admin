export default {
  state: {
    avatar: '',
    username: '',
  },
  mutations: {
    updateData(state, payload) {
      state[payload.key] = payload.value
    },
  },
  namespaced: true,
}
