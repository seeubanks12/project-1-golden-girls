window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function updatePoints(newPoints) {
    document.querySelector("span").innerText = newPoints;
  }

  //Audio Class
  class sound {
    constructor(src) {
      this.sound = document.createElement("audio");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      document.body.appendChild(this.sound);
      this.play = function () {
        this.sound.play();
      };
      this.stop = function () {
        this.sound.pause();
      };
    }
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let isGameOn = false;
  canvas.width = 800;
  canvas.height = 600;

  //Global Variables
  let obstacleId = 0;
  let rescueId = 0;


//Game Images
  const logo = new Image();
  logo.src = "images/game-logo.png";
  logo.onload = () => {
    ctx.drawImage(logo, 0, -150, 800, 550);
  };

  const betty = new Image();
  betty.src = "images/betty.png";
  betty.onload = () => {
    ctx.drawImage(betty, canvas.width - 500, canvas.height - 400, 200, 200);
  };

  const cat = new Image();
  cat.src = "images/angry.png";
  cat.onload = () => {
  };

  const dog = new Image();
  dog.src = "images/dog.png";
  dog.onload = () => {
  };

  const mouse = new Image();
  mouse.src = "images/mouse.png";
  mouse.onload = () => {
  };

  const pig = new Image();
  pig.src = "images/pig.png";
  pig.onload = () => {
  };

  //Classes
  class Component {
    constructor() {
      this.x = canvas.width - 450;
      this.y = 500;
      this.w = 100;
      this.h = 100;
      this.image = betty;
      this.points = 0;
    }

    move(direction) {
      switch (direction) {
        case "ArrowLeft":
          this.x -= 15;
          break;
        case "ArrowRight":
          this.x += 15;
          break;
        case "ArrowUp":
          this.y -= 15;
          break;
        case "ArrowDown":
          this.y += 15;
          break;
      }
    }
  }

  class Obstacle {
    constructor(id) {
      this.x = Math.random() * canvas.width;
      this.y = 0;
      this.w = 50;
      this.h = 50;
      this.id = id;
      this.image = cat;
      this.pointValue = -10;
    }

    move() {
      this.y = this.y + 4;
    }
  }

  class Rescue {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = 0;
      this.w = 50;
      this.h = 50;
      this.image = this.generateAnimals();
      this.pointValue = 10;

    }

    generateAnimals = () => {
      let animalArr = [dog, mouse, pig];
      let x = Math.floor(Math.random() * animalArr.length);
      return animalArr[x];
    };

    move() {
      this.y = this.y + 4;
    }
  }

  const rose = new Component();

  let obstacleArr = [];

  let rescueArr = [];

  //Movements

  document.addEventListener("keydown", function (e) {
    switch (e.code) {
      case "ArrowLeft":
        rose.move("ArrowLeft");
        break;
      case "ArrowRight":
        rose.move("ArrowRight");
        break;
      case "ArrowUp":
        rose.move("ArrowUp");
        break;
      case "ArrowDown":
        rose.move("ArrowDown");
        break;
    }
  });

  function createObj() {
    obstacleArr.push(new Obstacle(obstacleId));
    obstacleId++;
  }

  function createObj2() {
    rescueArr.push(new Rescue(rescueId));
    rescueId++;
  }

  let score;
  let game;

  let mySound = new sound("theme-song.mp3");

  function startGame() {
    myMusic = new sound("theme-song.mp3");
    mySound.play();
    score += 10;
    if (!isGameOn) {
      isGameOn = true;
      setInterval(createObj, 800);
      setInterval(createObj2, 800);
      setTimeout(gameOver, 41500);
      animate();
    }

    function animate() {
      game = window.requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(rose.image, rose.x, rose.y, rose.w, rose.h);

      for (let i = 0; i < obstacleArr.length; i++) {
        obstacleArr[i].move();

        ctx.drawImage(
          obstacleArr[i].image,
          obstacleArr[i].x,
          obstacleArr[i].y,
          obstacleArr[i].w,
          obstacleArr[i].h
        );
        didCollide = detectCollision(rose, obstacleArr[i]);
        if (didCollide) {
          obstacleArr = obstacleArr.filter(function (e) {
            return e.id !== obstacleArr[i].id;
          });
        }
      }

      for (let i = 0; i < rescueArr.length; i++) {
        rescueArr[i].move();
        ctx.drawImage(
          rescueArr[i].image,
          rescueArr[i].x,
          rescueArr[i].y,
          rescueArr[i].w,
          rescueArr[i].h
        );

        didCollide = detectCollision(rose, rescueArr[i]);
        if (didCollide) {
          rescueArr.splice(i, 1);
        }
      }
    }

    function gameOver() {
      mySound.stop();
      window.cancelAnimationFrame(game);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0e4d29";
      ctx.font = "50px copperplate";
      ctx.fillText(`TIME'S UP!`, 275, 125);
      ctx.fillStyle = "white";
      ctx.font = "25px copperplate";
      ctx.fillText(
        "Click the STARTGAME button to rescue more animals!",
        45,
        250
      );
      isGameOn = false;
      document.getElementById("start-button").onclick = () => {
        startGame();
      };
    }

    rose.points = 0;

    function detectCollision(player, obj) {
      if (
        player.x < obj.x + obj.w &&
        player.x + player.w > obj.x &&
        player.y < obj.y + obj.h &&
        player.y + player.h > obj.y
      ) {
        //Update the player points
        player.points += obj.pointValue;

        //Show the updated points on the screen
        updatePoints(player.points);

        return true;
      }
    }
  }
};
