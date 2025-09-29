import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBrRpN1UAMyjmi8tlnZHuZtNBCfTKiBfpI",
  authDomain: "durga-puja-guide-e690d.firebaseapp.com",
  projectId: "durga-puja-guide-e690d",
  storageBucket: "durga-puja-guide-e690d.appspot.com",
  messagingSenderId: "848364435949",
  appId: "1:848364435949:web:2294d4d742e0d22a4a4fe4",
  measurementId: "G-NJEK8QYPFY"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)