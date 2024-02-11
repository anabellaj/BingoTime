const boardSize = localStorage.getItem('boardSize');

let user1 = {name: localStorage.getItem('username1'), card: generateBingoBoard(generateMatrix(boardSize), 'bingoCard1'), score: 0};
let user2 = {name: localStorage.getItem('username2'), card: generateBingoBoard(generateMatrix(boardSize), 'bingoCard2'), score: 0};
let user3 = {name: localStorage.getItem('username3'), card: generateBingoBoard(generateMatrix(boardSize), 'bingoCard3'), score: 0};
let user4 = {name: localStorage.getItem('username4'), card: generateBingoBoard(generateMatrix(boardSize), 'bingoCard4'), score: 0};

let users = [user1, user2,user3,user4];
let cardIndex = 0;
let turnos = 25;
let usedNumbers = new Set();

document.getElementById('numberButton').addEventListener('click', function() {
    const randomNumber = generateRandomNumber();
    markNumber(randomNumber, user1['card']);
    markNumber(randomNumber, user2['card']);
    markNumber(randomNumber, user3['card']);
    markNumber(randomNumber, user4['card']);
  });

document.getElementById('restart').addEventListener('click',function(){restart()});
document.getElementById('next').addEventListener('click',function(){switchCardNext()});
document.getElementById('back').addEventListener('click',function(){switchCardBack()});

document.getElementById('nombreJugador1').innerText = user1['name'];

function generateMatrix(n) {
    let matrix = [];
    let i=0;
    let usedNumbers = new Set(); 
    while (i < n) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
        let randomNumber= Math.floor(Math.random() * 50) + 1;
        while(usedNumbers.has(randomNumber)){
            randomNumber = Math.floor(Math.random() * 50) + 1;
        }
        usedNumbers.add(randomNumber); 
        matrix[i][j] = randomNumber;
        }
        i++;
    }
    return matrix
}

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



function markNumber(randomNumber, board){
    const cells = board.querySelectorAll('td');
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      if (cell.textContent  == randomNumber) {
        cell.classList.replace("noMarcado", "marcado");
        if (checkFullCard(board)){
            gameOver();
        }
        return;
      }
    }
    checkVertical(board);
  }

  function checkScore(board){
    let score = 0;
    
      for (let i = 0; i < board.rows.length; i++) {
        if (checkLine(board.rows[i].cells)) {
          score++;
          console.log("Horizontal line bingo!");
        }
      }
    
      if (checkVertical(board)) {
        score++;
        console.log("Vertical line bingo!");
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
        console.log("Diagonal 1 bingo!");
      }
    
      if (diagonal2Complete) {
        score += 3;
        console.log("Diagonal 2 bingo!");
      }
    
      if (checkFullCard(board)) {
        score += 5;
        console.log("Full bingo card!");
      }
    
      return score;

  }


  function restart(){
    localStorage.removeItem('username1');
    localStorage.removeItem('username2');
    localStorage.removeItem('username3');
    localStorage.removeItem('username4');
    localStorage.removeItem('boardSize');
    window.location.href = 'index.html'
}
  
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


function gameOver(){
    let container = document.getElementById('container');
    container.innerHTML='<div class="container__left"><h1>Ranking</h1><table id="rankingTable"><thead><tr><th></th><th>Jugador</th><th>Score</th></tr></thead><tbody><tr><td>Winner!</td><td id="primerLugar">N/A</td><td id="primerLugar__score">N/A</td></tr><tr><td>2nd</td><td id="segundoLugar">N/A</td><td id="segundoLugar__score">N/A</td></tr><tr><td>3rd</td><td id="tercerLugar">N/A</td><td id="tercerLugar__score">N/A</td></tr><tr><td>4th</td><td id="cuartoLugar">N/A</td><td id="cuartoLugar__score">N/A</td></tr></tbody></table></div><div class="container__right"><button id="restart" class="restartButton" style="margin: auto"><img src="../images/RESTART.png" width="250px" /></button></div>';
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
}

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
        console.log("Vertical line bingo!");
        return true;
      }
    }
  }

  function checkFullCard(board) {
    const cells = board.querySelectorAll("td");
    for (let i = 0; i < cells.length; i++) {
      if (!cells[i].classList.contains("marcado")) {
        return false;
      }
    }
    return true;
  }
  function checkLine(cells) {
    for (let i = 0; i < cells.length; i++) {
      if (!cells[i].classList.contains("marcado")) {
        return false;
      }
    }
    return true;
  }

