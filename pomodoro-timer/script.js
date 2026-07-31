const timerContent = document.querySelector(".timer-content");
const timerDisplay = document.querySelector("#time");
const modeLabel = document.querySelector("#mode-label");
const toggleBtn = document.getElementById("toggle-btn");
const resetBtn = document.getElementById("reset-btn");
const iconPlay = document.getElementById("icon-play");
const iconPause = document.getElementById("icon-pause");
const circleTimer = document.querySelector(".circle-timer");

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;
let isRunning = false;
let timeLeft = FOCUS_TIME;
let timerId = null;

const updateDisplay = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const startTimer = () => {
  if (timeLeft <= 0) return;
  if (timerId !== null) return;
  isRunning = true;
  iconPause.style.display = "block";
  iconPlay.style.display = "none";
  timerId = setInterval(() => {
    timeLeft--;

    updateDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      isRunning = false;
      timerId = null;
      //swtich to break
    }
  }, 1000);
};

const pauseTimer = () => {
  clearInterval(timerId);
  isRunning = false;
  timerId = null;
  iconPause.style.display = "none";
  iconPlay.style.display = "block";
};

const resetTimer = () => {
  pauseTimer();
  timeLeft = FOCUS_TIME;
  updateDisplay();
};

toggleBtn.addEventListener("click", () => {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener("click", resetTimer);
