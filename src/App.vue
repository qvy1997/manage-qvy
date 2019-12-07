<template>
  <div id="app">
    <div class="container-sidebar">
      <sidebar />
    </div>
    <div class="container text-center main-page">
      <div class="wrapper">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from './components/sidebar'
export default {
  name: 'App',
  components: {
    sidebar
  }
}
</script>
