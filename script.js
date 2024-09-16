const firebaseConfig = {
    apiKey: "AIzaSyDY-3QUGeshEhuVU0g5JwNpZd2oYAYwR9A",
    authDomain: "forum-diskus.firebaseapp.com",
    projectId: "forum-diskus",
    storageBucket: "forum-diskus.appspot.com",
    messagingSenderId: "434039824623",
    appId: "1:434039824623:web:8f2bbc06217bd06fd4bb1a",
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

function loadCategories() {
    const categoryList = document.getElementById('categoryList');
    db.ref('categories').on('value', snapshot => {
        categoryList.innerHTML = '';
        snapshot.forEach(categorySnapshot => {
            const category = categorySnapshot.val();
            const li = document.createElement('li');
            li.innerHTML = `<a href="#">${category.name}</a>`;
            categoryList.appendChild(li);
        });
    });
}

// Function to load topics from Firebase
function loadTopics() {
    const topicList = document.getElementById('topicList');
    db.ref('topics').on('value', snapshot => {
        topicList.innerHTML = '';
        snapshot.forEach(topicSnapshot => {
            const topic = topicSnapshot.val();
            const div = document.createElement('div');
            div.classList.add('topic');
            div.innerHTML = `
                <h3><a href="#">${topic.title}</a></h3>
                <p>Ditulis oleh <strong>${topic.author}</strong> pada ${topic.date}</p>
                <p>${topic.content}</p>
            `;
            topicList.appendChild(div);
        });
    });
}

// Load categories and topics when page loads
window.onload = () => {
    loadCategories();
    loadTopics();
};

// Modal functionality
const loginModal = document.getElementById('loginModal');
const loginLink = document.getElementById('loginLink');
const closeModal = document.getElementById('closeModal');

loginLink.onclick = () => {
    loginModal.style.display = 'flex';
};

closeModal.onclick = () => {
    loginModal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
};

// Handle login form submission
document.getElementById('loginForm').onsubmit = (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Replace this with your actual login logic
    alert(`Username: ${username}\nPassword: ${password}`);
    loginModal.style.display = 'none';
};
