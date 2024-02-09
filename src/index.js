```function getUsernames(){
    const user1 = jugador1.value;
    const user2 = jugador2.value;
    const user3 = jugador3.value;
    const user4 = jugador4.value;
}

function validateUsername(user){
    if(user==""){
        msg.innerHTML="<p>INGRESE UN NOMBRE</p>"
        setTimeout(()=>{
          msg.innerHTML=""
        }, 3000)
      }
}

validateUsername(user1);
validateUsername(user2);
validateUsername(user3);
validateUsername(user4);```

function validateUsernames(jugador1, jugador2, jugador3, jugador4) {
    const usernames = [jugador1.value, jugador2.value, jugador3.value, jugador4.value];
  
    const errors = [];
  
    // Simplified validation with single loop
    usernames.forEach((username, index) => {
      if (!username.trim()) {
        errors.push({ index, message: "Username cannot be empty" });
      } else if (username.length < 3 || username.length > 20) {
        errors.push({
          index,
          message: "Username must be between 3 and 20 characters",
        });
      }
    });
  
    if (errors.length > 0) {
      // Replace with your error display logic (e.g., alerts, messages)
      console.error("Errors:", errors);
    } else {
      console.log("All usernames valid!");
    }
  }


  function createBoard(numRows, numCols) {
    // Validate input
    const numRows = 3;
    const numCols = 3;
    // Create the table element
    const table = document.createElement("table");
  
    // Create rows and cells with random numbers
    for (let i = 0; i < numRows; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < numCols; j++) {
        const cell = document.createElement("td");
        cell.textContent = Math.floor(Math.random() * 50) + 1; // Generate random number between 1 and 50
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  
    return table;
  }

  startButton.addEventListener("click", createBoard);
