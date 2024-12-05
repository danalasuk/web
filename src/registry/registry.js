// Firebase configuration (замените на ваши собственные ключи)
const firebaseConfig = {
    apiKey: "AIzaSyBZZXyElzLodd423Io73iFzYVUO5g2srIs",
    authDomain: "weblogin-31a5e.firebaseapp.com",
    projectId: "weblogin-31a5e",
    storageBucket: "weblogin-31a5e.firebasestorage.app",
    messagingSenderId: "803143596801",
    appId: "1:803143596801:web:3dd7d829cb8acf4d62b900"
};

// Инициализация Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Обработчик отправки формы
const registerForm = document.getElementById('register-btn');
registerForm.addEventListener('click', async (e) => {
   // e.preventDefault(); // Предотвращаем перезагрузку страницы

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        // Регистрация пользователя с помощью Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Добавление пользователя в Firestore (если нужно)
        await addDoc(collection(db, "users"), {
            email: email,
            uid: user.uid,
            createdAt: new Date(),
        });

        // Переадресация на главную страницу после успешной регистрации
        window.location.href = "login.html"; 
    } catch (error) {
        console.error("Error registering user:", error);
        alert("Error registering user: " + error.message);
    }
});
