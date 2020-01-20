<template>
  <div class="deleteSubject flexSidebar">
    <div class="container-sidebar">
      <sidebar />
    </div>
    <div class="magin-page container text-center">
    <b-loading :is-full-page="false"  :active.sync="isLoading"></b-loading>
      <div class="wrapper text-center">
        <h2>ลบรายวิชา</h2>
          <b-field label="ค้นหารหัสวิชา">
            <b-autocomplete
              expanded
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

        <b-field label="ปีการศึกษา">
          <b-select expanded v-model="classYear">
            <option value="student1"> ปีการศึกษาที่ 1 </option>
            <option value="student2"> ปีการศึกษาที่ 2 </option>
            <option value="student3"> ปีการศึกษาที่ 3 </option>
            <option value="student4"> ปีการศึกษาที่ 4 </option>
          </b-select>
        </b-field>

        <div class="buttonConfirm">
          <button @click="clickToShowDetail(classYear)">ตกลง</button>
        </div>
          <b-table
            :data="realData"
            :paginated="isPaginated"
            :per-page="perPage" >
            <template slot-scope="props">
              <b-table-column field="imageTeacher" label="IMG" centered>
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

              <b-table-column  label="DELETE" centered>
                <button @click="confirm(classYear, props.row.codeSubject, props.row.nameImgTeacher)" class="button is-danger">DELETE</button>
              </b-table-column>
            </template>
        </b-table>

      </div>
    </div>
  </div>
</template>

<script>
import { auth, storage } from '../firebase'
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
      selected: null,
      name: '',
      keepFirst: true,
      openOnFocus: true
    }
  },
  methods: {
    async clickToShowDetail (classYear) {
      this.isLoading = true
      const dataAxios = await axios({
        method: 'POST',
        url: 'http://localhost:5000/backend-qvy/us-central1/backendAPI/getSubject',
        data: {
          student: classYear
        }
      })
      this.dataSubject = dataAxios.data.dataAll
      this.isLoading = false
    },
    confirm (std, code, nameImg) {
      this.$buefy.dialog.confirm({
        message: 'ต้องการที่จะลบรายวิชานี้ใช่หรือไม่',
        confirmText: 'ตกลง',
        cancelText: 'ยกเลิก',
        onConfirm: () => this.deleteSubjec(std, code, nameImg)
      })
    },
    async deleteSubjec (std, code, nameImg) {
      this.isLoading = true
      let dataAxios = await axios({
        method: 'DELETE',
        url: 'http://localhost:5000/backend-qvy/us-central1/backendAPI/deleteSubject',
        data: {
          student: std,
          codeSubject: code
        }
      })
      let storageRef = storage.ref().child(nameImg)
      await storageRef.delete()
      this.dataSubject = dataAxios.data.dataAll
      this.isLoading = false
    }
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
