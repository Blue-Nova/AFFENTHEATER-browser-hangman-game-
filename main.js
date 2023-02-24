import { RandomWordGen } from "./randomWordGen.js";

let gameOn = false;
let wordChars = [];
let correctChars = [];
let wrongChars = [];


document.addEventListener('keydown', (event) => {
    if (!gameOn) return;

    if ((event.key.replace(/[A-Za-z]/, "").length != 0)) return;

    let correct = letterInWord(event.key);

    if (correct != false) {
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

}, false);

let word_FRONT = document.getElementById("word");
let wrong_letters_FRONT = document.getElementById("wrong_letters");

window.onload = function () {
    getWord();
}

document.getElementById("startgame").addEventListener('click', function () {
    gameOn = true;
    correctChars = [];
    wrongChars = [];
    wrong_letters_FRONT.innerHTML = "";
    word_FRONT.style.color = "#000000";

    let wordGen;
    wordGen = new RandomWordGen().fetchRandomWord().toLocaleLowerCase();
    wordChars = wordGen.split("");
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
    for (let wrong_letter of wrongChars) {
        console.log(wrong_letter + " matching " + letter);
        if (wrong_letter == letter) return true;
    }
    return false;
}

function refreshWrongGuesses() {
    wrong_letters_FRONT.innerHTML = "Wrong Guesses: " + wrongChars;
}

function bakeWord(word) {
    let hidden_word = [];
    let index = 0;
    for (var i = 0; i < word.length; i++) {
        let letter_found = false;
        for (var k = 0; k < correctChars.length; k++) {
            if (word[i] == correctChars[k]) {
                letter_found = true;
                hidden_word[index] = correctChars[k];
            }
        }
        if (!letter_found) hidden_word[index] = "_";
        index++;

    }

    let baked_word = hidden_word;
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