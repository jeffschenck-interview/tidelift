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
        <ul>
          <li v-for="project in topProjects" :key="`${project.platform}-${project.name}`">
            <router-link
              :to="{
                name: 'project',
                params: {platform: project.platform, project: project.name}
              }"
            >
              {{ project.name }}
            </router-link>
            <div class="field is-grouped is-grouped-multiline">
              <div class="control">
                <div class="tags has-addons">
                  <span class="tag">Platform</span>
                  <span class="tag is-primary">{{ project.platform }}</span>
                </div>
              </div>
              <div class="control">
                <div class="tags has-addons">
                  <span class="tag">Stars</span>
                  <span class="tag is-primary">{{ project.stars }}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <router-link :to="{name: 'search'}">Search for Packages</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
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
