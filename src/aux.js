// Se obtienen las variables del localStorage (nombres y tamaño del carton) y se generan los usuarios
const boardSize = localStorage.getItem('boardSize');
let user1 = {name: localStorage.getItem('username1'), card: generateBingoBoard(generateMatrix(boardSize), 'bingoCard1'), score: 0};
let user2 = {name: localStorage.getItem('username2'), card: generateBingoBoard(generateMatrix(boardSize), 'bingoCard2'), score: 0};
let user3 = {name: localStorage.getItem('username3'), card: generateBingoBoard(generateMatrix(boardSize), 'bingoCard3'), score: 0};
let user4 = {name: localStorage.getItem('username4'), card: generateBingoBoard(generateMatrix(boardSize), 'bingoCard4'), score: 0};

let users = [user1, user2,user3,user4];
let cardIndex = 0;
let turnos = 25;
let usedNumbers = new Set();

//Se agrega el EventListener al boton de 'generar numero' en donde se genera un numero aleatorio y se chequean todos los cartones y puntuaciones
document.getElementById('numberButton').addEventListener('click', function() {
    const randomNumber = generateRandomNumber();
    markNumber(randomNumber, user1.card);
    markNumber(randomNumber, user2.card);
    markNumber(randomNumber, user3.card);
    markNumber(randomNumber, user4.card);
  });

//Se agrega el EventListener a los botones de cambiar carton (adelante y atras) y el de reiniciar juego
document.getElementById('restart').addEventListener('click',function(){restart()});
document.getElementById('next').addEventListener('click',function(){switchCardNext()});
document.getElementById('back').addEventListener('click',function(){switchCardBack()});

document.getElementById('nombreJugador1').innerText = user1.name;


/**
 * Función que genera una matriz del tamaño especificado por el usuario
 * @param {*} n, tamaño de la matriz a construir
 * @returns una matriz nxn
 */
function generateMatrix(n) {
    let matrix = [];
    let i=0;
    let usedBoardNumbers = new Set(); 
    while (i < n) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
        let randomNumber= Math.floor(Math.random() * 50) + 1;
        while(usedBoardNumbers.has(randomNumber)){
            randomNumber = Math.floor(Math.random() * 50) + 1;
        }
        usedBoardNumbers.add(randomNumber); 
        matrix[i][j] = randomNumber;
        }
        i++;
    }
    return matrix
}


/**
 * Función que "dibuja" el cartón de bingo de cada usuario a partir de la matriz creada 
 * @param {*} matrix, matriz a dibujar
 * @param {*} htmlId id de su contenedor en el archivo html
 * @returns el html del carton de bingo
 */
function generateBingoBoard(matrix, htmlId){
    let bingoCard = document.getElementById(htmlId);
    let bingoHead = document.createElement("thead");
    let headerRow = document.createElement("tr");
    headerRow.innerHTML = `
        <th>B</th>
        <th>I</th>
        <th>N</th>
        <th>G</th>
        <th>O</th>`;
    bingoHead.append(headerRow);
    bingoCard.append(bingoHead);

    let bingoBody = document.createElement("tbody");
    for (let i = 0; i < matrix.length; i++) {
        let row = document.createElement("tr");
      for (let j = 0; j < matrix[i].length; j++) {
        let cell = document.createElement("td");
        cell.classList.add("noMarcado");
        cell.textContent = matrix[i][j];
        row.append(cell);
      }
      bingoBody.append(row);
    }
    bingoCard.append(bingoBody);
    return bingoCard;
}


/**
 * Funcion que genera un número aleatorio (sin repetir)
 * @returns número aleatorio entre 1 y 50
 */
function generateRandomNumber(){
    let randomNumber= Math.floor(Math.random() * 50) + 1;
    while(usedNumbers.has(randomNumber)){
        randomNumber = Math.floor(Math.random() * 50) + 1;
    }
    usedNumbers.add(randomNumber); 
    document.getElementById('bingoBall').innerHTML = '<p>'+randomNumber+'</p>';
    turnos--;
    document.getElementById('contador').innerHTML = turnos;
    if (turnos == 0){
        gameOver();
    }
    return randomNumber;
}


