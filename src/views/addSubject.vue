<template>
  <div class="add-subject flexSidebar">
    <div class="container-sidebar">
      <sidebar />
    </div>
    <b-loading :is-full-page="false"  :active.sync="isLoading"></b-loading>
    <div class="magin-page container text-center">
      <form class="container-form">
        <h2>เพิ่มวิชา</h2>
        <b-field label="ปีการศึกษา"
        :type="{'is-danger': errors.has('ClassYear')}"
        :message="errors.first('ClassYear')">
          <b-select expanded v-model="classYear"
          name="ClassYear"
          v-validate="'required'">
            <option value="student1">ปีการศึกษาที่ 1</option>
            <option value="student2">ปีการศึกษาที่ 2</option>
            <option value="student3">ปีการศึกษาที่ 3</option>
            <option value="student4">ปีการศึกษาที่ 4</option>
          </b-select>
        </b-field>

        <b-field label="หนังสือที่แนะนำ"
        :type="{'is-danger': errors.has('bookRecom')}"
        :message="errors.first('bookRecom')">
          <b-input v-model="bookRecom"
            name="bookRecom"
            v-validate="'required'">
          </b-input>
        </b-field>

        <b-field label="รหัสวิชา"
        :type="{'is-danger': errors.has('codeSubject')}"
        :message="errors.first('codeSubject')">
          <b-input v-model="codeSubject"
            name="codeSubject"
            v-validate="'required'">
          </b-input>
        </b-field>

        <b-field label="หน่วยกิต"
        :type="{'is-danger': errors.has('credit')}"
        :message="errors.first('credit')">
          <b-numberinput min="0" max="12" v-model="credit"
            name="credit"
            v-validate="'required'">
          </b-numberinput>
        </b-field>

        <b-field label="รายละเอียดวิชา"
        :type="{'is-danger': errors.has('detailSubject')}"
        :message="errors.first('detailSubject')">
          <b-input type="textarea" v-model="detailSubject"
            name="detailSubject"
            v-validate="'required'">
          </b-input>
        </b-field>

        <b-field class="file dropimg"
        :type="{'is-danger': errors.has('imageTeacher')}"
        :message="errors.first('imageTeacher')">
          <b-upload v-model="imageTeacher"
            name="imageTeacher"
            v-validate="'required'">
              <a class="button is-primary">
                <b-icon icon="upload"></b-icon>
                <span>อัพโหลดรูปภาพ</span>
              </a>
          </b-upload>
          <span class="file-name" v-if="imageTeacher">
            {{ imageTeacher.name }}
          </span>
        </b-field>

        <b-field label="ชื่อวิชา"
        :type="{'is-danger': errors.has('nameSubject')}"
        :message="errors.first('nameSubject')">
          <b-input v-model="nameSubject"
            name="nameSubject"
            v-validate="'required'">
          </b-input>
        </b-field>

        <b-field label="หมายเหตุ"
        :type="{'is-danger': errors.has('note')}"
        :message="errors.first('note')">
          <b-input v-model="note"
            name="note"
            v-validate="'required'">
          </b-input>
        </b-field>

        <b-field label="ชื่ออาจารย์ผู้สอน"
        :type="{'is-danger': errors.has('teacher')}"
        :message="errors.first('teacher')">
          <b-input v-model="teacher"
            name="teacher"
            v-validate="'required'">
          </b-input>
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
      let validateBool = await this.$validator.validateAll()
      if (validateBool) {
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
          student: this.classYear,
          nameImgTeacher: this.imageTeacher.name
        }
        const dataAxios = await axios({
          method: 'POST',
          url: 'http://localhost:5000/backend-qvy/us-central1/backendAPI/createSubject',
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
          setTimeout(() => {
            this.$router.push({name: 'Search'})
          }, 1500)
        }
        this.isLoading = false
      } else {
        this.$buefy.toast.open({
          message: 'จำเป็นต้องใส่ข้อมูลให้ครบ',
          type: 'is-danger',
          position: 'is-bottom',
          duration: 2500
        })
      }
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
