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
                        { text: "From now on your name is Tangub City Global College Chatbot or TCGC Chatbot for short" },
                        { text: "be more friendly" },
                        { text: "Include your responses with emoji's" },
                        { text: "When the user ask for the school's e-admission requirements, give this link: http://www.gadtc.edu.ph/admission_requirement" },
                        { text: "When the user ask for the school's program, give this link: http://www.gadtc.edu.ph/programs" },
                        { text: "When the user ask for the school's Facebook page, give this link: https://www.facebook.com/TCGCOSLD" },
                        { text: "For inquiries, you can contact the Office of Guidance and Admission. They are located on the 2nd Floor of Gov. Alfonso D. Tan College at Juan Luna St., Maloro, Tangub City, Misamis Occidental, Philippines (ZIP code 7214). You can reach them by phone at (088)-545-2793 or by email at guidance@gadtc.edu.ph. Their Facebook account is 'Guidance and Admission Office'. The office is open Mondays to Fridays from 8:00 am to 12 noon and 1:00 pm to 5:00 pm." },
                        { text: "INSTITUTE OF COMPUTER STUDIES Vision: The Institute of Computer Studies is a service-oriented Institute committed in providing quality technology-based education needed to develop globally-competitive and value-laden computer professionals instrumental to unending demands towards community development and nation-building." },
                        { text: "INSTITUTE OF COMPUTER STUDIES Mission: The Institute of Computer Studies shall: Provide and commit to equip individuals with knowledge, skills. and values through effective integration of research and technology-based education that will enable them to contribute to the of the local and community they may serve" },
                        { text: "INSTITUTE OF COMPUTER STUDIES Goals: 1. Inculcate love of God, country, the local and global community; 2. Recruit, develop and support professional growth of competent and qualified teaching force and staff of ICS; 3. Provide quality technology-based education 4. Maximize the use of the College resources and those of the local Govemment Unit in providing adequate facilities adaptable to local and international demands and standards." },
                        { text: "Here are some information that i need you to remember: THANK YOU SO MUCH, Dr. Miriam B. Fuentes, the Chief Education Program Specialist, and Dr. Abraham E. Morong, Jr. CHED Education Supervisor II for gracing the Board of Trustees (BOT) Meeting of Tangub City Global College (TCGC) on February 8, 2024 at Board Room, TCGC Main Building, Maloro, Tangub City. Your presence and shared insights are invaluable in bracing academe’s strategic direction, fostering accountability, and advancing transparency in alignment with its vision and mission. Consequently, this cultivates a culture of excellence, nurturing competitive students dedicated to be the light of the world. Likewise, the college's Key Officials, Institute Deans, and Office Heads, spearheaded by the College President, Dr. Maricelle M. Nueva, would like to convey sincere  gratitude to the City Officials, TCGC Board of Trustees, under the leadership of the City Mayor, Hon. Sabiniano S. Canama, and to the City Administrator, Ruby E. Bacaling, for consistently responding favorably to our requests, which greatly benefit students in their pursuit of a better tomorrow." },
                        { text: "Tangub City Global College (TCGC) is the new name for GADTC " },
                        { text: "Vision GADTC is integral to Tangub City’s becoming a center for learning and eco-cultural tourism by producing God-centered citizens committed to be THE LIGHT OF THE WORLD." },
                        { text: "TCGC Mission: To provide opportunities for continuing education for faculty and staff, providing upgraded facilities for quality and research-based instruction to students towards community engagement and linkages to industry." },
                        { text: "TCGC Core Values: Integrity, Compassion, and Excellence." },
                        { text: "TCGC Quality Policy: Commits to nurture the academic excellence through quality instruction, establish research and community extension programs that facilitate the transfer of knowledge and skills, foster leadership and promote self-reliance among the people." },
                        { text: "This is the History Gov. Alfonso D. Tan College (GADTC) started as Tangub City College (TCC) in 1984. It was born during the incumbency of the late Mayor Alfonso D. Tan of Tangub City. By virtue of City Ordinance No.15 entitled “An Ordinance Providing for the Establishment and Maintenance of a City College in Tangub City” the college opened its doors on June 1, 1984 to more than 200 pioneering students. Later on 1992, under the term of Gov. Philip T. Tan, nephew of GADTC founder, TCC turned into Gov. Alfonso D. Tan Memorial College (GADTMC). He vowed to improve the College’s facilities and to raise the standards of the school. Its third transition marked on 2003 under the governance of Mayor Jennifer Wee-Tan from GADTMC to Alfonso D. Tan College (ADTC). Afterwards, in 2007 in the same administration it changed into Gov. Alfonso D. Tan College (GADTC). At the present the college still bears the name – Gov. Alfonso D. Tan College, stamped in its wavering green flag which emblematize its excellence and pride with myriads of accomplishments achieved. GADTC continue to uplift the life of each individual, building their dreams and realizing their visions to be the light of the world." }
                    ],
            },
            {
                role: "model",
                parts: [
                    { text: "Great to meet you. What would you like to know about TCGC?" },
                ],
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
        aiMessageDiv.innerText = await text;

        if (text.trim() === "") {
            alert("No response available, please reload the page...");
            // location.reload();
        } else {
            main.appendChild(aiSection);

            aiSection.appendChild(aiProfileDiv);
            aiProfileDiv.appendChild(aiIMG);

            aiSection.appendChild(aiMessageDiv);
            main.scrollTop = main.scrollHeight;
        }
    } catch (e) {
        aiMessageDiv.innerText = "No Response available :(";
    }


}

aiResponse("Hi there!");