/**
 * Función que permite "marcar" la casilla de los números de los cartones que coinciden con el número aleatorio obtenido
 * @param {*} randomNumber, número a marcar
 * @param {*} board, cartón en donde se marcará la casilla
 * @returns 
 */
function markNumber(randomNumber, board){
    const cells = board.querySelectorAll('td');
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      if (cell.textContent  == randomNumber) {
        cell.classList.replace("noMarcado", "marcado");
        if (checkFullCard(board)){
            alert('BINGO!')
            gameOver();
        }
        return;
      }
    }
    checkVertical(board);
  }


/**
 * Función que chequea el score total obtenido por un cartón
 * @param {*} board, cartón a calcular puntaje
 * @returns puntuación total
 */
function checkScore(board){
    let score = 0
    for (let i = 0; i < board.rows.length; i++) {
    if (checkHorizontal(board.rows[i].cells)) {
        score++;
    }
    }
    if (checkVertical(board)) {
    score++;
    }
    const cells = board.querySelectorAll("td");
    const boardSize = Math.sqrt(cells.length);

    let diagonal1Complete = true;
    let diagonal2Complete = true;

    for (let i = 0; i < boardSize; i++) {
    if (!cells[i * boardSize + i].classList.contains("marcado")) {
        diagonal1Complete = false;
    }
    if (!cells[i * boardSize + (boardSize - 1 - i)].classList.contains("marcado")) {
        diagonal2Complete = false;
    }
    }
    if (diagonal1Complete) {
    score += 3;
    }
    if (diagonal2Complete) {
    score += 3;
    }
    if (checkFullCard(board)) {
    score += 5;
    }

    return score;
}


/**
 * Función que elimina los usuarios del local storage y va a la pagina de inicio al presionar el botón de reiniciar
 */
function restart(){
localStorage.removeItem('username1');
localStorage.removeItem('username2');
localStorage.removeItem('username3');
localStorage.removeItem('username4');
localStorage.removeItem('boardSize');
window.location.href = 'index.html'
}
  

/**
 * Función que cambia el cartón principal al cartón del usuario siguiente
 * @returns No se ejecuta la función si no existe usuario siguiente (el cartón actual es del usuario 4)
 */
function switchCardNext (){
    if (cardIndex == 3){
        return;
    }
    let container = document.getElementById('mainCard');
    container.innerHTML='';
    let currentCard = users[cardIndex].card;
    currentCard.classList.replace('activeCard','cardsHidden');
    cardIndex++;
    let newCard = users[cardIndex].card;
    newCard.classList.replace('cardsHidden', 'activeCard');
    container.append(newCard);
    let nameCard = document.createElement('h3');
    nameCard.innerHTML = users[cardIndex].name;
    container.append(nameCard);
}


/**
 * Función que cambia el cartón principal al cartón del usuario anterior
 * @returns No se ejecuta la función si no existe usuario anterior (el cartón actual es del usuario 1)
 */
function switchCardBack(){
    if (cardIndex == 0){
        return ;
    }
    let container = document.getElementById('mainCard');
    container.innerHTML='';
    let currentCard = users[cardIndex].card;
    currentCard.classList.replace('activeCard','cardsHidden');
    cardIndex--;
    let newCard = users[cardIndex].card;
    newCard.classList.replace('cardsHidden', 'activeCard');
    container.append(newCard);
    let nameCard = document.createElement('h3');
    nameCard.innerHTML = users[cardIndex].name;
    container.append(nameCard);
}


/**
 * Función que se ejecuta al acabarse los turnos o cuando existe un bingo
 * Se calcula el puntaje con la función checkScore(), se muestra el ranking de la partida y se da la opción de reiniciar
 * Además se guarda el nombre del ganador en el LocalStorage, con su respectiva cantidad de victorias 
 */
