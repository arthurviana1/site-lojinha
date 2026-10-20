import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBPqt4w1pHEDaf6teEYBBEWx0FplolMMYE',
  authDomain: 'lojinha-a-graciosa.firebaseapp.com',
  projectId: 'lojinha-a-graciosa',
  storageBucket: 'lojinha-a-graciosa.firebasestorage.app',
  messagingSenderId: '240731634919',
  appId: '1:240731634919:web:90667bf47aa2cba16b7642',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
