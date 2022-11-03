const state = {
    isRunning: false,
    symbolX1: "X",
    symbolO2: "O",
    board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    playersTurn: ""
}

// holt alle Zellen in eine NodeList (wie ein Array)
const cells = document.querySelectorAll(".cell");
console.log(cells);


function startGame() {
    // check ob spiel schon läuft
    // ändern des states gegebenenfalls
    // wenn reset dann neustarten aka feld leeren etc.
    // wenn spiel noch nicht läuft starte spiel

    // cells = [Element, Element, Element]
    // document.getElementById("buttonStart").textContent
    if (state.isRunning) { // reset
        state.isRunning = false
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerHTML = ""
            // i
            // cells[i] = <div class="cell" data-index="i"></div>
            // cells[i].dataset.index = "i"
            // ["X", 1, 2, 3, 4, 5, 6, 7, 8]
            // state.board[+cells[i].dataset.index] = i
            const index = +cells[i].dataset.index;

            state.board[index] = index
        }

    } else { // start
        state.isRunning = true
        state.playersTurn = document.getElementById("StartPlayer").value
        console.log(state.playersTurn)

    }
}

// for (initialisierung, bedinung, inkrementierung)
// iterieren durch jede einzelne Zelle um Event listener zu setzen
for (let i = 0; i < cells.length; i++) {
    // setzen des click event listener
    cells[i].addEventListener("click", clickOnCell);
}

/**
 * Funktion, welche aufgerufen wird wenn eine Zelle geklickt wird.
 * @param {MouseEvent} event Event Objekt. Hilfe zum coden
 */
function clickOnCell(event) {
    // holen der geklickten Zelle

    const clickedCell = event.target;
    // holen des data-index attributs und konvertierung zu einer Zahl
    const indexOfCell = clickedCell.dataset.index;
    if (!state.isRunning || clickedCell.innerHTML.length > 0) {
        return
    }

    // platzieren des symbols
    placeSymbol(clickedCell)


}
// JSDOC

/**
 * Funktion
 * @param {HTMLDivElement} cell
 */
function placeSymbol(cell) {
    cell.innerHTML = state.playersTurn

    // data attribute landen in dataset
    // + konvertiert string zu zahl
    state.board[+cell.dataset.index] = state.playersTurn

    const result = hasWon(state.playersTurn)
    if (result) {
        document.getElementById("winner").innerHTML = state.playersTurn
        state.isRunning = false
    }

    // Bedingung ? Wert : Wert
    state.playersTurn = state.playersTurn === state.symbolX1 ? state.symbolO2 : state.symbolX1



    console.log(state.board)
}

// Array state.board[0]

function hasWon(symbol) {
    if (
        (state.board[0] === symbol && state.board[1] === symbol && state.board[2] === symbol) ||
        (state.board[3] === symbol && state.board[4] === symbol && state.board[5] === symbol) ||
        (state.board[6] === symbol && state.board[7] === symbol && state.board[8] === symbol) ||
        (state.board[0] === symbol && state.board[3] === symbol && state.board[6] === symbol) ||
        (state.board[1] === symbol && state.board[4] === symbol && state.board[7] === symbol) ||
        (state.board[2] === symbol && state.board[5] === symbol && state.board[8] === symbol) ||
        (state.board[0] === symbol && state.board[4] === symbol && state.board[8] === symbol) ||
        (state.board[2] === symbol && state.board[4] === symbol && state.board[6] === symbol)
    ) {
        return true

    }
    return false
}