window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let isGameOn = false;

  const betty = new Image();
  betty.src = "./images/betty.png";
  betty.onload = () => {
    ctx.drawImage(betty, canvas.width / 2, canvas.height - 50 - 100, 200, 200);
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

  //   const mouse = new Image();
  //   mouse.src = "./images/mouse.png";
  //   mouse.onload = () => {
  //     // ctx.drawImage(dog, canvas.width / 2, canvas.height - 100, 50, 50);
  //   };

  //   const pig = new Image();
  //   pig.src = "./images/pig.png";
  //   pig.onload = () => {
  //     // ctx.drawImage(dog, canvas.width / 2, canvas.height - 100, 50, 50);
  //   };

  class Component {
    constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height - 150;
      this.w = 200;
      this.h = 200;
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
    }

    move() {
      this.y = this.y + 4;
    }
  }

  class Points {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = 0;
      this.w = 50;
      this.h = 50;
      this.image = dog;
    }

    // generateAnimals = () => {
    //   let animalArr = [dog.src, mouse.src, pig.src];
    //   let x = Math.floor(Math.random() * animalArr.length);
    //   return animalArr[x];
    // };

    move() {
      this.y = this.y + 4;
    }
  }

  const rose = new Component();

  const obstacleArr = [];

  const pointsArr = [];

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
    obstacleArr.push(new Obstacle());
  }

  function createObj2() {
    pointsArr.push(new Points());
  }

  let score;

  function startGame() {
    score = 0;
    if (!isGameOn) {
      isGameOn = true;
      setInterval(createObj, 800);
      setInterval(createObj2, 800);
      animate();
    } else {
      console.log("Game is already running");
    }
  }

  let game;

  function animate() {
    game = window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(rose.image, rose.x, rose.y, rose.w, rose.h);
    score++;
    ctx.fillText(`Score: ${score}`, 10, 10);

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
      //   didCollide = detectCollision(rose, obstacleArr);
    }

    for (let i = 0; i < pointsArr.length; i++) {
      pointsArr[i].move();
      ctx.drawImage(
        pointsArr[i].image,
        pointsArr[i].x,
        pointsArr[i].y,
        pointsArr[i].w,
        pointsArr[i].h
      );
    }
  }
};

// function detectCollision(player, obj) {
//   if (
//     player.x < obj.x + obj.w &&
//     player.x + player.w > obj.x &&
//     player.y < obj.y + obj.h &&
//     player.y + player.h > obj.y
//   ) {
//     obstacleArr = obstacleArr.filter(function (e) {
//       return e.id !== obj.id;
//     });
//   }
