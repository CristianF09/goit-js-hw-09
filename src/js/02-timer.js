import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', () => {
  const datetimePicker = document.getElementById('datetime-picker');
  const startBtn = document.querySelector('button[data-start]');
  const daysElem = document.querySelector('[data-days]');
  const hoursElem = document.querySelector('[data-hours]');
  const minutesElem = document.querySelector('[data-minutes]');
  const secondsElem = document.querySelector('[data-seconds]');

  let countdownInterval;

  startBtn.disabled = true;

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];

      if (selectedDate <= new Date()) {
        Notiflix.Notify.warning('Please choose a date in the future');
        startBtn.disabled = true;
      } else {
        startBtn.disabled = false;
      }
    },
  };

  flatpickr(datetimePicker, options);

  function startCountdown(endDate) {
    function updateCountdown() {
      const currentDate = new Date().getTime();
      const difference = endDate - currentDate;

      if (difference <= 0) {
        clearInterval(countdownInterval);
        Notiflix.Notify.success('Countdown finished!');
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(difference);

      daysElem.textContent = addLeadingZero(days);
      hoursElem.textContent = addLeadingZero(hours);
      minutesElem.textContent = addLeadingZero(minutes);
      secondsElem.textContent = addLeadingZero(seconds);
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  startBtn.addEventListener('click', () => {
    const selectedDate = new Date(datetimePicker.value);

    startBtn.disabled = true;

    startCountdown(selectedDate);
  });
});