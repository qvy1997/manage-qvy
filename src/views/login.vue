<template>
  <div class="login container">
    <form >
      <h1 class="text-center">เข้าสู่ระบบ</h1>
      <b-field label="E-MAIL"
          :type="{'is-danger': errors.has('Email')}"
          :message="errors.first('Email')" >
            <b-input class="input-cutstom" type="email"
              v-model="email" name="Email"
              v-validate="'required'">
            </b-input>
        </b-field>

      <b-field label="PASSWORD"
          :type="{'is-danger': errors.has('Password')}"
          :message="errors.first('Password')" >
            <b-input class="input-cutstom" type="password"
              v-model="password" name="Password"
              v-validate="'required'">
            </b-input>
        </b-field>

      <div class="text-center">
        <button @click.prevent="login">LOGIN</button>
      </div>
    </form>
  </div>
</template>

<script>
import { auth } from '../firebase'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        let authData = await auth.signInWithEmailAndPassword(this.email, this.password)
        sessionStorage.setItem('uid', authData.user.uid)
        this.$router.push({ name: 'Creation' })
      } catch (err) {
        console.error(err)
        this.$buefy.dialog.alert('รหัสผ่านไม่ถูกต้อง')
      }
    }
  }
}
</script>
