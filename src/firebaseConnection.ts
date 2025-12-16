import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA6CAAGtTYjmqRMlB6EGagrOqgkwaB05Tg',
  authDomain: 'cine-vnw.firebaseapp.com',
  projectId: 'cine-vnw',
  storageBucket: 'cine-vnw.firebasestorage.app',
  messagingSenderId: '134054934060',
  appId: '1:134054934060:web:7d1ab8e6265753e00d0389',
  measurementId: 'G-ZVSRTRL8T8',
}

const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
