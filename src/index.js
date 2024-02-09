function getUsernames(){
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
validateUsername(user4);

