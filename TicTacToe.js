let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newb = document.querySelector("#newb");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turn_o = true;
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turn_o = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log('Box was clicked');
        
        if(turn_o){
            box.innerText = 'O';          // Set the text for O
            box.classList.add('O');        // Add the O class for animation
            turn_o = false;
        } else {
            box.innerText = 'X';          // Set the text for X
            box.classList.add('X');        // Add the X class for animation
            turn_o = true;
        }
        
        box.disabled = true;              // Disable the box after it’s clicked
        count++;

        let isWinner = checkWin();        // Check if there's a winner

        if (count === 9 && !isWinner) {   // Check if it's a draw
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
  
const disableBoxes = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
};
  
const enableBoxes = () => {
    for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
};

const checkWin = () => {
    for (let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3){
                showWinner(pos1);
                return true;
            }
        }
    }
};

newb.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);