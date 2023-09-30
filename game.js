// Get references to important elements
const hitElement = document.getElementById("hit");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const pbtmContainer = document.getElementById("pbtm");
const gameOverElement = document.getElementById("game-over");
const finalScoreElement = document.getElementById("final-score");
const playAgainButton = document.getElementById("play-again-button");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const endButton = document.getElementById("end-button");

let hitCount = 0;
let score = 0;
let timer = 60;
let isGameRunning = false;
let gameInterval;

// Function to create a random bubble and add it to the pbtmContainer
function createBubble() {
    if (isGameRunning) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        // Randomly position bubbles within the pbtm area
        const leftPosition = Math.random() * (pbtmContainer.clientWidth - 50); // Adjust for bubble width
        const topPosition = Math.random() * (pbtmContainer.clientHeight - 50); // Adjust for bubble height
        bubble.style.left = `${leftPosition}px`;
        bubble.style.top = `${topPosition}px`;

        bubble.addEventListener("click", () => {
            bubble.remove();
            hitCount++;
            score += 10;
            hitElement.innerText = hitCount;
            scoreElement.innerText = score;
        });

        bubble.addEventListener("animationiteration", () => {
            bubble.remove();
        });

        pbtmContainer.appendChild(bubble);
    }
}

// Function to update the timer and end the game when the timer reaches 0
function updateTimer() {
    timerElement.innerText = timer;

    if (timer > 0 && isGameRunning) {
        gameInterval = setTimeout(() => {
            timer--;
            updateTimer();
        }, 1500);
    } else if (isGameRunning) {
        endGame();
    }
}

// Function to start the game
function startGame() {
    isGameRunning = true;
    hitCount = 0;
    score = 0;
    timer = 60;
    hitElement.innerText = hitCount;
    scoreElement.innerText = score;
    timerElement.innerText = timer;

    // Hide the pop-up
    gameOverElement.classList.remove("show-popup");

    pbtmContainer.innerHTML = ""; // Clear existing bubbles

    // Start the timer and bubble creation
    updateTimer();
    createBubble(); // Initial bubble
    gameInterval = setInterval(createBubble, 1500); // Regular bubble generation
}

// Function to pause the game
function pauseGame() {
    isGameRunning = false;
    clearTimeout(gameInterval);
}

// Function to end the game and display the Game Over pop-up
function endGame() {
    isGameRunning = false;
    finalScoreElement.innerText = score;

    // Show the pop-up
    gameOverElement.classList.add("show-popup");
}

// Event listener for the "Play Again" button
playAgainButton.addEventListener("click", () => {
    startGame();

    // Hide the pop-up
    gameOverElement.classList.remove("show-popup");
});

// Event listener for the Start button
startButton.addEventListener("click", () => {
    if (!isGameRunning) {
        startGame();
        if (isPaused) {
            isPaused = false;
            pauseButton.innerText = "Pause";
        }
    }
});
// Event listener for the Pause button
pauseButton.addEventListener("click", pauseGame);

// Event listener for the End button
endButton.addEventListener("click", () => {
    // Display a confirmation popup
    const shouldEndGame = confirm("Do you want to end the game?");
    if (shouldEndGame) {
        endGame();
        if (isPaused) {
            isPaused = false;
            pauseButton.innerText = "Pause";
        }
    }
});
// Start the game when the page loads
// startGame();


// Define a variable to track whether the game is paused or not
let isPaused = false;

// Event listener for the Pause/Resume button
pauseButton.addEventListener("click", () => {
    if (isPaused) {
        // If the game is paused, resume it
        resumeGame();
        isPaused = false;
        pauseButton.innerText = "Pause";
    } else {
        // If the game is not paused, pause it
        pauseGame();
        isPaused = true;
        pauseButton.innerText = "Resume";
    }
});

// Function to pause the game
function pauseGame() {
    isGameRunning = false;
}

// Function to resume the game
function resumeGame() {
    isGameRunning = true;
    // Resume the timer and bubble creation
    updateTimer();
    setInterval(createBubble, 1500);
}