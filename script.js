const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector(
    '[data-winning-message-text]')
const playerTurn = document.querySelector(
    '[player-turn]')
const restartButton = document.getElementById('restartButton')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)


function startGame() {
    /*
    First function to initiate the game. It removes all information 
    generated from the previous game then activates the Event Listeners 
    for all  9 cells through a loop.
    :param: 
        cellElements: Inherited from a global variable. A nested list 
        that represents all 9 cells.
        winningMessageElement: Inherited from a global variable. A HTML
        class to display end game message.
    :return: none.
    */
    circleTurn = true
    winningMessageElement.classList.remove('show')
    cellElements.forEach(cell => { 
        cell.classList.remove(X_CLASS) //remove all X's and O's .
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick) //reset EventListeners.
        cell.addEventListener('click', handleClick, {once: true})
    })
    playerTurn.innerText = "O's Turn"
}

function handleClick(e) {
    /*
    This funtion grants the cell a game logic whether the move 
    has won the game, tied the game, or the game continues.
    :param:
        event: cell is passed into this function.
        currentClass: Inherited from a global variable. Indicates who played the move.
    :return: none.
    */
    const cell = e.target

    //If not circleTurn, then it's X's turn.
    const currentClass = circleTurn? CIRCLE_CLASS : X_CLASS 
    placeMark(cell, currentClass)
    
    //game logic: if no win, check for draw, if not draw, game continues.
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        playerTurn.innerText = circleTurn? "O's Turn" : "X's Turn"
    }
}

function checkWin(currentClass) {
    /*
    This funtion will match all winning combinations with the index of currentClasses 
    on the board.
    :param:
        WINNING_COMBINATIONS: Inherited from a global variable. A nested list of 
        winning patterns.
        currentClass: Indicates who played the move.
    :return: 
        boolean: true if a match is found, false if no match is found.
    */
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(result) {
    /*
    This funtion customizes the game ending message for a draw or a win depending on a 
    boolean parameter. It then triggers the winning message to show in HTML.
    :param:
        result: Boolean. True = Draw, False = Win.
        winningMessageTextElement: Inherited from a global variable. A HTML that 
        displays the game result.
        winningMessageElement: Inherited from a global variable. A HTMLclass to display 
        end game message.
    :return: none.
    */
    if (result) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = 
        `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    /*
    This funtion determines whether the game has reached a draw or not by scanning through
    all cells. 
    :param:
        cellElements: All 9 cells from HTML.
    :return: 
        Boolean: True if draw.
    */
    return [...cellElements].every(cell => {
        //If ALL cells were filled with both X_CLASS and CIRCLE_CLASS, return true.
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    })
    
}

function placeMark(cell, currentClass) {
    /*
    This funtion places the mark into the cell by modifying HTML.
    :param:
        cell: The cell which received the clicked.
        currentClass: Decides the mark is X or O.
    :return: None.
    */
    cell.classList.add(currentClass)
}

function swapTurns() {
    /*
    This funtion changes the boolean value of circleTurn variable.
    :param:
        circleTurn: Inherited from a global variable.
    :return: None.
    */
    circleTurn = !circleTurn
}

