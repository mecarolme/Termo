var col = 0;
var row = 0;
var letras = 5; //quant. de letras na palavra
var tentativas = 6;

var listaPalavras = ["TESTE", "CAROL", "LETRA", "CERTO"]; //base de palavras certas
var palavra = listaPalavras[Math.floor(Math.random() * listaPalavras.length)]; //escolhe uma das palavras do array aleatoriamente
console.log("A palavra certa é: " + palavra); // palavra certa no console

var gameOver = false;

function iniciar() {
    for (let i = 0; i < tentativas; i++) {
        for (let j = 0; j < letras; j++) {
            let voidSquares = document.createElement("span");
            voidSquares.id = i.toString() + "-" + j.toString();
            voidSquares.classList.add("square");
            voidSquares.innerText = "";
            document.getElementById("board").appendChild(voidSquares);
        }
    }

    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "DEL"]
    ]

    for (let i = 0; i < keyboard.length; i++) {
        let row = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboardRow");

        for (let j = 0; j < row.length; j++) {
            let squareKey = document.createElement("div");

            let key = row[j];
            squareKey.innerText = key;
            if (key == "Enter") {
                squareKey.id = "Enter";
            }
            else if (key == "DEL") {
                squareKey.id = "Backspace";
            }
            else if ("A" <= key && key <= "Z") {
                squareKey.id = "Key" + key;
            }

            squareKey.addEventListener("click", logicainput);

            if (key == "Enter") {
                squareKey.classList.add("btnEnter");
            } else if (key == "DEL") {
                squareKey.classList.add("btnBack");
            } else {
                squareKey.classList.add("btnSquare");
            }
            keyboardRow.appendChild(squareKey);
        }
        document.body.appendChild(keyboardRow);
    }

    document.addEventListener("keyup", (e) => {
        calcInput(e);
    }
    )
}

function logicainput() {
    aux = { "code": this.id };

    calcInput(aux);
}

function atualizar() {
    let correct = 0;
    for (let w = 0; w < letras; w++) {
        let square = document.getElementById(row.toString() + '-' + w.toString());
        let letter = square.innerText;

        document.getElementById("resposta").innerText = "Continue tentando...";

        square.classList.add('giro1');
        setTimeout(() => {
            if (palavra[w] == letter) {
                square.classList.add("certo");
                let squareKey = document.getElementById("Key" + letter);
                squareKey.classList.add("certo");
                correct += 1;
            } else if (palavra.includes(letter)) {
                square.classList.add("contem");
                let squareKey = document.getElementById("Key" + letter);
                squareKey.classList.add("contem");
            } else {
                square.classList.add("naotem");
                let squareKey = document.getElementById("Key" + letter);
                squareKey.classList.add("naotem")
            }

            square.classList.remove('giro1');
            square.classList.add('giro2');
            if (correct == letras) {
                gameOver = true;
                document.getElementById("resposta").innerText = "PARABÉNS!!!";
            }
        }, 450);
    }

    row += 1;
    col = 0;
}

function calcInput(aux) {
    if (gameOver) return;

    if ("KeyA" <= aux.code && aux.code <= "KeyZ") {
        if (col < letras) {
            let square = document.getElementById(row.toString() + '-' + col.toString());
            if (square.innerText == "") {
                square.innerText = aux.code[3];
                col += 1;
            }
        }
    } else if (aux.code == "Backspace") {
        if (0 < col && col <= letras) {
            col -= 1;
        } let square = document.getElementById(row.toString() + '-' + col.toString());
        square.innerText = "";
    } else if (aux.code == "Enter") {
        if (col == letras) {
            atualizar();
        } else {
            document.getElementById("resposta").innerText = "Palavra incompleta! preencha a linha";
        }
    }

    if (!gameOver && row == tentativas) {
        gameOver = true;
        document.getElementById("resposta").innerText = "PERDEU! A palavra certa era: " + palavra;
    }
}

const Modal = {
    open() {
        document.querySelector('#modal').classList.add('active')
    },
    close() {
        document.querySelector('#modal').classList.remove('active')
    },
}

function info() {
    console.log("Desenvolvido por Caroline Medeiros.")
    Modal.open();
}

window.onload = function () {
    iniciar();
    info();
}
