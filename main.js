// LIBS, API, AND CLASSES//
import animator from '/animate_game.js';
import dictionary from '/dictionary.js';
const anim_object = new animator(25);
const dic_object = new dictionary();
const api_url = new URL(`https://random-word-api.herokuapp.com/word?lang=en`);

// INIT. DOM ELEMENTS//
const night_mode_toggle = document.getElementById("night-mode-toggle");
const word_input = document.getElementById('word_input');
const submit_btn = document.getElementById('submit_btn');
const current_mode_text = document.getElementById('current_mode');
const current_mode_btn = document.getElementById('current_mode_btn');
const current_lang_btn = document.getElementById('current_lang_btn');
const current_lang_text = document.getElementById('current_lang');
const word_add_div = document.getElementById('word_add_div');
const wrong_count_text = document.getElementById('wrong_count');
const word_FRONT = document.getElementById("word");
const wrong_letters_FRONT = document.getElementById("wrong_letters");
const theme_txt = document.getElementById("theme_txt");
const word_add_response = document.getElementById("word_add_response");

// GAME VARIABLES//
const max_tries = 10;
let english = false;
let wrong_count = max_tries;
let word_from_list = false;
let game_on = false;
let word_chars = [];
let correct_chars = [];
let wrong_chars = [];
let allowed_to_add_word = false;

//////////////// ADDING WORD TO THE GLOBAL LIST //////////////////
submit_btn.addEventListener('click', async (event) => {
    // preventing default behaviour and checking for correct inputs
    event.preventDefault();
    if (!allowed_to_add_word) {
        word_input.value = "You must win a round first!";
        return;
    }
    if (word_input.value.match(/[0-9\s]/)) return;
    if (english) if (!word_input.value.match(/[a-zA-z]/)) return;
    else if (!word_input.value.match(/[a-zA-zäöüÄÖÜ]/)) return;
    //
    const check_word_request = new URL("https://api.dictionaryapi.dev/api/v2/entries/en/" + word_input.value);
    const response = await fetch(check_word_request);
    const data = await response.json();
    const obj = JSON.parse(JSON.stringify(data));
    if (obj.title) word_add_response.innerHTML = 'Not a Word!';
    else if (!word_exists(word_input.value)) {
        let local_length = localStorage.length + 1
        localStorage.setItem(local_length.toString(), word_input.value.toLocaleLowerCase());
        allowed_to_add_word = false;
        setTimeout(() => {
            word_add_div.style.transition = "opacity 0.3s ease, margin-left 0.3s ease";
            word_add_div.style.opacity = 0;
            word_add_div.style.marginLeft = '40px';
            setTimeout(() => {
                word_add_div.style.visibility = "hidden";
                word_add_response.innerHTML = '&nbsp;';
                word_input.value = '';
            }, 300);
        }, 1000);
        word_add_response.innerHTML = 'Word Added!';
    } else {
        word_add_response.innerHTML = 'Word already exists!';
    }
});

//////////////// KEY DOWN EVENT //////////////////
document.addEventListener('keydown', (event) => {
    if (!game_on) return;
    if (event.key.match(/[0-9]/) || (event.key.length > 1)) return;
    if (english) { if ((event.key.replace(/[^a-zA-Z]/g, "").length == 0)) return; }
    else { if ((event.key.replace(/[^a-zA-ZäöüÄÖÜ]/g, "").length == 0)) return; }
    const guessed_letter = event.key.toLocaleLowerCase();
    if (letterInWord(guessed_letter)) {
        correct_chars.push(guessed_letter);
        refreshWord();
        if (won()) {
            game_on = false;
            allowed_to_add_word = true;
            word_add_div.style.visibility = "visible";
            word_add_div.style.opacity = 1;
            word_add_div.style.marginLeft = "0px";
        }
    } else {
        if (wrong_chars.length != 0) {
            if (letterAlreadyWrong(guessed_letter)) {
                return;
            }
        }
        wrong_chars.push(guessed_letter);
        wrong_count++;
        refreshWrongGuesses();
        anim_object.animate_step(wrong_count);
        if (wrong_count >= max_tries) lose();
    }

}, true);

//////////////// STARTING GAME ON PRESSING BUTTON //////////////////
document.getElementById("startgame").addEventListener('click', async function () {
    game_on = false;
    if (!word_from_list) {
        let word_lower;
        if (english) {
            const response = await fetch(api_url);
            const data = await response.json();
            word_lower = data[0].toLowerCase();
            word_chars = di.split("");
        } else {
            do {
                word_lower = dic_object.getRandom().toLocaleLowerCase("de");
            } while (word_lower.match(/[0-9]-/))
            word_chars = word_lower.split("");
        }
    } else {
        word_chars = get_random_word().toLocaleLowerCase().split("");

    }
    game_on = true;
    wrong_count = 0;
    correct_chars = [];
    wrong_chars = [];
    wrong_letters_FRONT.innerHTML = "&nbsp;";
    wrong_count_text.innerHTML = "&nbsp;";
    anim_object.animate_step(0);
    refreshWord();
},
    true  // Enable event capturing!
);

//////////////// CHECK IF GUESSED LETTER IS CORRECT //////////////////
function letterInWord(guessed) {
    let correct = false;
    for (let letter of word_chars) {
        if (guessed == letter) {
            correct = guessed;
            break;
        }
    }
    return correct;
}

function refreshWord() {
    word_FRONT.innerHTML = bakeWord(word_chars).join("");
}

function refreshWrongGuesses() {
    wrong_letters_FRONT.innerHTML = wrong_chars;
    wrong_count_text.innerHTML = "Amount of Wrong Guesses: " + wrong_count;
}

function letterAlreadyWrong(letter) {
    for (let wrongLetter of wrong_chars) {
        if (wrongLetter == letter) return true;
    }
    return false;
}
//////////////// RETURN STRING WITH GUESSED AND STILL HIDDEN LETTERS //////////////////
function bakeWord(word) {
    let hidden_word = [];
    let index = 0;
    for (let i = 0; i < word.length; i++) {
        let letterFound = false;
        for (let k = 0; k < correct_chars.length; k++) {
            if (word[i] == correct_chars[k]) {
                letterFound = true;
                hidden_word[index] = correct_chars[k];
            }
        }
        if (!letterFound) hidden_word[index] = " _";
        index++;
    }

    return hidden_word;
}
//////////////// WINNING CASE CHECK //////////////////
function won() {
    for (let letter of word_chars) {
        let found = false;
        for (let correct_letter of correct_chars) {
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
    game_on = false;
    correct_chars = word_chars;
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
    for (let i = 0; i < localStorage.length; i++) {
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
    word_from_list = !word_from_list;
    if (word_from_list) current_mode_text.textContent = "List";
    else current_mode_text.textContent = "Dictionary";
}, true)

current_lang_btn.addEventListener('click', function () {
    english = !english;
    if (english) current_lang_text.textContent = "English";
    else current_lang_text.textContent = "German";
}, true)

///////////// USER EXP. ///////////

night_mode_toggle.addEventListener("change", function () {
    document.body.classList.toggle("dark-mode");
    if (night_mode_toggle.checked) theme_txt.innerHTML = "Dark";
    else theme_txt.innerHTML = "Light";
});