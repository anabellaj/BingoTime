//Se genera un bingo board del tamaño indicado por el usuario
function generateBingoBoard(n) {
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
    let bingoCard = document.getElementById("bingoCard");
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
    for (let i = 0; i < matriz.length; i++) {
        let row = document.createElement("tr");
      for (let j = 0; j < matriz[i].length; j++) {
        let cell = document.createElement("td");
        cell.classList.add("cell");
        cell.textContent = matriz[i][j];
        row.append(cell);
      }
      bingoBody.append(row);

    }
    bingoCard.append(bingoBody);
}

generateBingoBoard(5);