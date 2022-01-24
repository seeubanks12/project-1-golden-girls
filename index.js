//Instead of adding the canvas tag directly to HTML, we can add it from the JS file. Need to add canvas
//and specify the width, height, context, and insert the JS into the body tag of HTML

//add an obstavle array to store all of our obstacles
const myObstacles = [];

const myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 1000;
    this.canvas.height = 700;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    //below will call updateGame() function every 20 miliseconds
    this.interval = setInterval(updateGameArea, 20);
  },

  //when updating a canvas, we have to clear it before starting the new draw.
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

//component for the PLAYER element, so we are going to need a component CLASS. For creating a compoent
// we need parameters such as width, height, color, and the X and Y position to print it on the canvas
class Component {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = 475;
    this.y = 600;
    //our player is created. to make it move, add speedX and speedY into the component properties
    this.speedX = 0;
    this.speedY = 0;
  }

  update() {
    const ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  //this method will use the speed properties to change the position
  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

//Add up, down, right, and left (this uses "keycode" instead of e.code
document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 38:
      player.speedY -= 1;
      break;
    case 40:
      player.speedY += 1;
      break;
    case 37:
      player.speedX -= 1;
      break;
    case 39:
      player.speedX += 1;
      break;
  }
});

//added a "key up" function to stop the player moving when we aren't pressing a key
document.addEventListener("keyup", (e) => {
  player.speedX = 0;
  player.speedY = 0;
});

//this is where we create our PLAYER element. In a variable name player, we are going to CALL the
//component class to create it. Remember we need to send the width, height, color, and x, y coordinates
//for the element.

const player = new Component(75, 75, "#ff1ac6", 0, 110);

// class Obstacle {
//     constructor() {
//       this.x = Math.random() * canvas.width;
//       this.y = 0;
//       this.w = 25;
//       this.h = 25;
//     }

//     move() {
//       this.y = this.y + 5;
//     }
//   }

//   const ob1 = new Obstacle();
//   const obstacleArr = [];
//   obstacleArr.push(ob1);

//   function createObj() {
//       obstacleArr.push(newObstacle());
//   }

//create the obstacles function
function updateObstacles() {
  myGameArea.frames + 1; //every time we call updateGameArea() we will add 1 to our frames variable
  if (myGameArea.frames % 120 === 0) {
    //this condition will determine how many updates we create with new obstacles. We set every 120 updates, that means every 2.4 seconds, because we call the updateGameArea function every 20 miliseconds
    let x = myGameArea.canvas.width; //we set he coordinates of our new obstacles acording to the canvas width
    let minHeight = 20;
    let maxHeight = 200;
    let height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    ); //we set the minHeight to 20 and the maxHeight to 200. So in this line we are getting a random value for our obstacle height, and it will ablways be 20 < height < 200
    let minGap = 50;
    let maxGap = 200;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new Component(10, height, "green", x, 0));
    myObstacles.push(
      new Component(10, x - height - gap, "green", x, height + gap)
    );
  }
}

//add the new updateGameAreaw function. It will call the game area's clear() method and the PLAYER
//object's update() method
function updateGameArea() {
  myGameArea.clear();
  //update the players position before drawing
  player.newPos();
  player.update();
  //call a new function for the obstacles
  updateObstacles();
}

//to see the IMMOBILE red player on the screen, we have to call the game area's start() method

myGameArea.start();
