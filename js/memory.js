let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/


// arr comparare immagini 
let arrayComparison = [];
// -- timer --
let iconsFind = document.getElementsByClassName('find')
let time = document.querySelector('.timer')
let interval;
let secondi = 0;
let minuti = 0;
printTime ()

//  1. interval -------------------------- ok
//  2. una agganciata alla classe find --- ok
//  3. una agganciata al'id modal -------- ok
//  4. una agganciata alla classe timer -- ok

document.body.onload = startGame()

//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }

    return a;
}

// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, 
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto

function startGame() {
    resetTime()

    var arrayShuffle = shuffle(arrayAnimali)
    console.log(arrayShuffle);

    let container = document.querySelector('#griglia')
    //svuoto
    container.innerHTML = ''

    //creo div per ogni elemento array
    arrayShuffle.forEach((animali, i) => {
        let div_card = document.createElement('div');
        let div_icon = document.createElement('div');
        div_icon.innerHTML = animali;

        div_icon.className = 'icon'

        div_icon.addEventListener('click', displayIcon)
        container.appendChild(div_card)
        div_card.appendChild(div_icon)
    })

    setTime()
    starTime()

   

}


function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];

    /*
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    è uguale a 
    var icons = document.getElementsByClassName("icon");
    //var icons = [...icon];
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */

    //mette/toglie la classe show
    this.classList.toggle("show");
    /* risolve il bug dove in caso di doppio clik sulla stessa carta dava un falso accoppiamento
    corretto e rendeva la carta non più cliccabile */
    this.classList.toggle('disabled') 

    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function (item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function () {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function (item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                        console.log(iconsFind);
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
    win()
}

//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
let modal = document.querySelector('#modal')

function win() {
    if (iconsFind.length == 24) {
        modal.classList.add("active") //aggiungo la classe 
        document.querySelector('#tempoTrascorso').innerHTML = time.innerHTML
        clearInterval(interval);
    }
}

// una funzione che rimuove la classe active e chiama la funzione startGame()
// una funzione che nasconde la modale alla fine e riavvia il gioco
function playAgain() {
    modal.classList.remove("active")
    startGame()
}

// una funzione che calcola il tempo e aggiorna il contenitore sotto
function setTime() {
    secondi++;
    if (secondi >= 60) {
        secondi = 0;
        minuti++;
    }
    printTime ()
    
}

function printTime(){
    time.innerHTML = 'Tempo: ' + minuti + ' min ' + secondi + ' sec'
}

function starTime(){
    interval = setInterval(setTime,1000) 
}

function resetTime(){
    clearInterval(interval)
    secondi = 0,
    minuti = 0,
    printTime();
}