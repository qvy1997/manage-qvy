<template>
  <div class="add-subject flexSidebar">
    <div class="container-sidebar">
      <sidebar />
    </div>
    <b-loading :is-full-page="false"  :active.sync="isLoading"></b-loading>
    <div class="magin-page container text-center">
      <form class="container-form">
        <h2>เพิ่มวิชา</h2>
        <b-field label="ปีการศึกษา">
          <b-select expanded v-model="classYear">
            <option value="student1">ปีการศึกษาที่ 1</option>
            <option value="student2">ปีการศึกษาที่ 2</option>
            <option value="student3">ปีการศึกษาที่ 3</option>
            <option value="student4">ปีการศึกษาที่ 4</option>
          </b-select>
        </b-field>

        <b-field label="หนังสือที่แนะนำ">
          <b-input v-model="bookRecom"></b-input>
        </b-field>

        <b-field label="รหัสวิชา">
          <b-input v-model="codeSubject"></b-input>
        </b-field>

        <b-field label="หน่วยกิต">
          <b-numberinput min="0" max="12" v-model="credit"></b-numberinput>
        </b-field>

        <b-field label="รายละเอียดวิชา">
          <b-input type="textarea" v-model="detailSubject"></b-input>
        </b-field>

        <b-field class="file">
          <b-upload v-model="imageTeacher">
            <a class="button is-primary">
              <b-icon icon="upload"></b-icon>
              <span>อัพโหลดรูปภาพ</span>
            </a>
          </b-upload>
          <span class="file-name" v-if="imageTeacher">
            {{ imageTeacher.name }}
          </span>
        </b-field>

        <b-field label="ชื่อวิชา">
          <b-input v-model="nameSubject"></b-input>
        </b-field>

        <b-field label="หมายเหตุ">
          <b-input v-model="note"></b-input>
        </b-field>

        <b-field label="ชื่ออาจารย์ผู้สอน">
          <b-input v-model="teacher"></b-input>
        </b-field>

        <div class="text-center">
          <button class="button is-medium" @click.prevent="confirm">submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { storage, firebaseConfig, auth } from '../firebase'
import sidebar from '../components/sidebar'
import axios from 'axios'
export default {
  components: {
    sidebar
  },
  data () {
    return {
      classYear: '',
      bookRecom: '',
      codeSubject: '',
      credit: 0,
      detailSubject: '',
      imageTeacher: null,
      nameSubject: '',
      note: '',
      teacher: '',
      isLoading: false
    }
  },
  methods: {
    async submit () {
      this.isLoading = true
      const data = {
        class: this.classYear,
        bookRecom: this.bookRecom,
        codeSubject: this.codeSubject,
        credit: this.credit,
        detailSubject: this.detailSubject,
        imageTeacher: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${this.imageTeacher.name}?alt=media`,
        nameSubject: this.nameSubject,
        note: this.note,
        teacher: this.teacher,
        student: this.classYear
      }
      const dataAxios = await axios({
        method: 'POST',
        url: 'https://us-central1-backend-qvy.cloudfunctions.net/backendAPI/createSubject',
        data: data
      })
      if (dataAxios.data.success === 9999) {
        this.$buefy.dialog.alert({
          message: 'รหัสวิชานี้มีซ้ำกับฐานข้อมูลเดิม',
          confirmText: 'ตกลง'
        })
      } else {
        this.upload()
        this.$buefy.dialog.alert({
          message: 'ทำรายการเสร็จเรียบร้อย',
          confirmText: 'ตกลง'
        })
        this.deleteText()
      }
      this.isLoading = false
    },
    upload () {
      let storageRef = storage.ref().child(this.imageTeacher.name)
      storageRef.put(this.imageTeacher)
    },
    confirm () {
      this.$buefy.dialog.confirm({
        message: 'ต้องการที่จะสร้างรายวิชานี้ใช่หรือไม่',
        confirmText: 'ตกลง',
        cancelText: 'ยกเลิก',
        onConfirm: () => this.submit()
      })
    },
    deleteText () {
      this.classYear = ''
      this.bookRecom = ''
      this.codeSubject = ''
      this.credit = 0
      this.detailSubject = ''
      this.imageTeacher = null
      this.nameSubject = ''
      this.note = ''
      this.teacher = ''
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
