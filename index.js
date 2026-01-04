let humanScore;
let computerScore;
let roundNum;
let gameState;

const gameChoiceButtons = document.querySelectorAll(".game-choice");
const resetGameButton = document.querySelector("#restart-game");
const gameResultDiv = document.querySelector("#game-result");

gameChoiceButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        playRound(e.target.innerText.toLowerCase(), getComputerChoice().toLowerCase());
    });
});

const GameState = Object.freeze({
    IDLE: "IDLE",
    PLAYING: "PLAYING",
    WON: "WON",
    LOST: "LOST"
});

const ComputerChoice = Object.freeze({
    ROCK: 0,
    PAPER: 1,
    SCISSORS: 2
});

function getComputerChoice(){
    const randomNum = Math.floor(Math.random() * 3);
    
    if(randomNum === ComputerChoice.ROCK){
        return "rock";
    }else if(randomNum === ComputerChoice.PAPER){
        return "paper";
    }else if(randomNum === ComputerChoice.SCISSORS){
        return "scissors";
    }
}

function updateGameState(){
    if(humanScore === 5){
        gameState = GameState.WON;
    }else if(computerScore === 5){
        gameState = GameState.LOST;
    }else{
        gameState = GameState.PLAYING;
    }
}

function playRound(humanChoice, computerChoice){

    updateGameState();

    if(gameState !== GameState.PLAYING){
        return;
    }

    roundNum++;

    const p = document.createElement("p");
    const roundResultText = document.createTextNode(`You Played: ${humanChoice}, Computer Played: ${computerChoice}`);
    p.appendChild(roundResultText);
    let textToAppend = "";
    let color = "#3b3b3b";

    switch(humanChoice){
        case "rock":
            if(computerChoice === "paper"){
                textToAppend = "You Lose! Paper beats Rock";
                color = "red";
                addPointToComputer();
            }else if(computerChoice === "rock"){
                textToAppend = "A Tie!";
            }else if(computerChoice === "scissors"){
                textToAppend = "You Win! Rock beats Scissors";
                color = "green";
                addPointToHuman();
            }

            break;

        case "paper":
            if(computerChoice === "rock"){
                textToAppend = "You Win! Paper beats Rock";
                color = "green";
                addPointToHuman(); 
            }else if(computerChoice === "paper"){
                textToAppend = "A Tie!";
            }else if(computerChoice === "scissors"){
                textToAppend = "You Lose! Scissors beats Paper";
                color = "red";
                addPointToComputer();
            }

            break;

        case "scissors":
            if(computerChoice === "rock"){
                textToAppend = "You Lose! Rock beats Scissors";
                color = "red";
                addPointToComputer(); 
            }else if(computerChoice === "paper"){
                textToAppend = "You Win! Scissors beats Paper";
                color = "green";
                addPointToHuman();
            }else if(computerChoice === "scissors"){
                textToAppend = "A Tie!";
            }

            break;
    }

    const curRoundScoreText = document.createTextNode(textToAppend);
    let coloredSpan = document.createElement("span");
    coloredSpan.appendChild(curRoundScoreText);
    coloredSpan.style.color = color;

    appendNewLine(p);
    p.appendChild(coloredSpan);

    printCurrentScore(p);

    gameResultDiv.appendChild(p);

    updateGameState();

    if(gameState === GameState.WON || gameState === GameState.LOST){
        let finalGameResultText = "";
        let color = "";

        if(gameState === GameState.WON){
            finalGameResultText = "Congratulations, You Won!";
            color = "green";
        }else{
            finalGameResultText = "Game Over!";
            color = "red";
        }

        let coloredSpan = document.createElement("span");
        coloredSpan.append(finalGameResultText);
        coloredSpan.style.color = color;

        gameResultDiv.appendChild(coloredSpan); 
    }

}

function addPointToHuman(){
    humanScore++;
}

function addPointToComputer(){
    computerScore++;
}

function printCurrentScore(element){
    const text = `Round ${roundNum} - Your Score: ${humanScore}, Computer Score: ${computerScore}`;
    const textNode = document.createTextNode(text);

    appendNewLine(element);
    element.appendChild(textNode);
}

function appendNewLine(element){
    const newLine = document.createElement("br");
    element.appendChild(newLine);
}



function startNewGame(){

    gameResultDiv.textContent = ""; 

    resetGameButton.addEventListener("click", (e) => {
        startNewGame();
    });

    humanScore = 0;
    computerScore = 0;
    roundNum = 0;
    gameState = GameState.IDLE; 
}

startNewGame();
