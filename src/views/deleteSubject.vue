<template>
  <div class="deleteSubject">
    <b-loading :is-full-page="false"  :active.sync="isLoading"></b-loading>
    <h2>ลบรายวิชา</h2>
    <div class="wrapper">
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
          :data="dataSubject"
          :paginated="isPaginated"
          :per-page="perPage" >
          <template slot-scope="props">
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
              <button @click="confirm(props.row.classYear, props.row.codeSubject)" class="button is-danger">DELETE</button>
            </b-table-column>
          </template>
      </b-table>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      dataSubject: [],
      isPaginated: true,
      perPage: 20,
      classYear: '',
      isLoading: false
    }
  },
  methods: {
    async clickToShowDetail (classYear) {
      const dataAxios = await axios({
        method: 'POST',
        url: 'https://us-central1-backend-qvy.cloudfunctions.net/backendAPI/getSubject',
        data: {
          student: classYear
        }
      })
      this.dataSubject = dataAxios.data.dataAll
      console.log(this.dataSubject)
    },
    confirm (std, code) {
      this.$buefy.dialog.confirm({
        message: 'ต้องการที่จะลบรายวิชานี้ใช่หรือไม่',
        confirmText: 'ตกลง',
        cancelText: 'ยกเลิก',
        onConfirm: () => this.deleteSubjec(std, code)
      })
    },
    deleteSubjec (std, code) {
      axios({
        method: 'DELETE',
        url: 'http://localhost:5000/backend-qvy/us-central1/backendAPI/testsss',
        data: {
          student: std,
          codeSubject: code
        }
      })
      setTimeout(() => { window.location.reload(true) }, 500)
    }
  },
  async mounted () {

  }
}
</script>
