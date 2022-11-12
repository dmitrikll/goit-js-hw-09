const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
};
let intervalID = null;

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', startChangeColor);
refs.stopBtn.addEventListener('click', stopChangeColor);

function ChangeColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
};

function startChangeColor() {
    intervalID = setInterval(ChangeColor, 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
};

function stopChangeColor() {
    clearInterval(intervalID);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};