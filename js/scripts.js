const celulas = document.querySelectorAll(".celula");
let checkTurn = true;
const jogador_X = "X";
const jogador_O = "O";

document.addEventListener("click", (event) => {
    if (event.target.matches(".celula")){
        play(event.target.id);
    }
    });

    function play(id) {
        const celula = document.getElementById(id);
        turn = checkTurn ? jogador_X : jogador_O;
        celula.textContent = turn;
        checkTurn = !checkTurn;  
        checkWinner(turn);
    }

    function checkWinner(turn) {
        
    }