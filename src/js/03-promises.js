import Notiflix from 'notiflix'; // Import notiflix library

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();

  const firstDelay = parseInt(form.elements['delay'].value);
  const delayStep = parseInt(form.elements['step'].value);
  const amount = parseInt(form.elements['amount'].value);

  for (let i = 0; i < amount; i++) {
    const currentDelay = firstDelay + i * delayStep;
    const promise = createPromise(i + 1, currentDelay);

    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

form.addEventListener('submit', handleSubmit);