{% load static %}

//settings
var snakeP1X = 2;
var snakeP1Y = 2;
var snakeP2X = 36;
var snakeP2Y = 36;
var rocketP1X;
var rocketP1Y;
var rocketP2X;
var rocketP2Y;
var height = 40;
var width = 40;
var interval = 100;
var incrementTail = 12;
var incrementScore = 1;

//game Variables
var scoreP1 = 0;
var scoreP2 = 0;
var lengthP1 = 5;
var lengthP2 = 5;
var tailP1X = [snakeP1X];
var tailP1Y = [snakeP1Y];
var tailP2X = [snakeP2X];
var tailP2Y = [snakeP2Y];
var fX;
var fY;
var pX;
var pY;
var running = false;
var gameOver = false;
var directionP1 = -1;        // down = -1, up = 0, left = 1, right = 2
var directionP2 = 0;       // down = -1, up = 0, left = 1, right = 2
var fireP1 = 0;            // rocket = 0,
var fireP2 = 0;            //rocket = 0,
var powerUpP1 = false;     //if player starts with a power set true
var powerUpP2 = false;
var int;                   // interval to stop the game loop

/*
the entry point of the game
*/
function run() {
  init();
  int = setInterval(gameLoop, interval);
}

function init() {
  createMap();
  createSnake();
  createFruit();
}
/*
generate the map for the snake
*/

function createMap() {
  document.write("<table>")

  for (var y = 0; y < height; y++){
    document.write("<tr>");
    for (var x = 0; x < width; x++){
      if(x==0 || x == width -1 || y == 0 || y == height -1){
        document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");
      }else{
        document.write("<td class='blank' id='"+ x + "-" + y +"'></td>");
      }
    }
    document.write("</tr>");
  }

  document.write("</table>");
}


function createSnake() {
  set(snakeP1X, snakeP1Y, "snakeP1");
  set(snakeP2X, snakeP2Y, "snakeP2");
}

function get(x,y){
  return document.getElementById(x+"-"+y);
}

function set(x,y,value){
  if (x != null && y != null)
    get(x,y).setAttribute("class", value);
}

function rand(min,max){
  return Math.floor(Math.random() * (max - min) + min);
}

function getType(x,y){
  return get(x,y).getAttribute("class");

}
function fireRocket(){
  var hit = false

}
function spawnPowerUp(){

}
function createFruit(){
  var found = false;
  while ((!found && (lengthP1 < (width - 2) * (height - 2) + 1)) && (!found && (lengthP2 < (width - 2) * (height - 2) + 1))){
    var fruitX = rand(1, width -1);
    var fruitY = rand(1, height -1);
    if (getType(fruitX,fruitY) == "blank")
      found = true;
    }
    set(fruitX, fruitY, "fruit");
    fX = fruitX;
    fY = fruitY;
  }

window.addEventListener("keydown", function key(){
  var key = event.keyCode;
  //if key = w set directionP1 up
  if (directionP1 != -1 && (key == 119 || key == 87))
    directionP1 = 0;
  // if key = s set directionP1 down
  else if (directionP1 != 0 && (key == 83 || key == 115))
    directionP1 = -1;
  // if key = a set directionP1 left
  else if (directionP1 != 2 && (key == 65 || key == 97))
    directionP1 = 1;
  // if key = d set directionP1 right
  else if (directionP1 != 1 && (key == 68 || key == 100))
    directionP1 = 2;

  //if key = arrowUp set directionP2 up
  if (directionP2 != -1 && (key == 38))
    directionP2 = 0;
  // if key = arrowDown set directionP2 down
  else if (directionP2 != 0 && (key == 40))
    directionP2 = -1;
  // if key = arrowLeft set directionP2 left
  else if (directionP2 != 2 && (key == 37))
    directionP2 = 1;
  // if key = arrowRight set directionP2 right
  else if (directionP2 != 1 && (key == 39))
    directionP2 = 2;

  if (!running)
    running = true;
  else if(key == 32)
    running = false;


});
function gameLoop(){
  if (running && !gameOver){
    update();
  } else if(gameOver){
    clearInterval(int);
  }
}

function update(){
  set(fX, fY, "fruit");
  updateTail();
  set(tailP1X[lengthP1], tailP1Y[lengthP1], "blank");
  set(tailP2X[lengthP2], tailP2Y[lengthP2], "blank");
  if (directionP1 == 0)
    snakeP1Y--;
  else if (directionP1 == -1)
    snakeP1Y++;
  else if (directionP1 == 1)
    snakeP1X--;
  else if (directionP1 == 2)
    snakeP1X++;
  if (directionP2 == 0)
    snakeP2Y--;
  else if (directionP2 == -1)
    snakeP2Y++;
  else if (directionP2 == 1)
    snakeP2X--;
  else if (directionP2 == 2)
    snakeP2X++;

  set(snakeP1X,snakeP1Y,"snakeP1");
  for(var i = tailP1X.length -1; i >=0; i--){
    if((snakeP1X == tailP1X[i] && snakeP1Y == tailP1Y[i]) || (snakeP2X == tailP1X[i] && snakeP2Y == tailP1Y[i])){
      gameOver = true;
      console.log("gameover");
      break;
    }
  }
  set(snakeP2X,snakeP2Y, "snakeP2");
  for(var o = tailP2X.length -1; o >=0; o--){
    if((snakeP2X == tailP2X[o] && snakeP2Y == tailP2Y[o])|| (snakeP1X == tailP2X[o] && snakeP1Y == tailP2Y[o])){
      gameOver = true;
      console.log("gameOver");
      break;
    }
  }

  if (snakeP1X == 0 || snakeP1X == width -1 || snakeP1Y == 0 || snakeP1Y == height -1){
    gameOver = true;
    console.log("gameover");
  }
  else if (snakeP1X == fX && snakeP1Y == fY){
    scoreP1 += incrementScore;
    createFruit();
    lengthP1 += incrementTail;
  }
  if (snakeP2X == 0 || snakeP2X == width -1 || snakeP2Y == 0 || snakeP2Y == height -1){
    gameOver = true;
    console.log("gameover");
  }
  else if (snakeP2X == fX && snakeP2Y == fY){
    scoreP2 += incrementScore;
    createFruit();
    lengthP2 += incrementTail;
  }

  document.getElementById("scoreP1").innerHTML = scoreP1;
  document.getElementById("scoreP2").innerHTML = scoreP2;

}


function updateTail(){
  for(var i = lengthP1; i > 0; i--){
    tailP1X[i] = tailP1X[i -1];
    tailP1Y[i] = tailP1Y[i -1];
  }
  for(var o = lengthP2; o > 0; o--){
    tailP2X[o] = tailP2X[o -1];
    tailP2Y[o] = tailP2Y[o -1];
  }
  tailP1X[0] = snakeP1X;
  tailP1Y[0] = snakeP1Y;

  tailP2X[0] = snakeP2X;
  tailP2Y[0] = snakeP2Y;
}

run();
