import notiflix from 'notiflix'; // Import notiflix library

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

  const promises = [];

  for (let i = 0; i < amount; i++) {
    const currentDelay = firstDelay + i * delayStep;
    const promise = createPromise(i + 1, currentDelay);

    promise
      .then(({ position, delay }) => {
        notiflix.Notify.Success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        notiflix.Notify.Failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    promises.push(promise);
  }
}

form.addEventListener('submit', handleSubmit);