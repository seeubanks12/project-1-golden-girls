window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  function sound(src) {
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

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let isGameOn = false;

  //   let health = 3;
  let obstacleId = 0;
  let rescueId = 0;
  let mySound;

  const logo = new Image();
  logo.src = "./images/game-logo.png";
  logo.onload = () => {
    ctx.drawImage(logo, 10, 0, 300, 150);
  };

  const betty = new Image();
  betty.src = "./images/betty.png";
  betty.onload = () => {
    ctx.drawImage(betty, canvas.width / 2, canvas.height - 100, 100, 100);
  };

  const cat = new Image();
  cat.src = "./images/angry.png";
  cat.onload = () => {
    // ctx.drawImage(cat, canvas.width / 2, canvas.height - 100, 50, 50);
  };

  const dog = new Image();
  dog.src = "./images/dog.png";
  dog.onload = () => {
    // ctx.drawImage(dog, canvas.width / 2, canvas.height - 100, 50, 50);
  };

  const mouse = new Image();
  mouse.src = "./images/mouse.png";
  mouse.onload = () => {
    // ctx.drawImage(dog, canvas.width / 2, canvas.height - 100, 50, 50);
  };

  const pig = new Image();
  pig.src = "./images/pig.png";
  pig.onload = () => {
    // ctx.drawImage(dog, canvas.width / 2, canvas.height - 100, 50, 50);
  };

  class Component {
    constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height - 100;
      this.w = 100;
      this.h = 100;
      this.image = betty;
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
      //   this.deduct = this.deductPoints();
    }

    // deductPoints = () => {
    //   return Math.floor(Math.random() * 2) - 1;
    // };

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
      //   this.points = this.generatePoints();
    }

    generateAnimals = () => {
      let animalArr = [dog, mouse, pig];
      let x = Math.floor(Math.random() * animalArr.length);
      return animalArr[x];
    };

    // generatePoints = () => {
    //   return score + 1;
    // };

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

  function startGame() {
    score += 10;
    if (!isGameOn) {
      isGameOn = true;
      setInterval(createObj, 800);
      setInterval(createObj2, 800);
      animate();
    } else {
    }
    mySound = new sound("theme-song .mp3");
  }

  function animate() {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(rose.image, rose.x, rose.y, rose.w, rose.h);
    ctx.fillStyle = "white";
    ctx.font = "20px Ariel";
    ctx.fillText(`Score: ${score}`, 650, 35);

    for (let i = 0; i < obstacleArr.length; i++) {
      // ctx.drawImage(angryCat.image, angryCat.x, angryCat.y, angryCat.w, angryCat.h);
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

    if (didCollide) {
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
    // document.querySelector("points").innerText = score;
    // document.querySelector("health").innerText = health;
  }

  function detectCollision(player, obj) {
    if (
      player.x < obj.x + obj.w &&
      player.x + player.w > obj.x &&
      player.y < obj.y + obj.h &&
      player.y + player.h > obj.y
    ) {
      return true;
    }
  }
};
