<template>
  <div>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">{{ projectData.name }}</h1>
          <p class="subtitle">{{ projectData.platform }}</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <p>
          {{ projectData }}
        </p>
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
      return this.platforms[this.platform][this.project]
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
