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
  table.innerHTML = "";

  for (let i = 0; i < ture.length; i++) {
    let tr = document.createElement("tr");
    let naziv = document.createElement("td");
    let duzina = document.createElement("td");

    naziv.textContent = ture[i].naziv;
    duzina.textContent = ture[i].duzina;

    tr.appendChild(naziv);
    tr.appendChild(duzina);
    table.appendChild(tr);
    tr.addEventListener("click", function () {
      displayTourDetails(ture[i]);
      document.querySelector(".tour-details").style.border = "1px solid black";
    });
  }
}

function initializeTours() {
  //TEST PODACI
  //   ture = [
  //     new Tura(
  //       "Meksiko",
  //       "Mexico offers a rich tapestry of culture, stunning landscapes, delicious cuisine, and warm hospitality, making it a must-visit destination for travelers.",
  //       10500,
  //       ["Gradska", "Meksicka hrana"]
  //     ),
  //     new Tura(
  //       "Filipini",
  //       "The Philippines offers stunning natural beauty, rich culture, and warm hospitality, making it a must-visit destination for travelers.",
  //       10000,
  //       ["Priroda", "Azijska hrana"]
  //     ),
  //     new Tura(
  //       "Italija",
  //       "Italy is a captivating destination known for its rich history, stunning landscapes, delicious cuisine, and vibrant culture, making it a must-visit country for travelers",
  //       1350,
  //       ["Priroda", "Istorijska", "Gradska", "Italijanska hrana", "Mediteran"]
  //     ),
  //   ];

  ture = JSON.parse(localStorage.getItem("ture"));
  if (!ture) {
    ture = [];
  }

  createTourRows();
  handleFormSubmission();
  addNewInput();
}

function displayTourDetails(tura) {
  let p = document.createElement("p");
  let listaTagova = "";
  for (let tag of tura.tagovi) {
    listaTagova += tag + ", ";
  }
  if (listaTagova.length > 0) {
    listaTagova = listaTagova.slice(0, -2) + ".";
  }

  p.innerHTML =
    "Naziv: " +
    tura.naziv +
    "<br> Opis: " +
    tura.opis +
    "<br> Duzina [km]: " +
    tura.duzina +
    "<br> Tagovi: " +
    listaTagova;

  let detalji = document.querySelector(".tour-details");
  if (detalji.firstChild) {
    detalji.firstChild.remove();
  }
  detalji.appendChild(p);
}

function handleFormSubmission() {
  let submitBtn = document.querySelector("#submitBtn");
  submitBtn.addEventListener("click", function () {
    const forma = document.querySelector("#dodaj-turu");
    const listaTagova = document.querySelectorAll("input[type = checkbox]");
    const listaDodatnihTagova = document.querySelectorAll(".dodatni-tag");
    const formData = new FormData(forma);

    const naziv = formData.get("naziv");
    const opis = formData.get("opis");
    const duzina = formData.get("duzina");
    const custom = formData.get("custom");

    const tagovi = [];

    for (let cb of listaTagova) {
      if (cb.checked) {
        tagovi.push(cb.value);
      }
    }

    if (custom) {
      tagovi.push(custom);
    }

    for (let dodatni of listaDodatnihTagova) {
      if (dodatni.value) {
        tagovi.push(dodatni.value);
      }
    }

    const novaTura = new Tura(naziv, opis, duzina, tagovi);
    ture.push(novaTura);
    localStorage.setItem("ture", JSON.stringify(ture));

    createTourRows();
  });
}

function addNewInput() {
  let newInputBtn = document.querySelector("#newInputBtn");
  newInputBtn.addEventListener("click", function () {
    const dodatniTagovi = document.querySelector("#dodatni-tagovi");
    const div = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");

    label.textContent = "Dodatni tag: ";
    input.type = "text";
    input.classList.add("dodatni-tag");
    input.name = "dodatni-tag";
    div.appendChild(label);
    div.appendChild(input);

    dodatniTagovi.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", initializeTours);
