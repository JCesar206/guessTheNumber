let secretNumber = Math.floor(Math.random() * 100) + 1; 
let attempts = 0; 
let timer = 0; 
let timerInterval = null; 

function startTimer() {
  timer = 0; 
  document.getElementById("timer").textContent = "Tiempo: 0 seg."; 
    timerInterval = setInterval(function() {
    timer++;
    document.getElementById("timer").textContent = "Tiempo: " + timer + " seg.";
  }, 1000);
}

function checkGuess() {
  const guess = parseInt(document.getElementById("guessInput").value);
  const message = document.getElementById("message");
  const attemptsDisplay = document.getElementById("attempts");

  if (isNaN(guess) || guess < 1 || guess > 100) {
    message.textContent = "Por favor, ingresa un número entre 1 y 100.";
    message.style.color = "orange";
    return;
  }
  attempts++;

  if (guess === secretNumber) {
    clearInterval(timerInterval);
    message.textContent = `🎉 ¡Correcto! El número secreto era ${secretNumber}. Adivinaste en ${attempts} intentos y en ${timer} segundos.`;
    message.style.color = "green";
    attemptsDisplay.textContent = "";
    saveRecord({ attempts: attempts, time: timer, date: new Date().toLocaleString() });
    updateRecordsTable();
    document.getElementById("guessInput").disabled = true;
  } else if (guess < secretNumber) {
    message.textContent = "📉 Muy bajo. Intenta con un número mayor.";
    message.style.color = "red";
    attemptsDisplay.textContent = `Intentos: ${attempts}`;
  } else {
    message.textContent = "📈 Muy alto. Intenta con un número menor.";
    message.style.color = "red";
    attemptsDisplay.textContent = `Intentos: ${attempts}`;
  }
  document.getElementById("guessInput").value = "";
}

function restartGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  document.getElementById("message").textContent = "";
  document.getElementById("attempts").textContent = "";
  document.getElementById("guessInput").disabled = false;
  document.getElementById("guessInput").value = "";
  clearInterval(timerInterval);
  startTimer();
}

function saveRecord(record) {
  let records = JSON.parse(localStorage.getItem("records")) || [];
  records.unshift(record);
  records = records.slice(0, 5);
  localStorage.setItem("records", JSON.stringify(records));
}

function updateRecordsTable() {
  const tbody = document.getElementById("recordsBody");
  const records = JSON.parse(localStorage.getItem("records")) || [];
  tbody.innerHTML = "";
  records.forEach(record => {
    const tr = document.createElement("tr");
    const tdAttempts = document.createElement("td");
    tdAttempts.textContent = record.attempts;
    const tdTime = document.createElement("td");
    tdTime.textContent = record.time;
    const tdDate = document.createElement("td");
    tdDate.textContent = record.date;
    tr.appendChild(tdAttempts);
    tr.appendChild(tdTime);
    tr.appendChild(tdDate);
    tbody.appendChild(tr);
  });
}

window.onload = function() {
  startTimer();
  updateRecordsTable();
};