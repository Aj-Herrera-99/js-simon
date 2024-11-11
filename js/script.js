"use strict";

/**
 Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente 
deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e 
quali dei numeri da indovinare sono stati individuati.
 */

// DOM elements selection
const timer = document.getElementById("countdown");
const numbersList = document.getElementById("numbers-list");
const form = document.getElementById("answers-form");
const memorized = form.querySelectorAll("input");
const confirmBtn = document.querySelector(".btn");
const resetBtn = document.querySelector(".btn.reset");
const message = document.getElementById("message");
// other variables
const count = 5;
const arrNumbers = [];
let template = "";
let initialTimer = 3;

// creation of li containing random numbers to memorized
for (let i = 0; i < count; i++) {
    let rnd = getRndInteger(1, 50);
    let count = 0;
    while (arrNumbers.includes(rnd) && count < 10000) {
        rnd = getRndInteger(1, 50);
        count++;
    }
    arrNumbers.push(rnd);
    template += `<li>${rnd}</li>`;
}
numbersList.innerHTML = template;

// countdown
timer.innerHTML = initialTimer;
const clock = setInterval(() => {
    timer.innerHTML = --initialTimer;
    if (initialTimer <= 0) {
        clearInterval(clock);
        timer.innerHTML = "Time Is Up!";
        numbersList.classList.toggle("d-none");
        form.classList.toggle("d-none");
    }
}, 1000);

//* event listeners
for (const input of memorized) {
    input.addEventListener("change", () => handleDuplicates(input)); //? check inputs duplicates
}
form.addEventListener("submit", handleMemorized);
form.addEventListener("reset", () => {
    location.reload();
});

//* event handlers
function handleDuplicates(currentInput) {
    for (const otherInputs of memorized) {
        if (currentInput !== otherInputs) {
            if (
                currentInput.value !== "" &&
                currentInput.value === otherInputs.value
            ) {
                alert("You cannot type same numbers!!");
                currentInput.value = "";
            }
        }
    }
}

function handleMemorized(e) {
    e.preventDefault();
    let randomNumbers = "";
    let output = "";
    let count = 0;
    // insert in output only memorized numbers and increment a counter
    for (let n of memorized) {
        if (arrNumbers.includes(parseInt(n.value))) {
            output += n.value + " ";
            count++;
        }
    }
    // output message
    message.innerHTML = ` `;
    for (let value of arrNumbers) {
        randomNumbers += value + " ";
    }
    message.innerHTML += `I numeri da memorizzare erano: ${randomNumbers}<br>
    Hai memorizzato i numeri: ${output}<br>
    Totale memorizzati: ${count}`;
    confirmBtn.classList.toggle("d-none");
    resetBtn.classList.toggle("d-none");
}
