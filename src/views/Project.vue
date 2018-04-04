<template>
  <div>
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
          <div class="column is-4">
            <h2 class="title is-3">Versions</h2>
            <table class="table is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Version</th>
                  <th>Released</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="{number, published_at} in versionsReversed"
                  :key="number"
                  :class="{'is-selected': number === selectedVersion}"
                  @click="setSelectedVersion(number)"
                >
                  <td>{{ number }}</td>
                  <td>{{ published_at|moment('MMM D, YYYY') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="column is-8">
            <h2 class="title is-3">Dependencies</h2>
            <table class="table is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Platform</th>
                  <th>Requirement</th>
                  <th>Latest</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loadingProjectDependencies">
                  <td colspan="4">Loading...</td>
                </tr>
                <tr
                  v-for="dependency in versionDependencies"
                  v-else-if="versionDependencies"
                  :key="`${dependency.platform}-${dependency.project_name}`"
                >
                  <td>
                    <router-link
                      :to="{
                        name: 'project',
                        params: {platform: dependency.platform, project: dependency.project_name}
                    }">
                      {{ dependency.project_name }}
                    </router-link>
                  </td>
                  <td>{{ dependency.platform }}</td>
                  <td>{{ dependency.requirements }}</td>
                  <td>{{ dependency.latest }}</td>
                </tr>
                <tr v-else>
                  <td colspan="4">No dependencies</td>
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
  data () {
    return {
      selectedVersion: null,
      loadingProject: false,
      loadingProjectDependencies: false,
    }
  },
  computed: {
    ...mapState(['platforms']),
    platform () {
      return this.$route.params.platform
    },
    project () {
      return this.$route.params.project
    },
    projectData () {
      if (!this.platforms[this.platform] || !this.platforms[this.platform][this.project]) {
        return {}
      }
      return this.platforms[this.platform][this.project].data
    },
    versionsReversed () {
      if (!this.projectData) {
        return []
      }
      return this.projectData.versions.slice().reverse()
    },
    projectDependencies () {
      if (!this.platforms[this.platform] || !this.platforms[this.platform][this.project]) {
        return {}
      }
      return this.platforms[this.platform][this.project].dependencies
    },
    versionDependencies () {
      if (!this.projectDependencies || !this.projectDependencies[this.selectedVersion]) {
        return []
      }
      return this.projectDependencies[this.selectedVersion].dependencies
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
      this.loadingProject = true
      await this.$store.dispatch('loadProject', {
        platform: this.platform,
        project: this.project,
      })
      this.setSelectedVersion(this.versionsReversed[0].number)
      this.loadingProject = false
    },
    async loadProjectDependencies (version) {
      this.loadingProjectDependencies = true
      await this.$store.dispatch('loadProjectDependencies', {
        platform: this.platform,
        project: this.project,
        version,
      })
      this.loadingProjectDependencies = false
    },
    setSelectedVersion (number) {
      this.selectedVersion = number
      this.loadProjectDependencies(number)
    },
  },
}
</script>
