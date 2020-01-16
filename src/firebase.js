const firebase = require('firebase/app')
require('firebase/storage')
require('firebase/auth')

let firebaseConfig = {
  apiKey: 'AIzaSyBZ9EGAX2tbRP6iehgE10k1KrlTiJ9FNqg',
  authDomain: 'backend-qvy.firebaseapp.com',
  databaseURL: 'https://backend-qvy.firebaseio.com',
  storageBucket: 'backend-qvy.appspot.com',
  projectId: 'backend-qvy',
  appId: '1:488536493608:web:f90d45cec5cddb8530af1d'
}
firebase.initializeApp(firebaseConfig)

let storage = firebase.storage()
let auth = firebase.auth()

export { storage, firebaseConfig, auth }
