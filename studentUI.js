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


async function run(msg) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts:
                    [
                        { text: "From now on your name is TCGC Chatbot" },
                        { text: "Remember this: Tangub City Global College (TCGC) is the new name for GADTC " },
                        { text: "Remember this: Vision GADTC is integral to Tangub City’s becoming a center for learning and eco-cultural tourism by producing God-centered citizens committed to be THE LIGHT OF THE WORLD." },
                        { text: "Remember this: Mission To provide opportunities for continuing education for faculty and staff, providing upgraded facilities for quality and research-based instruction to students towards community engagement and linkages to industry." },
                        { text: "Remember this: Core Values: Integrity, Compassion, and Excellence." },
                        { text: "Remember this: Quality Policy: Commits to nurture the academic excellence through quality instruction, establish research and community extension programs that facilitate the transfer of knowledge and skills, foster leadership and promote self-reliance among the people." },
                        { text: "Remember this: e-Admission Requirements: College FRESHMEN (NEW ENROLLEES): Accomplished Online Admission Form Form 138 (Senior High School Report Card) 2x2 I.D picture. TRANSFEREES: Accomplished Online Admission Form Transfer Credentials (Honorable Dismissal, Informative Copy of TOR 2x2 I.D. picture. RETURNEE: Accomplished Online Admission Form." },
                        { text: "Remember this: History Gov. Alfonso D. Tan College (GADTC) started as Tangub City College (TCC) in 1984. It was born during the incumbency of the late Mayor Alfonso D. Tan of Tangub City. By virtue of City Ordinance No.15 entitled “An Ordinance Providing for the Establishment and Maintenance of a City College in Tangub City” the college opened its doors on June 1, 1984 to more than 200 pioneering students. Later on 1992, under the term of Gov. Philip T. Tan, nephew of GADTC founder, TCC turned into Gov. Alfonso D. Tan Memorial College (GADTMC). He vowed to improve the College’s facilities and to raise the standards of the school. Its third transition marked on 2003 under the governance of Mayor Jennifer Wee-Tan from GADTMC to Alfonso D. Tan College (ADTC). Afterwards, in 2007 in the same administration it changed into Gov. Alfonso D. Tan College (GADTC). At the present the college still bears the name – Gov. Alfonso D. Tan College, stamped in its wavering green flag which emblematize its excellence and pride with myriads of accomplishments achieved. GADTC continue to uplift the life of each individual, building their dreams and realizing their visions to be the light of the world." }
                    ],
            },
            {
                role: "model",
                parts: [{ text: "Great to meet you. What would you like to know about TCGC?" }],
            },
        ],
        generationConfig: {
            maxOutputTokens: 100,
        },
    });


    try {
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = response.text();
        return text;
    }
    catch (e) {
        console.log(e);
    }
}


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
        const text = await run(userPrompt);
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
