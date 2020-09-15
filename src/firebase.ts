import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyByLXc72xdcFvAupu3NpQo7vRPigQtNCug",
    authDomain: "house-monitor-pi.firebaseapp.com",
    databaseURL: "https://house-monitor-pi.firebaseio.com",
    projectId: "house-monitor-pi",
    storageBucket: "house-monitor-pi.appspot.com",
    messagingSenderId: "351209956025",
    appId: "1:351209956025:web:0b7a1e347fd9518fe13168",
    measurementId: "G-VWX711N83B"
};
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

// collection references
const imagesCollection = db.collection('images')

// export utils/refs
export {
    db,
    auth,
    imagesCollection,
    storage
}