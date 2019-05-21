const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const fontSize = 25;
const lettersArr = [];

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

window.addEventListener('resize', () => {
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
});


const getRandomX = elementWidth => Math.random() * elementWidth;

const getRandomValue = (minValue, maxValue) => minValue + Math.random() * (maxValue - minValue);

const getRandomColor = () => `hsl(${getRandomValue(0, 360)}, 100%, 70%)`;

const draw = letter => {
    ctx.fillStyle = letter.color;
    ctx.font = `${letter.fontSize}px Helvetica`;
    ctx.fillText(letter.value, letter.x, letter.y);
};

const drawLetters = letters => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    letters.forEach(letter => {
        draw(letter);
        letter.y += letter.velocity;
        if(letter.y > (canvas.height + letter.fontSize))
            {
                letter.x = getRandomX(canvas.width);
                letter.y = 0;
                letter.velocity = getRandomValue(1, letter.fontSize / 4);
                letter.color = getRandomColor();
            }
    });
};

setInterval(() => {
    drawLetters(lettersArr);
}, 10);