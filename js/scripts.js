const celulas = document.querySelectorAll(".celula");
let GameEnd = false;
const jogador_X = "X";
const jogador_O = "O";

//possiveis combinaçoes para vencer no jogo da velha
const combinacoes = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

document.addEventListener("click", (event) => {
    if (event.target.matches(".celula")){
        play(event.target.id, jogador_X);
        setTimeout (() => bot(), 500);
    }
});

function bot() {
    const positionAvailable = [];
    for (index in celulas) {
        if(!isNaN(index)) {
            if (
                !celulas[index].classList.contains("X") &&
                !celulas[index].classList.contains("O")
            ) {
                positionAvailable.push(index);
            }
        } 
    }
    const positionRandom = Math.floor(Math.random() * positionAvailable.length); //Math.floor aredonda o numero quebrado para baixo/inteiro

    if (!GameEnd) {
        play(positionAvailable [positionRandom], jogador_O);
    }    
}


    // logica do jogo da velha
    function play(id, turn) {
        const celula = document.getElementById(id);
        celula.textContent = turn;
        celula.classList.add(turn);
        checkWinner(turn);
    }

    //função para checar  o vencedor
    function checkWinner(turn) {
        const winner = combinacoes.some((comb) => {
            return comb.every((index) => {
                return celulas[index].classList.contains(turn);
            })     // o every precisa que todas as combinacoes sejam verdadeira para ele retornar true

        }); // o some faz com que se alguma das combinaçoes forem verdadeiras ele volta tudo true

        if (winner) {
            endGame(turn);
        } else if (checkTie ()) {
            endGame();
        } 
    } 

    function checkTie() {
       let x = 0;
       let O = 0;

       for (index in celulas) {
         if(!isNaN(index)) {
            if (celulas[index].classList.contains(jogador_X)) {
                x++;
            }
    
            if (celulas[index].classList.contains(jogador_O)) {
                O++;
            }
         }
       }

       return x + O === 9 ? true : false;
    }

    // winner = null pq se vier com parametro ele prevalece mas se vier sem ela fica nula
    function endGame(winner = null) {
        GameEnd = true;
        const darkScreen = document.getElementById("dark-screen");
        const h2 = document.createElement("h2");
        const h3 = document.createElement("h3");
        let message = null;

        darkScreen.style.display = "block"
        darkScreen.appendChild(h2);
        darkScreen.appendChild(h3);


        if(winner) {
            h2.innerHTML = `O player <span>${winner}</span> venceu`
        } else {
            h2.innerHTML = "Empatou";
        }

        let counter = 3;
        setInterval (() => {
            h3.innerHTML = `Reiniciando em ${counter--}`;
        }, 1000);

        setTimeout(() => location.reload(), 4000);

    }