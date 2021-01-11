window.onload = function () {
  let stage = document.getElementById("stage");
  let ctx = stage.getContext("2d");
  document.addEventListener("keydown", keyPush);

  setInterval(game, 90);

  const vel = 1;

  //Velocidade de movimento vx - vy
  let speedX = (speedY = 0);

  //Posição da peças px - py
  let posX = (posY = 10);

  //Tamanho da peça tp
  let snakeSize = 20;

  //Quantidade das peças qp
  let sPieces = 25;

  //Posição Maçã ax - ay
  let appleX = (appleY = 15);

  //Rastro
  let trail = [];

  //Cauda
  let tail = 1;

  function game() {
    posX += speedX;
    posY += speedY;

    // Controla o limite das bordas
    if (posX < 0) {
      posX = sPieces - 1;
    }

    if (posX > sPieces) {
      posX = 0;
    }

    if (posY < 0) {
      posY = sPieces - 1;
    }

    if (posY > sPieces) {
      posY = 0;
    }

    //Controle da cor background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, stage.width, stage.height);

    //Controle da cor da maçã
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * snakeSize, appleY * snakeSize, snakeSize, snakeSize);

    //Controle da snake
    ctx.fillStyle = "blue";

    for (let i = 0; i < trail.length; i++) {
      ctx.fillRect(
        trail[i].x * snakeSize,
        trail[i].y * snakeSize,
        snakeSize - 1,
        snakeSize - 1
      );

      if (trail[i].x == posX && trail[i].y == posY) {
        speedX = speedY = 0;
        tail = 1;
      }
    }

    trail.push({ x: posX, y: posY });

    while (trail.length > tail) {
      trail.shift();
    }

    if (appleX == posX && appleY == posY) {
      tail++;
      appleX = Math.floor(Math.random() * sPieces);
      appleY = Math.floor(Math.random() * sPieces);
    }
  }

  function keyPush(event) {
    switch (event.keyCode) {
      case 37: //Left
        speedX = -vel;
        speedY = 0;
        break;

      case 38: //Up
        speedX = 0;
        speedY = -vel;
        break;

      case 39: //Right
        speedX = vel;
        speedY = 0;
        break;

      case 40: //Down
        speedX = 0;
        speedY = vel;
        break;
    }
  }
};
