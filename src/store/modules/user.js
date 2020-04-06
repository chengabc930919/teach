import Vue from 'vue'
const state = {
  name: ''
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  }
}

const actions = {
  setname({ commit }, name) {
    return new Promise((resolve, reject) => {
      commit('SET_NAME', name)
      resolve()
    }).catch(
      error => {
        reject(error)
      }
    )
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
