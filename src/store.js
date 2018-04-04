import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const API_KEY = 'e483b50879647d6c31cfdc901cc1c9c4'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    platforms: {},
    topProjects: [],
  },
  actions: {
    async loadTopProjects ({commit}) {
      const url = `https://libraries.io/api/search?q=&sort=rank&per_page=10&api_key=${API_KEY}`
      const data = (await axios.get(url)).data
      commit('setTopProjects', {data})
    },
    async loadProject ({commit}, {platform, project}) {
      const url = `https://libraries.io/api/${platform}/${project}?api_key=${API_KEY}`
      const data = (await axios.get(url)).data
      commit('setProject', {platform, project, data})
    },
    async loadProjectDependencies ({commit}, {platform, project, version}) {
      const url = `https://libraries.io/api/${platform}/${project}/${version}/dependencies?api_key=${API_KEY}`
      const data = (await axios.get(url)).data
      commit('setProjectDependencies', {platform, project, version, data})
    },
  },
  mutations: {
    setTopProjects (state, {data}) {
      state.topProjects = data
    },
    setProject (state, {platform, project, data}) {
      if (!state.platforms[platform]) {
        Vue.set(state.platforms, platform, {})
      }
      if (!state.platforms[platform][project]) {
        Vue.set(state.platforms[platform], project, {
          data: {},
          dependencies: {},
        })
      }
      state.platforms[platform][project].data = data
    },
    setProjectDependencies (state, {platform, project, version, data}) {
      if (!state.platforms[platform]) {
        Vue.set(state.platforms, platform, {})
      }
      if (!state.platforms[platform][project]) {
        Vue.set(state.platforms[platform], project, {
          data: {},
          dependencies: {},
        })
      }
      if (!state.platforms[platform][project].dependencies[version]) {
        Vue.set(state.platforms[platform][project].dependencies, version, {})
      }
      state.platforms[platform][project].dependencies[version] = data
    },
  },
})
