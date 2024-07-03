// Selectăm formularul din HTML
const form = document.querySelector('.form');

// Funcția care creează un promise cu un anumit index și întârziere
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3; // 70% șansă să fie rezolvat

    // Simulăm o întârziere cu setTimeout
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Funcția care va fi apelată când formularul este trimis
function handleSubmit(event) {
  event.preventDefault();

  // Obținem valorile din inputuri
  const firstDelay = parseInt(form.elements['delay'].value);
  const delayStep = parseInt(form.elements['step'].value);
  const amount = parseInt(form.elements['amount'].value);

  // Creăm array-ul de promisiuni
  const promises = [];

  for (let i = 0; i < amount; i++) {
    const currentDelay = firstDelay + i * delayStep;
    const promise = createPromise(i + 1, currentDelay);

    promises.push(promise);
  }

  // Iterăm prin fiecare promise și afișăm rezultatele
  promises.forEach((promise) => {
    promise
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  });
}

// Ascultă evenimentul de submit pe formular
form.addEventListener('submit', handleSubmit);