const wordsContainer = document.querySelector('.words-container');
const scoreContainer = document.querySelector('.score');
const scorePointsContainer = document.querySelector('.score > .points');
const words = [
    'kopytko',
    'Ciastek',
    'telewizor',
    'kapusta',
    'kebab',
    'krasnal',
    'kebabownik',
    'krzeak',
    'malpa',
    'mapa'
];
let usedWords = [];
let score = 0;

Array.prototype.without = function(arrayToCompare) {
    return this.filter(el => !arrayToCompare.includes((el)));
};

HTMLDivElement.prototype.setIncorrect = function() {
    if(this.classList.contains('correct'))
        this.classList.remove('correct');
    this.classList.add('incorrect');
};

HTMLDivElement.prototype.setCorrect = function() {
    if(this.classList.contains('incorrect'))
        this.classList.remove('incorrect');
    this.classList.add('correct');
};

Document.prototype.createLetter = function(letter) {
    const letterContainer = this.createElement('div');
    letterContainer.classList.add('letter');
    letterContainer.innerHTML = letter;
    return letterContainer;
};

HTMLDivElement.prototype.setNewWord = function(word) {
    this.innerHTML = '';
    word.split('').forEach(letter => this.appendChild(document.createLetter(letter)));
};

HTMLDivElement.prototype.update = function() {
    this.innerHTML = score;
};

const getRandomNumber = maxNumber => Math.floor(Math.random() * maxNumber);

const getRandomWord = () => words[getRandomNumber(words.length)];

const getProperRandomWord = () => {
    const wordArr = words.without(usedWords);
    return wordArr[getRandomNumber(wordArr.length)];
};

const getNextWord = () => {
    const currentWord = getProperRandomWord();
    console.log(`Obecnym słowem jest: ${currentWord}`);
    usedWords.push(currentWord);
    if(usedWords.length == words.length)
        usedWords = new Array();
    return currentWord;
};

const setNextWord = () => {
    wordsContainer.setNewWord(getNextWord());
};

const getCurrentLetters = () => [...document.querySelectorAll('.letter:not(.correct)')];

const validateUserInput = userInput => {
    if(userInput.length > 1 || userInput.charCodeAt(0) < 65 || (userInput.charCodeAt(0) > 90 && userInput.charCodeAt(0) < 96) || userInput.charCodeAt(0) > 123)
        return;
    const currentLetters = getCurrentLetters();
    if(currentLetters[0].textContent.toLowerCase() == userInput)
    {
        currentLetters[0].setCorrect();
        score++;
        if(currentLetters.length == 1)
            setNextWord();
    }
    else
    {
        currentLetters[0].setIncorrect();
        score = 0;
    }
    lettersArr.push(new Letter(userInput, getRandomX(canvas.width), fontSize * .75, getRandomValue(1, fontSize / 3),  getRandomValue(fontSize * .75, fontSize)));
    scorePointsContainer.update();
    console.log(userInput);
    console.log(getCurrentLetters());
};


window.addEventListener('keyup', e => validateUserInput(e.key));