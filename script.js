'use strict';

const btn = document.getElementById('test');
const auswahl = document.querySelectorAll('.auswahl');
const info = {
    warenkorb: []
};
/*
{
    auswahl : '',
    warenkorb: [[produktnamen, produktpreis],[produktnamen, produktpreis],[produktnamen, produktpreis]]
}
*/
var aktivieren = document.getElementById('aktivieren');
var deaktivieren = document.getElementById('deaktivieren');
var select1 = document.getElementById('select1');
let alleProduktBtns = document.querySelectorAll('.produkte');
const bezahlenBtn = document.getElementById('bezahlen');
const toggleAdBtn = document.querySelector('.ad');

toggleAdBtn.addEventListener('click', function () {
    aktivieren.classList.toggle('unsichtbar');
    deaktivieren.classList.toggle('unsichtbar');
    select1.classList.toggle('unsichtbar');
})

alleProduktBtns.forEach(function (btn, index) {
    btn.dataset.produkt = index;
    const option = document.createElement('option');
    option.value = index;
    option.textContent = btn.children[0].textContent;
    select1.appendChild(option);

    btn.addEventListener('click', function () {
        const produktArray = [];
        let preis = this.children[1].textContent.split(' ');
        produktArray.push(this.children[0].textContent.trim(), +preis[preis.length - 1].slice(0, preis[preis.length - 1].length - 1).replaceAll(',', '.'))
        info.warenkorb.push(produktArray);
        console.log(info);
    })
});

bezahlenBtn.addEventListener('click', function () {
    let kontrolle = null;
    if (info.auswahl === 'zum hier Essen') {
        let check = false;
        while (!check) {
            kontrolle = prompt('Code', '');
            if (kontrolle.length === 3 && !isNaN(+kontrolle) && +kontrolle > 0) {
                check = true;
            }
        }
    }
    let preis = 0;
    info.warenkorb.forEach(function (produkt) {
        preis += produkt[1]
    })
    renderWarenkorb(preis, kontrolle);
})

function renderWarenkorb(preis, code) {
    const ausgabe = document.getElementById('produktListe');
    ausgabe.innerHTML = '';
    // Auswahltext Span
    let span = document.createElement('span');
    span.textContent = info.auswahl;
    span.classList.add('bold');
    ausgabe.appendChild(span);
    // ---------

    if (code !== null) {
        span = document.createElement('span');
        span.textContent = ` ${code}`;
        span.classList.add('kursiv');
        ausgabe.appendChild(span);
    }

    const ul = document.createElement('ul');
    ul.classList.add('warenkorb-liste');
    ausgabe.appendChild(ul);

    info.warenkorb.forEach(function (produkt) {
        const li = document.createElement('li');
        li.textContent = `${produkt[0]} ${produkt[1]}€`;
        ul.appendChild(li);
    })
    span = document.createElement('span');
    span.textContent = preis + '€';
    ausgabe.appendChild(span)
}


btn.addEventListener('click', function () {
    const userInput = prompt('Bitte Passwort eingeben', '');
    console.log(userInput);
    if (userInput === '57') {
        window.open(this.dataset.url, '_self');
    }
})

auswahl.forEach(function (auswahl1) {
    auswahl1.addEventListener('click', function () {
        info.auswahl = this.textContent
        console.log(info)
        document.querySelector('.auswahlBtn').classList.remove('unsichtbar');
        document.querySelector('.content').classList.remove('unsichtbar');

        auswahl.forEach(function (auswahl1) {
            auswahl1.classList.add('unsichtbar')
        })
    })
})


function manager() {
    const id = this.id;
    if (select1.value === '*') {
        document.querySelectorAll('.produkte').forEach(function (button) {
            if (id === 'aktivieren') button.classList.remove('ausverkauft');
            else button.classList.add('ausverkauft');
        })
    } else {
        if (id === 'aktivieren') document.querySelector(`[data-produkt="${select1.value}"]`).classList.remove('ausverkauft');
        else document.querySelector(`[data-produkt="${select1.value}"]`).classList.add('ausverkauft')
    }
}

aktivieren.onclick = manager;


deaktivieren.onclick = manager;

