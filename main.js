import animator from '/animate_game.js';
import dictionary from '/dictionary.js';
const animObject = new animator(25);
const dicObect = new dictionary();
const apiUrl = new URL(`https://random-word-api.herokuapp.com/word?lang=en`);

const wordInput = document.getElementById('word-input');
const submitButton = document.getElementById('submit-button');
const current_mode_text = document.getElementById('current_mode');
const current_mode_btn = document.getElementById('current_mode_btn');
const current_lang_btn = document.getElementById('current_lang_btn');
const current_lang_text = document.getElementById('current_lang');
const wrong_count_text = document.getElementById('wrong_count');
const add_word_text = document.getElementById('add_word_text');
const word_FRONT = document.getElementById("word");
const wrong_letters_FRONT = document.getElementById("wrong_letters");
const max_tries = 10;

let english = false;
let wrong_count = max_tries;
let word_from_list = false;
let gameOn = false;
let wordChars = [];
let correctChars = [];
let wrongChars = [];
let allowed_to_add_word = false;

//////////////// ADDING WORD TO THE GLOBAL LIST //////////////////
submitButton.addEventListener('click', async (event) => {
    // preventing default behaviour and checking for correct inputs
    event.preventDefault();
    if (!allowed_to_add_word) {
        wordInput.value = "You must win a round first!";
        return;
    }
    if (wordInput.value.match(/[0-9 ]/)) return;
    if (english) if (!wordInput.value.match(/[a-zA-z]/)) return;
    else if (!wordInput.value.match(/[a-zA-zäöüÄÖÜ]/)) return;
    //
    let check_word_request = new URL("https://api.dictionaryapi.dev/api/v2/entries/en/" + wordInput.value);
    let response = await fetch(check_word_request);
    let data = await response.json();
    let obj = JSON.parse(JSON.stringify(data));
    if (obj.title) console.log("not a word");
    else if (!word_exists(wordInput.value)) {
        let length = localStorage.length + 1
        localStorage.setItem(length.toString(), wordInput.value);
        allowed_to_add_word = false;
        wordInput.value = 'Word Added!';
        add_word_text.style.color = '#f5f5f5';
    } else {
        wordInput.value = 'Word already exists!';
    }
});

//////////////// KEY DOWN EVENT //////////////////
document.addEventListener('keydown', (event) => {
    if (!gameOn) return;
    if (event.key.match(/[0-9]/)) return;
    if (english) { if ((event.key.replace(/[^a-zA-Z]/g, "").length == 0)) return; }
    else { if ((event.key.replace(/[^a-zA-ZäöüÄÖÜ]/g, "").length == 0)) return; }
    if ((event.key.length > 1)) return; // work here !!!!!!!!!!!!!!!!!!!!!!!!
    let guessed_letter = event.key.toLocaleLowerCase();
    if (letterInWord(guessed_letter)) {
        correctChars.push(guessed_letter);
        refreshWord();
        if (won()) {
            word_FRONT.style.color = "#33ff44";
            gameOn = false;
            allowed_to_add_word = true;
            add_word_text.style.color = '#33ff44';
        }
    } else {
        if (wrongChars.length != 0) {
            if (letterAlreadyWrong(guessed_letter)) {
                return;
            }
        }
        wrongChars.push(guessed_letter);
        wrong_count++;
        refreshWrongGuesses();
        animObject.animate_step(wrong_count);
        if (wrong_count >= max_tries) lose();
    }

}, true);

//////////////// STARTING GAME ON PRESSING BUTTON //////////////////
document.getElementById("startgame").addEventListener('click', async function () {
    let wordLower;
    gameOn = false;
    if (!word_from_list) {
        if (english) {
            let response;
            let data;
            response = await fetch(apiUrl);
            data = await response.json();
            wordLower = data[0].toLowerCase();
            wordChars = wordLower.split("");
        } else {
            do {
                wordLower = dicObect.getRandom().toLocaleLowerCase("de");
            } while (wordLower.match(/[0-9]-/))
            wordChars = wordLower.split("");
        }
    } else {
        wordChars = get_random_word().toLocaleLowerCase().split("");

    }
    gameOn = true;
    wrong_count = 0;
    correctChars = [];
    wrongChars = [];
    wrong_letters_FRONT.innerHTML = "";
    wrong_count_text.innerHTML = "";
    word_FRONT.style.color = "#f5f5f5";
    animObject.animate_step(0);
    refreshWord();
},
    true  // Enable event capturing!
);

//////////////// CHECK IF GUESSED LETTER IS CORRECT //////////////////
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

function refreshWrongGuesses() {
    wrong_letters_FRONT.innerHTML = "Wrong Guesses: " + wrongChars;
    wrong_count_text.innerHTML = "Amount of Wrong Guesses: " + wrong_count;
}

function letterAlreadyWrong(letter) {
    for (let wrongLetter of wrongChars) {
        if (wrongLetter == letter) return true;
    }
    return false;
}
//////////////// RETURN STRING WITH GUESSED AND STILL HIDDEN LETTERS //////////////////
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
        if (!letterFound) hiddenWord[index] = " _";
        index++;
    }

    let baked_word = hiddenWord;
    return baked_word;
}
//////////////// WINNING CASE CHECK //////////////////
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
//////////////// FUNCTION UPON LOSS //////////////////
function lose() {
    gameOn = false;
    word_FRONT.style.color = "#ff2222";
    correctChars = wordChars;
    refreshWord();
}
/////////////////////////////////////////////////////
/////////////// WORDLIST CLASS //////////////////////
/////////////////////////////////////////////////////

function get_random_word() {
    return localStorage.getItem((Math.floor(Math.random() * localStorage.length)) + 1);
}

//////////////// CHECK IF INPUTED WORD ALREADY EXISTS IN LOCAL STORAGE //////////////////
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

current_lang_btn.addEventListener('click', function () {
    english = !english
    if (english) current_lang_text.textContent = "English"
    else current_lang_text.textContent = "German"
}, true)