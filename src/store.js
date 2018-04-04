import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const API_KEY = 'e483b50879647d6c31cfdc901cc1c9c4'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    platforms: {},
  },
  actions: {
    async loadProject ({commit}, {platform, project}) {
      const url = `https://libraries.io/api/${platform}/${project}?api_key=${API_KEY}`
      const data = (await axios.get(url)).data
      commit('setProject', {platform, project, data})
    },
  },
  mutations: {
    setProject (state, {platform, project, data}) {
      if (!state.platforms[platform]) {
        Vue.set(state.platforms, platform, {})
      }
      Vue.set(state.platforms[platform], project, data)
    },
  },
})
