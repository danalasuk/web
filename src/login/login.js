
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";


const firebaseConfig = {
    apiKey: "AIzaSyBZZXyElzLodd423Io73iFzYVUO5g2srIs",
    authDomain: "weblogin-31a5e.firebaseapp.com",
    projectId: "weblogin-31a5e",
    storageBucket: "weblogin-31a5e.firebasestorage.app",
    messagingSenderId: "803143596801",
    appId: "1:803143596801:web:3dd7d829cb8acf4d62b900"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Функция для логина пользователя
const loginForm = document.getElementById('login-btn');
loginForm.addEventListener('click', function(event) {


    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            alert("Login successful!");
           window.location.href = "/index.html";  
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert("Error: " + errorMessage);
        });
});
