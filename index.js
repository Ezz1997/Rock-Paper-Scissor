let humanScore;
let computerScore;
let roundNum;
let gameState;

const gameChoiceButtons = document.querySelectorAll(".game-choice");
const resetGameButton = document.querySelector("#restart-game-button");
const gameResultDiv = document.querySelector("#game-result");

gameChoiceButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if(e.target.id){
            playRound(e.target.id.toLowerCase(), getComputerChoice().toLowerCase());
        }
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

const RoundWinner = Object.freeze({
    HUMAN: "human",
    COMPUTER: "computer"
})

const GameStateColor = Object.freeze({
    WIN: "green",
    LOSE: "red",
    TIE: "grey"
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

    let roundWinner = "";

    updateGameState();

    if(gameState !== GameState.PLAYING){
        return;
    }

    gameResultDiv.textContent = "";

    roundNum++;

    const p = document.createElement("p");
    // const roundResultText = document.createTextNode(`You Played: ${humanChoice}, Computer Played: ${computerChoice}`);
    // p.appendChild(roundResultText);
    let textToAppend = "";
    let color = "#3b3b3b";

    switch(humanChoice){
        case "rock":
            if(computerChoice === "paper"){
                textToAppend = "You Lose! Paper beats Rock";
                roundWinner = RoundWinner.COMPUTER;
            }else if(computerChoice === "rock"){
                textToAppend = "A Tie!";
            }else if(computerChoice === "scissors"){
                textToAppend = "You Win! Rock beats Scissors";
                roundWinner = RoundWinner.HUMAN;
            }

            break;

        case "paper":
            if(computerChoice === "rock"){
                textToAppend = "You Win! Paper beats Rock";
                roundWinner = RoundWinner.HUMAN;
            }else if(computerChoice === "paper"){
                textToAppend = "A Tie!";
            }else if(computerChoice === "scissors"){
                textToAppend = "You Lose! Scissors beats Paper";
                roundWinner = RoundWinner.COMPUTER;
            }

            break;

        case "scissors":
            if(computerChoice === "rock"){
                textToAppend = "You Lose! Rock beats Scissors";
                roundWinner = RoundWinner.COMPUTER;
            }else if(computerChoice === "paper"){
                textToAppend = "You Win! Scissors beats Paper";
                roundWinner = RoundWinner.HUMAN;
            }else if(computerChoice === "scissors"){
                textToAppend = "A Tie!";
            }

            break;
    }

    if(roundWinner === RoundWinner.HUMAN){
        addPointToHuman();
        color = GameStateColor.WIN;
    }else if(roundWinner === RoundWinner.COMPUTER){
        addPointToComputer();
        color = GameStateColor.LOSE;
    }else{
        color = GameStateColor.TIE;
    }

    createGameChoiceImages(humanChoice, computerChoice, "game-choice-image", roundWinner);

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
            color = GameStateColor.WIN;
        }else{
            finalGameResultText = "Game Over!";
            color = GameStateColor.LOSE;
        }

        let coloredSpan = document.createElement("span");
        coloredSpan.append(finalGameResultText);
        coloredSpan.style.color = color;

        appendNewLine(gameResultDiv);
        gameResultDiv.appendChild(coloredSpan); 
    }


}

function createGameChoiceImages(humanChoice, computerChoice, imgClass, roundWinner){

    const humanChoiceImage = document.createElement("img");
    const computerChoiceImage = document.createElement("img");
    let humanImageColor = "";
    let computerImageColor = "";

    humanChoiceImage.src = `game-images/${humanChoice}.png`;
    computerChoiceImage.src = `game-images/${computerChoice}.png`;

    humanChoiceImage.classList.add(imgClass);
    computerChoiceImage.classList.add(imgClass);

    if(roundWinner === RoundWinner.HUMAN){
        humanImageColor = GameStateColor.WIN;
        computerImageColor = GameStateColor.LOSE;

    }else if(roundWinner === RoundWinner.COMPUTER){
        humanImageColor = GameStateColor.LOSE;
        computerImageColor = GameStateColor.WIN;
    }else{
        humanImageColor = GameStateColor.TIE;
        computerImageColor = GameStateColor.TIE;
    }

    humanChoiceImage.style.border = `5px solid ${humanImageColor}`;
    computerChoiceImage.style.border = `5px solid ${computerImageColor}`;

    const p = document.createElement("p");
    p.append("You Vs Computer");
    p.style.marginLeft = "50px";
    gameResultDiv.appendChild(p);

    gameResultDiv.appendChild(humanChoiceImage); 
    gameResultDiv.append("\t");
    gameResultDiv.appendChild(computerChoiceImage); 
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
