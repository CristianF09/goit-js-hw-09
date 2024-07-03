// Importăm flatpickr și stilul asociat
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Funcția pentru calcularea timpului rămas
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}


const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};



flatpickr(datetimePicker, options);

// Variabila pentru intervalul de numărătoare inversă
let countdownInterval;

// Funcție pentru a porni cronometrul
function startCountdown(endTime) {
  const endDate = new Date(endTime).getTime();

  // Actualizăm cronometrul la fiecare secundă
  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeDifference = endDate - now;

    if (timeDifference < 0) {
      clearInterval(countdownInterval);
      timerDays.textContent = '00';
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    // Actualizăm interfața cu timpul rămas
    timerDays.textContent = addLeadingZero(days);
    timerHours.textContent = addLeadingZero(hours);
    timerMinutes.textContent = addLeadingZero(minutes);
    timerSeconds.textContent = addLeadingZero(seconds);
  }, 1000);
}

// Adăugăm un event listener pentru butonul de start
startButton.addEventListener('click', () => {
  const selectedDateTime = datetimePicker.value;

  // Oprim numărătoarea inversă dacă rulează deja
  clearInterval(countdownInterval);

  // Pornim numărătoarea inversă cu data selectată
  startCountdown(selectedDateTime);
});