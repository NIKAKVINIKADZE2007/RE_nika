// let days = document.getElementById('days');
// let hours = document.getElementById('hours');
// let minuts = document.getElementById('minutes');
// let seconds = document.getElementById('seconds');
let seconds = 0;
let minutes = 0;
let hours = 0;
let days = 26;
const countdownFunction = setInterval(() => {
  seconds -= 1;
  if (seconds <= 0) {
    seconds = 59;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes = 59;
    hours -= 1;
  }
  if (hours < 0) {
    hours = 23;
    days -= 1;
  }
  if (days == 0) {
    minutes = 0;
    seconds = 0;
    hours = 0;
    days = 0;
    return 0;
  }
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}, 1000);
