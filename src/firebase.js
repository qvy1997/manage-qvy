const firebase = require('firebase/app')
require('firebase/storage')

let firebaseConfig = {
  apiKey: 'AIzaSyBZ9EGAX2tbRP6iehgE10k1KrlTiJ9FNqg',
  authDomain: 'backend-qvy.firebaseapp.com',
  databaseURL: 'https://backend-qvy.firebaseio.com',
  storageBucket: 'backend-qvy.appspot.com'
}
firebase.initializeApp(firebaseConfig)

let storage = firebase.storage()

export { storage, firebaseConfig }
