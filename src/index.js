//Se chequea el historial de victorias del Local Storage y se modifica la tabla de Ranking a partir de su contenido
if (localStorage.getItem('historial') != null){
    let victorias = JSON.parse(localStorage.getItem('historial'));
    victorias.sort((a, b) => 
        b.score - a.score);
    let ranks = ['primerLugar', 'segundoLugar','tercerLugar','cuartoLugar'];
    for (let i=0; i<victorias.length && i<5; i++){
        let idUser = document.getElementById(ranks[i]);
        let scoreUser = document.getElementById(`${ranks[i]}__score`);
        idUser.innerHTML=victorias[i].name;
        scoreUser.innerHTML=victorias[i].score;
    }
}

//Se agrega el EventListener al botón de empezar partida para validar los inputs y trasferirlos al Local Storage 
document.getElementById('play').addEventListener('click',function(){initialize()});

/**
 * Funcion que se lleva a cabo al tocar el boton de iniciar para verificar el tamaño y los nombres ingresados, y cambiar de ventana
 */
function initialize(){
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
            localStorage.setItem('username1', document.getElementById('jugador1').value);
            localStorage.setItem('username2', document.getElementById('jugador2').value);
            localStorage.setItem('username3', document.getElementById('jugador3').value);
            localStorage.setItem('username4', document.getElementById('jugador4').value);
            localStorage.setItem('boardSize', document.getElementById('boardSize').value);
            window.location.href = 'game.html'
            
        }
    }
}


/**
 * Funcion booleana que verifica si el nombre ingresado es vacio o no
 * @param {*} name, id de la etiqueta de html
 * @returns True si el nombre es valido, false en caso contrario
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


