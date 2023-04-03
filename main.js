const apiUrl = new URL(`https://random-word-api.herokuapp.com/word?lang=en`);
const wordInput = document.getElementById('word-input');
const submitButton = document.getElementById('submit-button');
const current_mode_text = document.getElementById('current_mode');
const current_mode_btn = document.getElementById('current_mode_btn');

let word_from_list = false;
let gameOn = false;
let wordChars = [];
let correctChars = [];
let wrongChars = [];

submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    if (wordInput.value.match(/[1-9 ]/)) return;
    if (!wordInput.value.match(/[a-zA-z]/)) return;
    let check_word_request = new URL("https://api.dictionaryapi.dev/api/v2/entries/en/" + wordInput.value);
    let response = await fetch(check_word_request);
    let data = await response.json();
    let obj = JSON.parse(JSON.stringify(data));
    if (obj.title) console.log("not a word");
    else if (!word_exists(wordInput.value)) {
        let length = localStorage.length + 1
        localStorage.setItem(length.toString(), wordInput.value);
    }
    wordInput.value = '';
});

document.addEventListener('keydown', (event) => {
    if (!gameOn) return;

    if (event.key.match(/[0-9]/)) return;
    if ((event.key.replace(/[^a-zA-Z]/g, "").length == 0)) return;
    if ((event.key.length > 1)) return;

    if (letterInWord(event.key.toLocaleLowerCase())) {
        correctChars = correctChars + event.key;
        refreshWord();
        if (won()) {
            word_FRONT.style.color = "#33ff44";
            gameOn = false;
        }
    } else {
        if (wrongChars.length != 0) {
            if (letterAlreadyWrong(event.key)) {
                return;
            }
        }
        wrongChars.push(event.key);
        refreshWrongGuesses();
    }

}, true);

let word_FRONT = document.getElementById("word");
let wrong_letters_FRONT = document.getElementById("wrong_letters");

window.onload = function () {
    getWord();
}

document.getElementById("startgame").addEventListener('click', async function () {
    gameOn = true;
    correctChars = [];
    wrongChars = [];
    wrong_letters_FRONT.innerHTML = "";
    word_FRONT.style.color = "#f5f5f5";
    if (!word_from_list) {
        let response;
        let data;
        let wordLower;
        response = await fetch(apiUrl);
        data = await response.json();
        wordLower = data[0].toLowerCase();
        wordChars = wordLower.split("");
    } else {
        wordChars = get_random_word().toLocaleLowerCase().split("");

    }
    refreshWord();
},
    true  // Enable event capturing!
);

function getWord() {

}

function letterInWord(guessed) {
    let correct = false;
    for (let letter of wordChars) {
        if (guessed == letter) {
            correct = guessed;
            break;
        }
    }
    return correct;
}

function refreshWord() {
    word_FRONT.innerHTML = bakeWord(wordChars).join("");
}

function letterAlreadyWrong(letter) {
    for (let wrongLetter of wrongChars) {
        if (wrongLetter == letter) return true;
    }
    return false;
}

function refreshWrongGuesses() {
    wrong_letters_FRONT.innerHTML = "Wrong Guesses: " + wrongChars;
}

function bakeWord(word) {
    let hiddenWord = [];
    let index = 0;
    for (var i = 0; i < word.length; i++) {
        let letterFound = false;
        for (var k = 0; k < correctChars.length; k++) {
            if (word[i] == correctChars[k]) {
                letterFound = true;
                hiddenWord[index] = correctChars[k];
            }
        }
        if (!letterFound) hiddenWord[index] = "_";
        index++;

    }

    let baked_word = hiddenWord;
    return baked_word;
}

function won() {
    for (let letter of wordChars) {
        let found = false;
        for (let correct_letter of correctChars) {
            if (correct_letter == letter) {
                found = true;
                break;
            }
        }
        if (!found) return false;
    }
    return true;
}
/////////////// WORDLIST CLASS
function get_random_word() {
    return localStorage.getItem((Math.floor(Math.random() * localStorage.length)) + 1);
}

function word_exists(new_word) {
    for (var i = 0; i < localStorage.length; i++) {
        console.log("checking: " + localStorage.getItem(localStorage.key(i)));
        if (new_word == localStorage.getItem(localStorage.key(i))) {
            console.log("found match");
            return true;
        }
        console.log(new_word + " != " + localStorage.getItem(localStorage.key(i)));
    }
    return false;
}

current_mode_btn.addEventListener('click', function () {
    word_from_list = !word_from_list
    if (word_from_list) current_mode_text.textContent = "List"
    else current_mode_text.textContent = "Dictionary"
}, true)