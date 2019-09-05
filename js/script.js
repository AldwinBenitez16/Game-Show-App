const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

const keys = document.querySelectorAll('.keyrow button'); 
const hearts = document.querySelectorAll('#scoreboard ol li'); 

// Getting rid of overlay
const overlay = document.getElementsByClassName('start')[0];
const overlayBtn = document.getElementsByClassName('btn__reset')[0];
const keyboard = qwerty.querySelectorAll('button');
const heading = document.createElement('h2');

overlay.appendChild(heading);

overlayBtn.addEventListener('click', (e) => {
    if (e.target.textContent === 'Start Game') {
        startGame();
    } else if (e.target.textContent === 'Play Again') {
        startGame();
    }
});

function startGame() {
    overlay.style.display = 'none';
    let randomPhrase = getRandomPhrase(phrases);
    addPhraseToDisplay(randomPhrase);
    for(let i = 0; i < keyboard.length; i++) {
        keyboard[i].className = '';
    }
    keyHistory = [];
    missed = 0;
    for(let i = 0; i < hearts.length; i++) {
        hearts[i].style.display = '';
    }
}

// Phrases array
const phrases = [
    'Fit as a Fiddle',
    'In a Pickle',
    'Down And Out',
    'Wild Goose Chase',
    'A Piece of Cake'
]; 

function getRandomPhrase(phrases) {
    let phraseNum = Math.floor(Math.random() * phrases.length);
    let phrase = phrases[phraseNum].toLowerCase();
    return phrase.split('');
}

function addPhraseToDisplay(phrase) {
    const phraseContainer = document.querySelector('#phrase ul');
    phraseContainer.innerHTML = '';
    for(let i = 0; i < phrase.length; i++){
        const li = document.createElement('li');
        li.textContent = phrase[i];
        if(phrase[i] !== ' '){
            li.className = 'letter';
        } else {
            li.style.padding = '0 10px';
        }
        phraseContainer.appendChild(li);
    }
}

function checkLetter(button) {
    const letters = document.querySelectorAll('.letter');
    let found = false;
    let letter;
    for(let i = 0; i < letters.length; i++){
        if (letters[i].textContent === button){
            letters[i].className = letters[i].className + ' ' + 'show';
            letter = letters[i];
        } 
    }
    if (letter) {
        return letter.textContent;
    } else {
        return null;
    }
}

let keyHistory = [];
function buttonDisabled(key) {
    if(keyHistory.indexOf(key) === -1) {
        keyHistory.push(key);
        return true;
    } else {
        return false;
    }
}

function events() {
    
}

qwerty.addEventListener('click', (e) => {
    const button = e.target;
    const key = button.textContent;

    let isUsed = buttonDisabled(key);

    if(button.tagName === 'BUTTON' && isUsed) {

        let letterFound = checkLetter(button.textContent);
        if(letterFound == null) {
            hearts[missed].style.display = 'none';
            missed += 1;
        }
        for(let i = 0; i < keys.length; i++){
            if(keys[i].textContent === button.textContent){
                if(letterFound == null){
                    keys[i].className = 'chosenWrong';
                } else if(letterFound) {
                    keys[i].className = 'chosenCorrect';
                }
            }
        }
        const letters = document.querySelectorAll('.letter');
        const shown = document.querySelectorAll('.show');
        const reset = document.querySelector('.btn__reset');

        if(letters.length === shown.length) {
            overlay.style.display = '';
            overlay.className = 'win';
            heading.textContent = 'YOU WIN!!!';
            reset.textContent = 'Play Again';
        } else if(missed >= 5){
            overlay.style.display = '';
            overlay.className = 'lose';
            heading.textContent = 'YOU LOSE!!!';
            reset.textContent = 'Play Again';
        }
    }
});

document.addEventListener('keypress', (e) => {
    
    let keyPressed = e.key.toLowerCase();
    let isUsed = buttonDisabled(keyPressed);

    if (isUsed) {
        let letterFound = checkLetter(keyPressed);
        if(letterFound == null) {
            hearts[missed].style.display = 'none';
            missed += 1;
        }
        for(let i = 0; i < keys.length; i++){
            if(keyPressed === keys[i].textContent){
                if(letterFound == null){
                    keys[i].className = 'chosenWrong';
                } else if(letterFound) {
                    keys[i].className = 'chosenCorrect';
                }
            }
        }
        const letters = document.querySelectorAll('.letter');
        const shown = document.querySelectorAll('.show');
        const reset = document.querySelector('.btn__reset');

        if(letters.length === shown.length && letters.length !== 0) {
            overlay.style.display = '';
            overlay.className = 'win';
            heading.textContent = 'YOU WIN!!!';
            reset.textContent = 'Play Again';
        } else if(missed >= 5 && letters.length !== 0){
            overlay.style.display = '';
            overlay.className = 'lose';
            heading.textContent = 'YOU LOSE!!!';
            reset.textContent = 'Play Again';
        }
    }   
});