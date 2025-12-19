let humanScore = 0;
let computerScore = 0;
const ROUNDS_NUMBER = 5;

function getComputerChoice(){
    const randomNum = Math.floor(Math.random() * 3);
    
    if(randomNum === 0){
        return "rock";
    }else if(randomNum === 1){
        return "paper";
    }else if(randomNum){
        return "scissors";
    }
}

function getHumanChoice(){
    const humanChoice = prompt("Choose your weapon: Rock, Paper or Scissors");
    return humanChoice;
}

function playRound(humanChoice, computerChoice){

    switch(humanChoice){
        case "rock":
            if(computerChoice === "paper"){
                console.log("You Lose! Paper beats Rock");
                computerScore++;
            }else if(computerChoice === "rock"){
                console.log("A Tie!");
                humanScore++;
                computerScore++;
            }else if(computerChoice === "scissors"){
                console.log("You Win! Rock beats Scissors");
                humanScore++;
            }

            break;

        case "paper":
            if(computerChoice === "rock"){
                console.log("You Win! Paper beats Rock");
                humanScore++; 
            }else if(computerChoice === "paper"){
                console.log("A Tie!");
                humanScore++;
                computerScore++;
            }else if(computerChoice === "scissors"){
                console.log("You Lose! Scissors beats Paper");
                computerScore++;
            }

            break;

        case "scissors":
            if(computerChoice === "rock"){
                console.log("You Lose! Rock beats Scissors");
                computerScore++; 
            }else if(computerChoice === "paper"){
                console.log("You Win! Scissors beats Paper");
                humanScore++;
            }else if(computerChoice === "scissors"){
                console.log("A Tie!");
                humanScore++;
                computerScore++;
            }

            break;
    }
}

function playGame(){

    for(let i = 0; i < ROUNDS_NUMBER; i++){
        console.log("Round " + (i + 1));

        const humanChoice = getHumanChoice().toLowerCase();
        const computerChoice = getComputerChoice().toLowerCase();

        playRound(humanChoice, computerChoice);
    }

    printGameResult();
}

function printGameResult(){

    console.log("Final Result: ");

    if(humanScore > computerScore){
        console.log("You Win!");
    }else if(humanScore < computerScore){
        console.log("You Lose!");
    }else{
        console.log("Tie!");
    }

    console.log("Human Score: " + humanScore);
    console.log("Computer Score: " + computerScore);
}

playGame();

