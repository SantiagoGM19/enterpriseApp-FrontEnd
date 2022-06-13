import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDuVTJtwKvwcT04BOEAhZ2gVwjXUXfgYNY",
    authDomain: "enterpriseapp-c39e5.firebaseapp.com",
    projectId: "enterpriseapp-c39e5",
    storageBucket: "enterpriseapp-c39e5.appspot.com",
    messagingSenderId: "1006168910254",
    appId: "1:1006168910254:web:cd0b1e5c04e50b588d403f"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth()