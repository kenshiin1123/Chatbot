const logoutBtn = document.querySelector("#logout-button");

logoutBtn.addEventListener("click", () => {
    window.location = 'index.html';
})

import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyDSf7ipN6c7nC2bE3AsYR08QFrEngje4sM";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const main = document.querySelector("main");

const textarea = document.querySelector("textarea");

const userResponse = () => {
    if (textarea.value.trim() === "") {
        // Handle empty input if needed
    } else {
        const userInput = textarea.value; // Store the user input before clearing
        textarea.value = ""; // Clear the textarea after storing the input

        const userSection = document.createElement('section');
        userSection.classList.add('student-chat-section');

        const userProfileDiv = document.createElement('div');
        userProfileDiv.classList.add('profile');

        const userIMG = document.createElement('img');
        userIMG.classList.add('profileIMG');
        userIMG.src = "user_image.jpg";

        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add("message");
        userMessageDiv.innerText = userInput; // Use the stored input here

        main.appendChild(userSection);

        userSection.appendChild(userProfileDiv);
        userProfileDiv.appendChild(userIMG);

        userSection.appendChild(userMessageDiv);

        main.scrollTop = main.scrollHeight;

        aiResponse(userInput); // Pass the stored input to aiResponse
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


const aiResponse = async (userPrompt) => {

    const aiSection = document.createElement('section');
    aiSection.classList.add('ai-chat-section');

    const aiProfileDiv = document.createElement('div');
    aiProfileDiv.classList.add('profile');

    const aiIMG = document.createElement('img');
    aiIMG.classList.add('profileIMG');
    aiIMG.src = "tcgc_logo.jpg";

    const aiMessageDiv = document.createElement('div');
    aiMessageDiv.classList.add("message");

    try {
        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        const text = await response.text();

        aiMessageDiv.innerText = text;
    } catch (e) {
        aiMessageDiv.innerText = "No Response available :(";
    }

    main.appendChild(aiSection);

    aiSection.appendChild(aiProfileDiv);
    aiProfileDiv.appendChild(aiIMG);

    aiSection.appendChild(aiMessageDiv);
    main.scrollTop = main.scrollHeight;
}

aiResponse("Hi there!");
