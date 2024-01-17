let timer;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const flagBtn = document.getElementById("flagBtn");
const flagsList = document.getElementById("flagsList");

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        startBtn.style.display = "none";
        resetBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
        flagBtn.style.display = "inline-block";
    }
}

function pause() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        pauseBtn.style.display = "none";
        flagBtn.style.display = "none";
        resetBtn.style.display = "inline-block";
        startBtn.style.display = "inline-block";
    }
}

function reset() {
    isRunning = false;
    elapsedTime = 0;
    clearInterval(timer);
    display.textContent = "00:00:00";
    clearFlags();
    pauseBtn.style.display = "none";
    resetBtn.style.display = "none";
}

function flag() {
    if (isRunning) {
        const flagTime = Date.now() - startTime;
        const flagTimeFormatted = formatTime(flagTime);
        const flagItem = document.createElement("li");
        flagItem.textContent = flagTimeFormatted;
        flagsList.appendChild(flagItem);
    }
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0") +
        "." +
        String(milliseconds).padStart(2, "0")
    );
}

function clearFlags() {
    while (flagsList.firstChild) {
        flagsList.removeChild(flagsList.firstChild);
    }
}