initialize();

/**
 * Funcion que se lleva a cabo al tocar el boton de iniciar para verificar el tamaño y los nombres ingresados, y cambiar de ventana
 */
function initialize(){
    document.getElementById('play').addEventListener('click',function(){initialize()});
    const boardSize = document.getElementById('boardSize').value;
    if ((3>boardSize || boardSize>5)){
        document.getElementById('msg5').innerHTML ="<p>Por favor ingrese un número entre 3 y 5</p>";
    }
    else{
        document.getElementById('msg5').innerHTML ="";
    }
    if(validateName('jugador1') && validateName('jugador2') && validateName('jugador3') && validateName('jugador4')){
        document.getElementById('msg4').innerHTML=""
        if(3 <= boardSize && boardSize <=5 ){
            window.location.href = 'game.html'
            
        }
    }
}

/**
 * Funcion que verifica si el nombre ingresado es vacio o no
 * @param {*} name, identificador del html  
 * @returns verdadero si el nombre es valido, falso en caso contrario
 */
function validateName(name){
    const username = document.getElementById(name).value;
    if (username === '') {
        document.getElementById('msg4').innerHTML="<p>Por favor ingrese un nombre para cada jugador</p>"
        return false;
    }
    else{
        return true;
    }   
} 

/**
 * Funcion que genera una matriz nxn con numeros aleatorios sin repetir
 * @param {*} n, numeri ingresado por el usuario
 * @returns matriz nxn
 */
function generateMatrix(n) {
    let matriz = [];
    let i=0;
    let usedNumbers = new Set(); 
    while (i < n) {
        matriz[i] = [];
        for (let j = 0; j < n; j++) {
        let randomNumber= Math.floor(Math.random() * 50) + 1;
        while(usedNumbers.has(randomNumber)){
            randomNumber = Math.floor(Math.random() * 50) + 1;
        }
        usedNumbers.add(randomNumber); 
        matriz[i][j] = randomNumber;
        }
        i++;
    }

    return matrix
}


function generateBingoBoard(matrix, htmlId, username){
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
        cell.classList.add("cell");
        cell.textContent = matrix[i][j];
        row.append(cell);
      }
      bingoBody.append(row);

    }
    bingoCard.append(bingoBody);
    let number = htmlId [-1];
    let newId = 'nombreJugador'+number;
    document.getElementById(newId).innerHTML='<h3>'+username+'</h3>';

    return finalBingoCard;

}




matrix = generateMatrix(boardSize);
card1 = generateBingoBoard(matrix, bingoCard1,player1);

