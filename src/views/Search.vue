<template>
  <div>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">Search</h1>
          <p class="subtitle">Find your favorite package</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <form @submit.prevent="search()">
          <div class="field has-addons">
            <div class="control">
              <input
                v-model="text"
                :disabled="loading"
                type="text"
                class="input"
                placeholder="Find a project"
              >
            </div>
            <div class="control">
              <button
                :class="{'is-loading': loading}"
                :disabled="loading"
                type="submit"
                class="button is-primary"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        <project-list :projects="results" />
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import ProjectList from '@/components/ProjectList'

// TODO: better API key management... this should not be in our code directly :)
const API_KEY = 'e483b50879647d6c31cfdc901cc1c9c4'

export default {
  name: 'Search',
  components: {
    ProjectList,
  },
  data () {
    return {
      loading: false,
      text: '',
      results: [],
    }
  },
  methods: {
    async search () {
      this.loading = true
      const url = `https://libraries.io/api/search/?q=${this.text}&api_key=${API_KEY}`
      const data = (await axios.get(url)).data
      this.results = data
      this.loading = false
    },
  },
}
</script>
