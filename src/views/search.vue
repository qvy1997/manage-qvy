<template>
  <div class="deleteSubject flexSidebar">
    <div class="container-sidebar">
      <sidebar />
    </div>
    <div class="magin-page container text-center">
    <b-loading :is-full-page="false"  :active.sync="isLoading"></b-loading>
      <div class="wrapper text-center">
        <h2>ค้นหารายวิชา</h2>
        <b-field>
          <b-autocomplete
            field="codeSubject"
            v-model="name"
            :data="filteredDataArray"
            :keep-first="keepFirst"
            :open-on-focus="openOnFocus"
            placeholder="ค้นหารายวิชา"
            icon="magnify"
            @select="option => selected = option">
              <template slot="empty">ไม่พบรายวิชานี้</template>
            </b-autocomplete>
        </b-field>
        <b-table
          :data="realData"
          :paginated="isPaginated"
          :per-page="perPage" >
            <template slot-scope="props">
              <b-table-column class="sizeImg" field="imageTeacher" label="IMG" centered>
                <img width="350px" height="auto" :src="props.row.imageTeacher" alt="รูปอาจารย์วิชา">
              </b-table-column>

              <b-table-column field="nameSubject" label="วิชา" centered>
                {{ props.row.nameSubject }}
              </b-table-column>

              <b-table-column field="codeSubject" label="รหัสวิชา" centered>
                {{ props.row.codeSubject }}
              </b-table-column>

              <b-table-column field="credit" label="หน่วยกิต" centered>
                {{ props.row.credit }}
              </b-table-column>

              <b-table-column field="bookRecom" label="หนังสือแนะนำ" centered>
                {{ props.row.bookRecom }}
              </b-table-column>

              <b-table-column field="detailSubject" label="รายละเอียดวิชา" centered>
                {{ props.row.detailSubject }}
              </b-table-column>

              <b-table-column field="note" label="หมายเหตุ" centered>
                {{ props.row.note }}
              </b-table-column>

              <b-table-column field="teacher" label="อาจารย์" centered>
                {{ props.row.teacher }}
              </b-table-column>
            </template>
        </b-table>

      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../firebase'
import sidebar from '../components/sidebar'
import axios from 'axios'
export default {
  components: {
    sidebar
  },
  data () {
    return {
      dataSubject: [],
      isPaginated: true,
      perPage: 20,
      classYear: '',
      isLoading: false,
      name: '',
      selected: null,
      keepFirst: true,
      openOnFocus: true
    }
  },
  methods: {
  },
  computed: {
    filteredDataArray () {
      return this.dataSubject.filter((option) => {
        return option.codeSubject
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    },
    realData () {
      return this.selected !== null ? [this.selected] : this.dataSubject
    }
  },
  async mounted () {
    this.isLoading = true
    let dataAxios = await axios.get('http://localhost:5000/backend-qvy/us-central1/backendAPI/getAllCollection')
    this.dataSubject = dataAxios.data.data
    this.isLoading = false
    let uid = sessionStorage.getItem('uid')
    auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          if (user.uid !== uid) {
            this.$router.push({ name: 'Login' })
          }
        } else {
          this.$router.push({ name: 'Login' })
        }
      } catch (e) {
        console.error(e)
      }
    })
  }
}
</script>
