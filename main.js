let gameOn = false;
let wordChars = [];
let correctChars = [];
let wrongChars = [];


document.addEventListener('keydown', (event) => {
    if (!gameOn) return;

    if ((event.key.replace(/[A-Za-z]/, "").length != 0)) return;

    correct = letterInWord(event.key);

    if (correct != false) {
        correctChars = correctChars + event.key;
        console.log("refreshing");
        refreshWord();
        if (won()) {
            console.log("YOU WON");
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

function getWord() {
    gameOn = true;
    correctChars = [];
    wrongChars = [];
    wrong_letters_FRONT.innerHTML = "";

    let wordGen;
    wordGen = new RandomWordGen().fetchRandomWord().toLocaleLowerCase();
    wordChars = wordGen.split("");
    refreshWord();
}

function letterInWord(guessed) {
    correct = false;
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
    for (wrong_letter of wrongChars) {
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

    baked_word = hidden_word;
    return baked_word;
}

function won() {
    for (letter of wordChars) {
        let found = false;
        for (correct_letter of correctChars) {
            if (correct_letter == letter) {
                found = true;
                break;
            }
        }
        if (!found) return false;
    }
    return true;
}