let humanScore = 0;
let computerScore = 0;

function getComputerChoice(){
    const randomNum = Math.floor(Math.random() * 3);
    
    if(randomNum === 0){
        return "rock";
    }else if(randomNum === 1){
        return "paper";
    }else{
        return "scissors";
    }
}

function getHumanChoice(){
    const humanChoice = prompt("Choose your weapon: Rock, Paper or Scissors");
    return humanChoice;
}

console.log(getComputerChoice());
console.log(getHumanChoice());