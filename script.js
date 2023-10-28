var blockSize = 25; // 크기
var total_row = 17; // 맵 크기
var total_col = 17;
var board;
var context;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var speedX = 0;
var speedY = 0;

var snakeBody = [];

var foodX;
var foodY;

var gameOver = false;

var totalFoodEaten = 0;

var alertedGameOver = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 100); // 속도 설정
}

function update() {

    context.fillStyle = "darkgreen";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        totalFoodEaten++;
        updateScore();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "aqua";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 
        || snakeX >= total_col * blockSize 
        || snakeY < 0 
        || snakeY >= total_row * blockSize) {
        gameOver = true;
        if (!alertedGameOver) {
            alert(totalFoodEaten + " 점");
            alertedGameOver = true;
        }
        return;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            if (!alertedGameOver) {
                alert(totalFoodEaten + " 점");
                alertedGameOver = true;
            }
        }
    }
}

function changeDirection(e) {
    if ((e.code == "ArrowUp" || e.key == "w") && speedY != 1) {
        speedX = 0;
        speedY = -1;
    } else if ((e.code == "ArrowDown" || e.key == "s") && speedY != -1) {
        speedX = 0;
        speedY = 1;
    } else if ((e.code == "ArrowLeft" || e.key == "a") && speedX != 1) {
        speedX = -1;
        speedY = 0;
    } else if ((e.code == "ArrowRight" || e.key == "d") && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * total_col) * blockSize;
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}

function updateScore() {
    document.getElementById("score").textContent = " " + totalFoodEaten;
}

