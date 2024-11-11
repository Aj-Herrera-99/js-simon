"use strict";

/**
 Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente 
deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e 
quali dei numeri da indovinare sono stati individuati.
 */

// DOM elements selection
const timer = document.getElementById("instructions");
const numbersList = document.getElementById("numbers-list");
const form = document.getElementById("answers-form");
const memorized = form.querySelectorAll("input");
const confirmBtn = document.querySelector(".btn");
const message = document.getElementById("message");
// other variables
const count = 5;
// creation of li containing random numbers to memorized
let template = "";
for(let i=0; i<count; i++){
    const rnd = getRndInteger(1, 50);
    template += `<li>${rnd}</li>`
}
numbersList.innerHTML = template;