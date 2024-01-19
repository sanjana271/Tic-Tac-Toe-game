let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelectorAll("#reset");
let newGamebtn = document.querySelectorAll("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO = true;
let count = 0;

const winpatters = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;

        let isWinner= checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const diableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    diableBoxes();
}


const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (Winner) => {
    msg.innerText = `Congratulations the Winner is ${Winner}`;
    msgContainer.classList.remove("hide");
    diableBoxes();
}

const checkWinner = () => {
    for (let pattern of winpatters) {
        let pose1 = boxes[pattern[0]].innerText;
        let pose2 = boxes[pattern[1]].innerText;
        let pose3 = boxes[pattern[2]].innerText;

        if (pose1 != "" && pose2 != "" && pose3 != "") {
            if (pose1 === pose2 && pose2 === pose3) {
                showWinner(pose1);
            }
        }
    }
}

newGamebtn[0].addEventListener("click", resetGame);
resetBtn[0].addEventListener("click", resetGame);
