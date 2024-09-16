const firebaseConfig = {
    apiKey: "AIzaSyDY-3QUGeshEhuVU0g5JwNpZd2oYAYwR9A",
    authDomain: "forum-diskus.firebaseapp.com",
    projectId: "forum-diskus",
    storageBucket: "forum-diskus.appspot.com",
    messagingSenderId: "434039824623",
    appId: "1:434039824623:web:8f2bbc06217bd06fd4bb1a",
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Elemen modal
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeSignupModal = document.getElementById('closeSignupModal');
const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');

// SweetAlert2 Toast Configuration
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

// Event untuk membuka modal pendaftaran dari login
signupLink.addEventListener('click', () => {
    loginModal.style.display = 'none';
    signupModal.style.display = 'flex';
});

// Event untuk membuka modal login dari pendaftaran
loginLink.addEventListener('click', () => {
    signupModal.style.display = 'none';
    loginModal.style.display = 'flex';
});

// Event untuk menutup modal login
closeLoginModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Event untuk menutup modal pendaftaran
closeSignupModal.addEventListener('click', () => {
    signupModal.style.display = 'none';
});

// Event untuk login
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Firebase Authentication logic untuk login
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Login successful:', userCredential.user);
            loginModal.style.display = 'none';
            // Tampilkan toast notification menggunakan SweetAlert2
            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            });
            // Anda bisa melakukan redirect atau tindakan setelah login berhasil di sini
        })
        .catch((error) => {
            console.error('Error during login:', error);
            Swal.fire({
                title: 'Oops!',
                text: 'Login failed: ' + error.message,
                icon: 'error'
            });
        });
});

// Event untuk mendaftarkan user baru
document.getElementById('signupForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // Firebase Authentication untuk pendaftaran
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Registration successful:', userCredential.user);
            signupModal.style.display = 'none';
            Swal.fire({
                title: 'Good job!',
                text: 'Registration successful! Please log in.',
                icon: 'success'
            });
        })
        .catch((error) => {
            console.error('Error during sign up:', error);
            Swal.fire({
                title: 'Oops!',
                text: 'Registration failed: ' + error.message,
                icon: 'error'
            });
        });
});

// Menutup modal saat klik di luar area modal
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    } else if (event.target === signupModal) {
        signupModal.style.display = 'none';
    }
});
