
const logoutBtn = document.querySelector("#logout-button");

logoutBtn.addEventListener("click", () => {
    window.location = 'index.html';
})

const main = document.querySelector("main");

// AI Chatbot response

const aiResponse = () => {
    const aiSection = document.createElement('section');
    aiSection.classList.add('ai-chat-section');

    const aiProfileDiv = document.createElement('div');
    aiProfileDiv.classList.add('profile');

    const aiIMG = document.createElement('img');
    aiIMG.classList.add('profileIMG');
    aiIMG.src = "tcgc_logo.jpg";


    const aiMessageDiv = document.createElement('div');
    aiMessageDiv.classList.add("message");
    aiMessageDiv.innerText = "Hello! How may I help you?"

    // setTimeout(() => {
    main.appendChild(aiSection);

    aiSection.appendChild(aiProfileDiv);
    aiProfileDiv.appendChild(aiIMG);

    aiSection.appendChild(aiMessageDiv);
    main.scrollTop = main.scrollHeight;
    // }, 1000);
}







// User Response
const textarea = document.querySelector("textarea");



const userResponse = () => {

    if ((textarea.value.trim() === "")) {

    } else {
        const userSection = document.createElement('section');
        userSection.classList.add('student-chat-section');

        const userProfileDiv = document.createElement('div');
        userProfileDiv.classList.add('profile');

        const userIMG = document.createElement('img');
        userIMG.classList.add('profileIMG');
        userIMG.src = "user_image.jpg";

        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add("message");
        userMessageDiv.innerText = textarea.value;

        main.appendChild(userSection);

        userSection.appendChild(userProfileDiv);
        userProfileDiv.appendChild(userIMG);

        userSection.appendChild(userMessageDiv);
        textarea.value = "";

        main.scrollTop = main.scrollHeight;

        aiResponse();
    }
}

// send message
const sendMessageButton = document.querySelector("#send-button");
sendMessageButton.addEventListener("click", userResponse);

textarea.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault(); // Prevent the default Enter key behavior

        const cursorPos = textarea.selectionStart;
        const textBeforeCursor = textarea.value.substring(0, cursorPos);
        const textAfterCursor = textarea.value.substring(cursorPos);

        textarea.value = `${textBeforeCursor} \n${textAfterCursor} `;

        textarea.selectionStart = cursorPos + 1;
        textarea.selectionEnd = cursorPos + 1;
    } else if (e.key === 'Enter') {
        e.preventDefault(); // Prevent the default Enter key behavior
        userResponse();
    }
});


// const run = require('./main');

// const responseText = run("Hello There!");

// console.log(responseText);