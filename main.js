
const apiUrl = new URL(`https://random-word-api.herokuapp.com/word?lang=de`);
const wordInput = document.getElementById('word-input');
const submitButton = document.getElementById('submit-button');


let gameOn = false;
let wordChars = [];
let correctChars = [];
let wrongChars = [];

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (wordInput.value == '') return;
    let newWord = wordInput.value;
    RWG.addWord(newWord);
    wordInput.value = '';
});

document.addEventListener('keydown', (event) => {
    if (!gameOn) return;

    if (event.key.match(/[0-9]/)) return;
    if ((event.key.replace(/[^a-zA-Zäöüß]/g, "").length == 0)) return;
    if ((event.key.length > 1)) return;

    if (letterInWord(event.key.toLocaleLowerCase())) {
        correctChars = correctChars + event.key;
        console.log("refreshing");
        refreshWord();
        if (won()) {
            console.log("YOU WON");
            word_FRONT.style.color = "#33ff44";
            gameOn = false;
        }
    } else {
        if (wrongChars.length != 0) {
            console.log("checking");
            if (letterAlreadyWrong(event.key)) {
                console.log("letter already wrong");
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

    let response;
    let data;
    let wordLower;
    response = await fetch(apiUrl);
    data = await response.json();
    wordLower = data[0].toLowerCase();
    wordChars = wordLower.split("");
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
        console.log(wrongLetter + " matching " + letter);
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