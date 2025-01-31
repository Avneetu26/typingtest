const typingTest = document.querySelector('.typing-test p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
    const paragraph = ["Avoid daydreaming about the years to come.", "You are the most important person in your whole life.", "Always be true to who you are, and ignore what other people have to say about you.", "Only demonstrate your strength when it's really required."]
    const randomIndex = Math.floor(Math.random() * paragraph.length);

    typingTest.innerHTML = '';
    for(const char of paragraph[randomIndex]) {
        typingTest.innerHTML += `<span>${char}</span>`;
    }
    typingTest.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', () => {
        input.focus();
    })
    typingTest.addEventListener("click", () => {
        input.focus();
    })
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        const wpmV = Math.round(((charIndex - mistake) / 5) / (maxTime - timeLeft) * 60);
        wpm.innerText = wpmV;
    } else {
        clearInterval(timer);
    }
}

// user input
function initTyping() {
    const char = typingTest.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0) {

        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if(char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add('correct');
        } else {
            char[charIndex].classList.add('incorrect');
            mistake++;
        }
        charIndex++;
        if(charIndex < char.length) {
            char[charIndex].classList.add('active');
        }
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    } else {
        clearInterval(timer);
        input.value = '';
    }

}

function reset() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
    time.innerText = timeLeft;
    input.value = '';
}

input.addEventListener("input", initTyping);

btn.addEventListener("click", reset);

loadParagraph();