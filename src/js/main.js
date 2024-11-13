document.addEventListener('DOMContentLoaded', () => {
  // Alert
  function message(x) {
    alert(x);
  }
  // Variables
  const result = document.getElementById('result');
  const apuesta = document.getElementById('bet-btn');
  const ruleta = document.getElementById('ruleta');
  let isSpinning = false;
  let betAmount = 0;
  let betTrue = false;
  const par = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
  const impar = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];

  // Crear cookies
  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  }
  // Obtener cookies
  function getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  // Asignar fichas al cargar
  window.onload = function assignChips() {
    const chips = getCookie('myChips') || 0;
    document.getElementById('chips').textContent = chips;
  };

  // Borrar apuestas
  function clearBets() {
    document.getElementById('bet').value = '';
    document.getElementById('bet-number').value = '';
  }
  // Añadir fichas
  window.addChips = function addChips() {
    const inputChips = document.getElementById('add-chips').value;
    if (inputChips < 0) {
      message('ERROR: No puedes añadir fichas negativas');
      return;
    }
    if (inputChips === '') {
      message('ERROR: Debes añadir fichas');
      return;
    }
    let chips = getCookie('myChips') || 0;
    chips = parseInt(chips, 10) + parseInt(inputChips, 10);
    setCookie('myChips', chips, 7);
    document.getElementById('chips').textContent = chips;
    document.getElementById('add-chips').value = '';
  };
  // Apostar
  function bet() {
    betAmount = 0;
    const inputBet = document.getElementById('bet').value;
    const inputNumber = document.getElementById('bet-number').value;
    if (inputBet < 0) {
      message('ERROR: No puedes apostar fichas negativas');
      return false;
    }
    if (inputBet === '') {
      message('ERROR: Debes apostar fichas');
      return false;
    }
    if (inputNumber < 0 || inputNumber > 36) {
      message('ERROR: Debes apostar un número entre 0 y 36');
      return false;
    }
    const chips = parseInt(getCookie('myChips'), 10);
    if (parseInt(inputBet, 10) > chips) {
      message('ERROR: No tienes suficientes fichas');
      return false;
    }
    betAmount = parseInt(inputBet, 10);
    document.getElementById('bet-amount').textContent = betAmount;
    const remainingChips = chips - parseInt(inputBet, 10);
    setCookie('myChips', remainingChips, 7);
    document.getElementById('chips').textContent = remainingChips;
    return true;
  }

  // Check win

  function checkWin(winningNumber) {
    let chips = getCookie('myChips') || 0;
    const betType = document.getElementById('bet-type').value;
    if (betType === 'parell') {
      if (par.includes(winningNumber) && betAmount) {
        message('VICTORIA ');
        chips = parseInt(chips, 10) + betAmount * 1.5;
        setCookie('myChips', chips, 7);
        document.getElementById('chips').textContent = chips;
      } else {
        message('HAS PERDUT');
      }
    } else if (betType === 'imparell') {
      if (impar.includes(winningNumber) && betAmount) {
        message('VICTORIA');
        chips = parseInt(chips, 10) + betAmount * 1.5;
        setCookie('myChips', chips, 7);
        document.getElementById('chips').textContent = chips;
      } else {
        message('HAS PERDUT');
      }
    }
  }

  function checkWinNumber(winningNumber) {
    let chips = getCookie('myChips') || 0;
    const num = document.getElementById('bet-number').value;
    let localBetAmount = document.getElementById('bet-amount').textContent;
    if (num === winningNumber && localBetAmount) {
      localBetAmount *= 3;
      chips = parseInt(chips, 10) + localBetAmount;
      setCookie('myChips', chips, 7);
      document.getElementById('chips').textContent = chips;
      message('VICTORIA');
    } else {
      message('HAS PERDUT');
    }
  }

  // Spin
  apuesta.addEventListener('click', () => {
    if (isSpinning) return;
    betTrue = bet();
    if (betTrue === false) return;
    isSpinning = true;
    const testMode = document.getElementById('test-mode').value;
    const betNumber = document.getElementById('bet-number').value;
    const betType = document.getElementById('bet-type').value;

    ruleta.style.transition = 'none';
    ruleta.style.transform = 'rotate(0deg)';

    const randomDegrees = Math.floor(Math.random() * 360) + 360 * 5;
    let randomNumber = 0;

    if (ruleta.offsetWidth) {
      // Está vacio para hacer el reflow
    }

    ruleta.style.transition = 'transform 3s ease-out';
    ruleta.style.transform = `rotate(${randomDegrees}deg)`;

    if (testMode === 'test-win') {
      if (betNumber) {
        randomNumber = betNumber;
      } else if (betType === 'parell') {
        randomNumber = par[Math.floor(Math.random() * par.length)];
      } else if (betType === 'imparell') {
        randomNumber = impar[Math.floor(Math.random() * impar.length)];
      }
    } else if (testMode === 'test-loose') {
      randomNumber = betNumber === 0 ? 1 : (betNumber + 1) % 37;
    } else if (testMode === 'no-test') {
      randomNumber = Math.floor(Math.random() * 37);
    }

    setTimeout(() => {
      isSpinning = false;
      result.textContent = randomNumber;
      if (betNumber) {
        checkWinNumber(randomNumber);
      } else {
        checkWin(randomNumber);
      }
      clearBets();
    }, 2000);
  });
});
