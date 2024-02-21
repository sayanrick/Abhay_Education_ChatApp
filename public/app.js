const socket = io();
const sendBtn = document.getElementById("sendBtn");
const msgInput = document.getElementById('msg');
const usernameInput = document.getElementById('username');
const allMessages = document.getElementById('allMsg');

sendBtn.disabled = true; // Disable send button until a username is entered

// Function to enable the send button when a username is entered
const enableSendButton = () => {
    sendBtn.disabled = !usernameInput.value.trim();
};

usernameInput.addEventListener('input', enableSendButton);

// Simulate the current user
const currentUser = {
    username: '',
};

// Set the username when the user enters it
usernameInput.addEventListener('change', () => {
    currentUser.username = usernameInput.value.trim();
    enableSendButton();
});

socket.on("msg", data => {
    const { username, message } = data;

    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    if (username === currentUser.username) {
        messageElement.classList.add("my-message");
        messageElement.innerHTML = `<span class="username">You:</span> ${message}`;
    } else {
        messageElement.classList.add("other-message");
        messageElement.innerHTML = `<span class="username">${username}:</span> ${message}`;
    }

    allMessages.appendChild(messageElement);
    allMessages.scrollTop = allMessages.scrollHeight; // Scroll to the bottom
});

sendBtn.addEventListener('click', () => {
    const message = msgInput.value;
    console.log(message);
    socket.emit('user-msg', { username: currentUser.username, message });
    msgInput.value = ''; // Clear input after sending
});
