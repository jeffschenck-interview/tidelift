<template>
  <div v-if="projectData">
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">{{ projectData.name }}</h1>
          <p class="subtitle">{{ projectData.description }}</p>
          <div class="field is-grouped is-grouped-multiline">
            <div class="control">
              <div class="tags has-addons">
                <span class="tag">Platform</span>
                <span class="tag is-primary">{{ projectData.platform }}</span>
              </div>
            </div>
            <div class="control">
              <div v-for="license in projectData.normalized_licenses" :key="license" class="tags has-addons">
                <span class="tag">License</span>
                <span class="tag is-primary">{{ license }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-8">
            <h2 class="title is-3">Dependencies</h2>
          </div>
          <div class="column">
            <table class="table is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Version</th>
                  <th>Released</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="{number, published_at} in projectData.versions" :key="number">
                  <td>{{ number }}</td>
                  <td>{{ published_at|moment('MMM D, YYYY') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Project',
  computed: {
    ...mapState(['platforms']),
    platform () {
      return this.$route.params.platform
    },
    project () {
      return this.$route.params.project
    },
    projectData () {
      return this.platforms[this.platform] && this.platforms[this.platform][this.project]
    },
  },
  watch: {
    platform: 'loadProject',
    project: 'loadProject',
  },
  created () {
    this.loadProject()
  },
  methods: {
    async loadProject () {
      this.$store.dispatch('loadProject', {
        platform: this.platform,
        project: this.project,
      })
    },
  },
}
</script>
