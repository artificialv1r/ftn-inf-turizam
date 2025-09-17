"use strict";

class Tura {
  constructor(naziv, opis, duzina, tagovi) {
    this.naziv = naziv;
    this.opis = opis;
    this.duzina = duzina;
    this.tagovi = tagovi;
  }
}

let ture = [];

function createTourRows() {
  let table = document.querySelector("#tours-body");

  for (let i = 0; i < ture.length; i++) {
    let tr = document.createElement("tr");
    let naziv = document.createElement("td");
    let duzina = document.createElement("td");

    naziv.textContent = ture[i].naziv;
    duzina.textContent = ture[i].duzina;

    tr.appendChild(naziv);
    tr.appendChild(duzina);
    table.appendChild(tr);
  }
}

function initializeTours() {
  ture = [
    new Tura("Meksiko", "Sredisnja Amerika", 12000, [
      "Srednja Amerika",
      "Mexico City",
      "Meksicka hrana",
      "gradska",
    ]),
    new Tura("Filipini", "Azija", 8400, [
      "Azija",
      "Manila",
      "Azijska hrana",
      "priroda",
    ]),
    new Tura("Italija", "Evropa", 1200, [
      "Juzna Evropa",
      "priroda",
      "istorijska",
      "gradska",
      "Mediteran",
      "Italijanska hrana",
    ]),
  ];

  createTourRows();
}

document.addEventListener("DOMContentLoaded", initializeTours);
