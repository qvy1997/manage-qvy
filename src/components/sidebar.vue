<template>
  <div class="sidebar text-center">
    <h1>RMUTP</h1>
    <h2>Management</h2>
    <ul class="sidebar-menu">
      <li @click="linkRouter(menu.link)"
      v-for="(menu, index) in menus"
      :key="index">
        {{ menu.text }}
      </li>
    </ul>
    <div class="logut">
      <button @click="logout">LOGOUT</button>
    </div>
  </div>
</template>

<script>
import { auth } from '../firebase'
export default {
  data () {
    return {
      menus: [
        {
          text: 'เพิ่มวิชา',
          link: 'Creation'
        },
        {
          text: 'ลบข้อมูล',
          link: 'Delete'
        },
        {
          text: 'ค้นหารายวิชา',
          link: 'Search'
        }
      ]
    }
  },
  methods: {
    linkRouter (link) {
      this.$router.push({ name: link })
    },
    logout () {
      auth.signOut()
      this.$router.push({name: 'Login'})
      sessionStorage.removeItem('uid')
    }
  }
}
</script>
