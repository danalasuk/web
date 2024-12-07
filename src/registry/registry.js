
const firebaseConfig = {
    apiKey: "AIzaSyBZZXyElzLodd423Io73iFzYVUO5g2srIs",
    authDomain: "weblogin-31a5e.firebaseapp.com",
    projectId: "weblogin-31a5e",
    storageBucket: "weblogin-31a5e.firebasestorage.app",
    messagingSenderId: "803143596801",
    appId: "1:803143596801:web:3dd7d829cb8acf4d62b900"
};


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);


const registerForm = document.getElementById('register-btn');
registerForm.addEventListener('click', async (e) => {


    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        window.location.href = "login.html";

        await addDoc(collection(db, "users"), {
            email: email,
            uid: user.uid,
            createdAt: new Date(),
        });

       
    } catch (error) {
        console.error("Error registering user:", error);
        alert("Error registering user: " + error.message);
    }
});
