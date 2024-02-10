let turnos = 0;
let usedNumbers = new Set();
let matrix = generateMatrix(5);
let bingoCardUser = generateBingoBoard(matrix, 'bingoCard1');


document.getElementById('numberButton').addEventListener('click', function() {
    const randomNumber = generateRandomNumber();
    markNumber(randomNumber, bingoCardUser);
  });

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

function generateBingoBoard(matrix, number){
    let bingoCard = document.getElementById(number);
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
        turnos++;
        document.getElementById('contador').innerHTML = turnos;
        return randomNumber;
    }



function markNumber(randomNumber, board){
    const cells = board.querySelectorAll('td');
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      if (cell.textContent  == randomNumber) {
        cell.classList.replace("noMarcado", "marcado");
        
        return;
      }
    }
  }

  function checkScore(board){
    const rows = board.querySelectorAll('tr');
    //horizontal
    for (let i=0; i<rows.length; i++){
        let cells = rows[i].querySelectorAll('td');
        for (let j=0; j<cells.length; j++){
            if (cells.class == 'noMarcado'){
                break;
            }
        }
    }


  }
