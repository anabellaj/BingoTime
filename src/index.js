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


