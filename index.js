let startTime = 0;
let currentTime = 0;
let lapTimes = [];
let intervalId = null;
let isRunning = false;

// Get the HTML elements
const timeElement = document.getElementById('time');
const hrElement = document.getElementById('hr');
const minElement = document.getElementById('min');
const secElement = document.getElementById('sec');
const countElement = document.getElementById('count');
const lapTimesElement = document.getElementById('lap-times');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

// Add event listeners to the buttons
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);

// Start the timer
function startTimer() {
  if (!isRunning) {
    startTime = new Date().getTime();
    intervalId = setInterval(updateTimer, 10);
    isRunning = true;
  }
}

// Stop the timer
function stopTimer() {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
  }
}

// Reset the timer
function resetTimer() {
  startTime = 0;
  currentTime = 0;
  lapTimes = [];
  updateTimerDisplay();
  lapTimesElement.innerHTML = '';
}

// Lap the timer
function lapTimer() {
  if (isRunning) {
    const lapTime = currentTime;
    lapTimes.push(lapTime);
    const lapTimeElement = document.createElement('li');
    lapTimeElement.textContent = formatTime(lapTime);
    lapTimesElement.appendChild(lapTimeElement);
  }
}

// Update the timer display
function updateTimerDisplay() {
  const hours = Math.floor(currentTime / 3600000);
  const minutes = Math.floor((currentTime % 3600000) / 60000);
  const seconds = Math.floor((currentTime % 60000) / 1000);
  const count = currentTime % 1000;
  hrElement.textContent = pad(hours);
  minElement.textContent = pad(minutes);
  secElement.textContent = pad(seconds);
  countElement.textContent = pad(count);
}

// Update the timer
function updateTimer() {
  currentTime = new Date().getTime() - startTime;
  updateTimerDisplay();
}

// Format a time in hours, minutes, seconds, and milliseconds
function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const count = time % 1000;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(count)}`;
}

// Pad a number with leading zeros
function pad(number) {
  return (number < 10 ? '0' : '') + number;
}