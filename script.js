
let startTime;
let timer;
let gameRunning = false;
let attempts = 0;
let bestScore = localStorage.getItem("bestScore");

document.getElementById("best").innerText =
    bestScore ? bestScore + " ms" : "--";


function startGame(event) {

    // Prevent button click from reaching game area
    if (event) {
        event.stopPropagation();
    }

    const area = document.getElementById("gameArea");
    const message = document.getElementById("message");
    const result = document.getElementById("result");

    attempts++;
    document.getElementById("attempts").innerText = attempts;

    gameRunning = false;

    // RED SCREEN
    area.className = "gameArea waiting";

    message.innerHTML = `
        <div class="emoji">🔴</div>
        <h2>WAIT...</h2>
        <p>DON'T CLICK YET! 👀</p>
    `;

    result.innerText = "";

    let randomTime = Math.floor(Math.random() * 3000) + 2000;

    timer = setTimeout(() => {

        gameRunning = true;
        startTime = Date.now();

        // GREEN SCREEN
        area.className = "gameArea ready";

        message.innerHTML = `
            <div class="emoji">🟢</div>
            <h2>CLICK NOW!!!</h2>
            <p>GO GO GO!!! ⚡</p>
        `;

    }, randomTime);
}


document.getElementById("gameArea").addEventListener("click", function () {

    // Clicked before green
    if (!gameRunning) {

        clearTimeout(timer);

        this.className = "gameArea";

        document.getElementById("message").innerHTML = `
            <div class="emoji">💀</div>
            <h2>TOO EARLY!</h2>
            <p>I literally said WAIT 😭</p>
            <button onclick="startGame(event)">TRY AGAIN</button>
        `;

        return;
    }


    // Calculate reaction time
    let reactionTime = Date.now() - startTime;

    gameRunning = false;

    this.className = "gameArea";

    let comment;

    if (reactionTime < 200) {
        comment = "⚡ HUMAN FLASH!";
    }
    else if (reactionTime < 300) {
        comment = "🔥 THAT WAS FAST!";
    }
    else if (reactionTime < 500) {
        comment = "😎 NOT BAD!";
    }
    else if (reactionTime < 800) {
        comment = "😂 YOUR BRAIN WAS BUFFERING!";
    }
    else {
        comment = "🐢 EVEN A TURTLE IS FASTER!";
    }

    document.getElementById("message").innerHTML = `
        <div class="emoji">🎉</div>
        <h2>${reactionTime} ms</h2>
        <p>${comment}</p>
        <button onclick="startGame(event)">PLAY AGAIN</button>
    `;

    document.getElementById("result").innerText =
        "🏆 Reaction Time: " + reactionTime + " ms";


    if (!bestScore || reactionTime < Number(bestScore)) {

        bestScore = reactionTime;

        localStorage.setItem("bestScore", reactionTime);

        document.getElementById("best").innerText =
            reactionTime + " ms";
    }

});