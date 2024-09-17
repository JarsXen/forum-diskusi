// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDY-3QUGeshEhuVU0g5JwNpZd2oYAYwR9A",
    authDomain: "forum-diskus.firebaseapp.com",
    projectId: "forum-diskus",
    storageBucket: "forum-diskus.appspot.com",
    messagingSenderId: "434039824623",
    appId: "1:434039824623:web:8f2bbc06217bd06fd4bb1a",
    databaseURL: "https://forum-diskus-default-rtdb.asia-southeast1.firebasedatabase.app/" 
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database(); // Use this if you have databaseURL

// Modal Elements
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const resetPasswordModal = document.getElementById('resetPasswordModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeSignupModal = document.getElementById('closeSignupModal');
const closeResetModal = document.getElementById('closeResetModal');
const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');
const resetPasswordLink = document.getElementById('resetPasswordLink');

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

// Show Modal Function
function showModal(modal) {
    modal.style.display = 'flex';
}

// Hide Modal Function
function hideModal(modal) {
    modal.style.display = 'none';
}

// Event to open signup modal from login
signupLink.addEventListener('click', () => {
    hideModal(loginModal);
    showModal(signupModal);
});

// Event to open login modal from signup
loginLink.addEventListener('click', () => {
    hideModal(signupModal);
    showModal(loginModal);
});

// Event to close login modal
closeLoginModal.addEventListener('click', () => {
    hideModal(loginModal);
});

// Event to close signup modal
closeSignupModal.addEventListener('click', () => {
    hideModal(signupModal);
});

// Event to close reset password modal
closeResetModal.addEventListener('click', () => {
    hideModal(resetPasswordModal);
});

// Event for login
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Firebase Authentication logic for login
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Login successful:', userCredential.user);
            hideModal(loginModal);

            // Show toast notification using SweetAlert2
            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            });

            // Redirect to homepage or dashboard after successful login
            window.location.href = 'index.html'; // Replace with your target page
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

// Event for signup
document.getElementById('signupForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // Firebase Authentication for signup
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Registration successful:', userCredential.user);
            const userId = userCredential.user.uid;

            // Save user data to Realtime Database after successful signup
            database.ref('users/' + userId).set({
                email: email,
                createdAt: new Date().toISOString()
            });

            hideModal(signupModal);
            Swal.fire({
                title: 'Good job!',
                text: 'Registration successful! Please log in.',
                icon: 'success'
            });

            window.location.href = 'index.html';
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

// Event for reset password
document.getElementById('resetPasswordForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload

    const email = document.getElementById('resetEmail').value;

    auth.sendPasswordResetEmail(email)
        .then(() => {
            Swal.fire({
                title: 'Email Sent!',
                text: 'Please check your inbox to reset your password.',
                icon: 'success'
            });
            hideModal(resetPasswordModal);
        })
        .catch((error) => {
            console.error('Error during password reset:', error);
            Swal.fire({
                title: 'Oops!',
                text: 'Failed to send reset email: ' + error.message,
                icon: 'error'
            });
        });
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        hideModal(loginModal);
    } else if (event.target === signupModal) {
        hideModal(signupModal);
    } else if (event.target === resetPasswordModal) {
        hideModal(resetPasswordModal);
    }
});

// Open reset password modal
resetPasswordLink.addEventListener('click', () => {
    showModal(resetPasswordModal);
});
