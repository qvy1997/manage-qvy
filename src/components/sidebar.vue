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
  </div>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        {
          text: 'เพิ่มวิชา',
          link: 'Creation'
        },
        {
          text: 'อัพเดตข้อมูล',
          link: 'Update'
        },
        {
          text: 'ลบข้อมูล',
          link: 'Delete'
        }
      ]
    }
  },
  methods: {
    linkRouter (link) {
      this.$router.push({ name: link })
    }
  }
}
</script>
