<template>
  <div>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">Packages</h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h2 class="title is-3">Top Packages</h2>
        <project-list :projects="topProjects" />
        <router-link :to="{name: 'search'}">Search for Packages</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProjectList from '@/components/ProjectList'

export default {
  name: 'Home',
  components: {
    ProjectList,
  },
  computed: {
    ...mapState(['topProjects']),
  },
  created () {
    this.loadTopProjects()
  },
  methods: {
    loadTopProjects () {
      this.$store.dispatch('loadTopProjects')
    },
  },
}
</script>

<style scoped>
li {
  margin-bottom: 1rem;
}
</style>
