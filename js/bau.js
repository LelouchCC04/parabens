document.addEventListener("DOMContentLoaded", () => {
    const dino = document.getElementById("dino");
    const cactus = document.getElementById("cactus");
    const scoreDisplay = document.getElementById("score");
    const congratulations = document.getElementById("congratulations");
    const restartButton = document.getElementById("restart");

    let isJumping = false;
    let score = 0;
    let cactusPosition = 800; // Posição inicial do cacto
    let gameOver = false;

    // Função para o pulo do dinossauro
    function jump() {
        if (isJumping) return;

        isJumping = true;
        let position = 0;

        const upInterval = setInterval(() => {
            if (position >= 150) {
                clearInterval(upInterval);
                const downInterval = setInterval(() => {
                    if (position <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                    }
                    position -= 5;
                    dino.style.bottom = position + "px";
                }, 20);
            }
            position += 5;
            dino.style.bottom = position + "px";
        }, 20);
    }

    // Função para movimentar o cacto e verificar colisão
    function moveCactus() {
        if (gameOver) return;

        cactusPosition -= 10;

        // Reinicia o cacto quando ele sai da tela
        if (cactusPosition < -20) {
            cactusPosition = 800;
            score += 10;
            scoreDisplay.textContent = `Pontuação: ${score}`;
        }

        // Verifica colisão
        if (
            cactusPosition > 20 &&
            cactusPosition < 70 &&
            parseInt(window.getComputedStyle(dino).bottom) < 50
        ) {
            gameOver = true;
            clearInterval(gameLoop);
            alert("Game Over!");
            location.reload();
        }

        // Atualiza a posição do cacto
        cactus.style.left = cactusPosition + "px";

        // Checa a pontuação para exibir parabéns
        if (score >= 1000 && !gameOver) {
            gameOver = true;
            cactus.style.display = "none";
            congratulations.style.display = "block";
        }
    }

    // Evento de toque na tela para pular
    document.addEventListener("touchstart", jump);

    // Reiniciar o jogo
    restartButton.addEventListener("click", () => {
        location.reload();
    });

    // Loop principal do jogo
    const gameLoop = setInterval(moveCactus, 50);
});
