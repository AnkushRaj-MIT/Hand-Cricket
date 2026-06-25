const startBtn=document.querySelector("#start-btn");
const homeScreen=document.querySelector(".home-screen");
const tossScreen=document.querySelector(".toss-screen");

startBtn.addEventListener("click",()=>{
    homeScreen.classList.add("hide");
    tossScreen.classList.remove("hide");

});

const evenBtn=document.querySelector("#even-btn");
const oddBtn=document.querySelector("#odd-btn");

evenBtn.addEventListener("click", () => {
    playToss("Even");
});

oddBtn.addEventListener("click", () => {
    playToss("Odd");
});

const result = document.querySelector("#result");
let userWonToss=false;
const choiceScreen = document.querySelector(".choice-screen");
const batBtn = document.querySelector("#bat-btn");
const bowlBtn = document.querySelector("#bowl-btn");
let userBatFirst;
let isUserBatting;
const matchScreen = document.querySelector(".match-screen");

function playToss(userChoice){
    const tossResult = Math.random() < 0.5? "Even":"Odd";
    evenBtn.disabled = true;
    oddBtn.disabled = true;
    result.style.color="yellow";
    result.innerText = `Toss Result: ${tossResult}`;
    setTimeout(() => {
        if(userChoice === tossResult){
            userWonToss = true;
            result.style.color="lightgreen";
            result.innerText = "You won the toss!";
        }
        else{
            userWonToss = false;
            result.style.color="red";
            result.innerText = "Computer won the toss!";
        }
        setTimeout(() => {
            if(userWonToss){
                tossScreen.classList.add("hide");
                choiceScreen.classList.remove("hide");
            }
            else{
                const computerChoice =Math.random() < 0.5 ? "Bat" : "Bowl";
                    userBatFirst=(computerChoice === "Bowl");
                    isUserBatting = userBatFirst;
                    inningsText.innerText = isUserBatting? "Your Batting": "Computer Batting";
                    result.style.color="lightgreen";
                    result.innerText =`Computer chose to ${computerChoice}`;
                    setTimeout(() => {
                        tossScreen.classList.add("hide");
                        matchScreen.classList.remove("hide");
                    }, 1500);
            }
        }, 1500);
    }, 1500);
};

batBtn.addEventListener("click", () => {
    userBatFirst = true;
    isUserBatting=true;
    inningsText.innerText = "Your Batting";
    choiceScreen.classList.add("hide");
    matchScreen.classList.remove("hide");
});
bowlBtn.addEventListener("click", () => {
    userBatFirst = false;
    isUserBatting=false;
    inningsText.innerText = "Computer Batting";
    choiceScreen.classList.add("hide");
    matchScreen.classList.remove("hide");
});

const runBtns = document.querySelectorAll(".hand-img");
let userScore=0;
let computerScore=0;
let target=0;
let innings=1;

const userScoreDisplay=document.querySelector('#user-score');
const computerScoreDisplay=document.querySelector('#computer-score');
const inningsText=document.querySelector("#innings-text");
const matchMessage = document.querySelector("#match-message");
const userChoiceImg = document.querySelector("#user-choice-img");
const computerChoiceImg = document.querySelector("#computer-choice-img");

runBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{
        const userRun=Number(btn.dataset.run);
        playMatch(userRun);
    });
});

const playAgainBtn=document.getElementById("play-again-btn");

function endMatch(message, result){
    if(result === "win")
        matchMessage.style.color = "lightgreen";
    else if(result === "draw")
        matchMessage.style.color = "yellow";
    else
        matchMessage.style.color = "red";
    matchMessage.innerText = message;
    document.querySelector(".hand-buttons").classList.add("hide");
    playAgainBtn.classList.remove("hide");
}

function playMatch(userRun){
    const computerRun=Math.floor(Math.random()*6)+1;
    userChoiceImg.src=`images/${userRun}.jpeg`;
    computerChoiceImg.src=`images/${computerRun}.jpeg`;
    if(isUserBatting){
        if(userRun===computerRun){
            if(innings === 1){
                matchMessage.style.color="red";
                matchMessage.innerText="You got OUT! ";
                runBtns.forEach(btn => {
                    btn.style.pointerEvents = "none";
                });
                target=userScore+1;
                setTimeout(()=>{
                    innings =2;
                    isUserBatting=false;
                    inningsText.innerText = "Computer Batting";
                    matchMessage.style.color="yellow";
                    matchMessage.innerText = `Target: ${target}`;
                    runBtns.forEach(btn => {
                        btn.style.pointerEvents = "auto";
                    });
                },2000);
            }
            else{
                if(userScore>=target){
                    endMatch("You won the game!","win");
                }
                else if(userScore===(target-1)){
                    endMatch("It's a Draw!","draw");
                }
                else{
                    endMatch("Computer won the game!","loss");
                }
            }
        }
        else{
            userScore+=userRun;
            userScoreDisplay.innerText=userScore;
            if(innings===2 && userScore>=target){
                endMatch("You won the game!","win");
            }
            else{
                matchMessage.style.color="lightgreen";
                if(innings===1) matchMessage.innerText=`You scored ${userRun} runs`;
                else matchMessage.innerText=`You scored ${userRun} runs `;
            }
        }
    }
    else{
        if(userRun===computerRun){
            if(innings ===1){
                matchMessage.style.color="red";
                matchMessage.innerText="Computer got OUT! ";
                target=computerScore+1;
                runBtns.forEach(btn=>{
                    btn.style.pointerEvents = "none";
                });
                setTimeout(()=>{
                    innings =2;
                    isUserBatting=true;
                    inningsText.innerText = "Your Batting";
                    matchMessage.style.color="yellow";
                    matchMessage.innerText = `Target: ${target}`;
                    runBtns.forEach(btn => {
                        btn.style.pointerEvents = "auto";
                     });
                },2000);
            }
            else{
                if(computerScore>=target){
                    endMatch("Computer won the game!","lose");
                }
                else if(computerScore===(target-1)){
                    endMatch("It's a Draw!","draw");
                }
                else{
                    endMatch("You won the game!","win");
                }
            }
        }
        else{
            computerScore+=computerRun;
            computerScoreDisplay.innerText=computerScore;
            if(innings===2 && computerScore>=target){
                endMatch("Computer won the game!","lose");
            }
            else{
                matchMessage.style.color="lightgreen";
                if(innings===1) matchMessage.innerText=`Computer scored ${computerRun} runs`;
                else matchMessage.innerText=`Computer scored ${computerRun} runs`;
            }
        }
    }
};

playAgainBtn.addEventListener("click",()=>{
    location.reload();
});
