const timerContent = document.querySelector(".timer-content");
const timerDisplay = document.querySelector("#time");
const modeLabel = document.querySelector("#mode-label");
const toggleBtn = document.getElementById("toggle-btn");
const resetBtn = document.getElementById("reset-btn");
const iconPlay = document.getElementById("icon-play");
const iconPause = document.getElementById("icon-pause");
const circleTimer = document.querySelector(".circle-timer");
const body = document.querySelector(".mode-focus");
const messageDisplay = document.querySelector(".session-message");

const FOCUS_TIME = 1 * 60;
const BREAK_TIME = 5 * 60;
let isRunning = false;
let timeLeft = FOCUS_TIME;
let timerId = null;
let isBreak = false;
let totalTime = FOCUS_TIME;

const updateProgress = () => {
  const progress = (totalTime - timeLeft) / totalTime;
  const degrees = progress * 360;

  circleTimer.style.background = `
    conic-gradient(
      var(--current-color) ${degrees}deg,
      var(--track-color) ${degrees}deg
    )
  `;
};

const switchMode = () => {
  isBreak = !isBreak;
  if (isBreak) {
    totalTime = BREAK_TIME;
    timeLeft = BREAK_TIME;
    modeLabel.textContent = "Break";
    body.className = "mode-break";
    iconPause.style.display = "none";
    iconPlay.style.display = "block";
  } else {
    totalTime = FOCUS_TIME;
    timeLeft = FOCUS_TIME;
    modeLabel.textContent = "Focus";
    body.className = "mode-focus";
  }
};

const updateDisplay = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  updateProgress();
};

const startTimer = () => {
  if (timeLeft <= 0) return;
  if (timerId !== null) return;
  isRunning = true;
  iconPause.style.display = "block";
  iconPlay.style.display = "none";
  messageDisplay.textContent = "";
  timerId = setInterval(() => {
    timeLeft--;

    updateDisplay();
    if (timeLeft <= 0) {
      messageDisplay.textContent =
        "🎉 Focus session complete! Time for a break.";

      clearInterval(timerId);
      isRunning = false;
      timerId = null;
      //swtich to break
      switchMode();
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
