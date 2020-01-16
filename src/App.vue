<template>
  <div id="app">
    <router-view/>
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
