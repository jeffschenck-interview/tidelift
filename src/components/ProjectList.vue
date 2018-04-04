<template>
  <ul>
    <li v-for="project in projects" :key="`${project.platform}-${project.name}`">
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
</template>

<script>
export default {
  name: 'ProjectList',
  props: {
    projects: {
      type: Array,
      required: true,
    },
  },
}
</script>