function gameOver(){
    let container = document.getElementById('container');
    container.innerHTML='<div class="container__left"><h1 id="ranks">Ranking</h1><table id="rankingTable"><thead><tr><th></th><th>Jugador</th><th>Score</th></tr></thead><tbody><tr><td>Winner!</td><td id="primerLugar">N/A</td><td id="primerLugar__score">N/A</td></tr><tr><td>2nd</td><td id="segundoLugar">N/A</td><td id="segundoLugar__score">N/A</td></tr><tr><td>3rd</td><td id="tercerLugar">N/A</td><td id="tercerLugar__score">N/A</td></tr><tr><td>4th</td><td id="cuartoLugar">N/A</td><td id="cuartoLugar__score">N/A</td></tr></tbody></table></div><div class="container__right"><button id="restart" class="restartButton" style="margin: auto"><img src="../images/RESTART.png" width="250px" /></button></div>';
    document.getElementById('restart').addEventListener('click',function(){restart()});
    for (let i=0; i<users.length; i++){
        let user = users[i];
        user.score = checkScore(user.card);
        console.log(user.name, user.score);
    }
    users.sort((a, b) => 
        b.score - a.score);
    console.log(users);
    let places = ['primerLugar', 'segundoLugar','tercerLugar','cuartoLugar'];
    for (i=0; i<users.length; i++){
        let idUser = document.getElementById(places[i]);
        let scoreUser = document.getElementById(`${places[i]}__score`);
        idUser.innerHTML=users[i].name;
        scoreUser.innerHTML=users[i].score;
    }
    if (users[0].score != 0 && (users[0].score != users[1].score)){
        if (localStorage.getItem('historial') != null){
            let victorias = JSON.parse(localStorage.getItem('historial'));
            let newUser = true;
            for (let i = 0; i < victorias.length; i++){
                if (victorias[i].name == users[0].name){
                    let victories = parseInt(victorias[i].score);
                    victories+= 1;
                    victorias[i].score = victories;
                    newUser = false;
                    break;
                }
            } if (newUser){
                victorias.push({name: users[0].name, score: 1});
            }
            localStorage.setItem('historial', JSON.stringify(victorias));

        } else {
            let victorias = [{name: users[0].name, score: 1}]
            localStorage.setItem('historial', JSON.stringify(victorias));
        }
    }   else{
        let msg = document.getElementById('ranks');
        msg.innerHTML = "It's a tie!";
    }
}


/**
 * Función booleana que permite chequear si el usuario completó una línea vertical en el tablero 
 * @param {*} board, cartón a chequear
 * @returns True si se ha hecho alguna línea vertical, false en caso contrario
 */
function checkVertical(board) {
    const cells = board.querySelectorAll('td');
    const boardSize = Math.sqrt(cells.length);
    for (let j = 0; j < boardSize; j++) {
      let selected = 0;
      for (let i = 0; i < boardSize; i++) {
        if (cells[i * boardSize + j].classList.contains('marcado')) {
          selected++;
        }
      }
      if (selected === boardSize) {
        return true;
      }
    }
  }

  
/**
* Función booleana que permite chequear si el usuario completó una línea horizontal en el tablero 
 * @param {*} cells, línea de celdas a chequear
 * @returns True si se ha hecho alguna línea horizontal, false en caso contrario
 */
function checkHorizontal(cells) {
for (let i = 0; i < cells.length; i++) {
    if (!cells[i].classList.contains("marcado")) {
    return false;
    }
}
return true;
}


/**
 * Función booleana que permite chequear si se ha completado un cartón lleno
 * @param {*} board, cartón a chequear 
 * @returns True si se ha completado el cartón lleno, false en caso contrario
 */
function checkFullCard(board) {
const cells = board.querySelectorAll("td");
for (let i = 0; i < cells.length; i++) {
    if (!cells[i].classList.contains("marcado")) {
    return false;
    }
}
return true;
}
