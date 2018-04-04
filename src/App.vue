<template>
  <div id="app">
    <nav class="navbar is-light is-fixed-top">
      <div class="navbar-brand">
        <div class="navbar-item"><strong>Package Explorer</strong></div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link :to="{name: 'home'}" class="navbar-item">Home</router-link>
          <router-link :to="{name: 'search'}" class="navbar-item">Search</router-link>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
