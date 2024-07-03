function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

export function startColorChange() {
  const body = document.body;
  return setInterval(() => {
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
  }, 1000);
}

export function stopColorChange(intervalId) {
  clearInterval(intervalId);
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');
  let intervalId = null;

  startButton.addEventListener('click', () => {
    intervalId = startColorChange();
    startButton.disabled = true;
  });

  stopButton.addEventListener('click', () => {
    stopColorChange(intervalId);
    startButton.disabled = false;
  });
});
