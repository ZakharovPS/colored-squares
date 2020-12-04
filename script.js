let allSquares = document.getElementsByClassName("square-cell")
let square = document.querySelector(".square")
let timer = document.querySelector(".timer")
let restart = document.querySelector(".restart")
let bot = document.querySelector(".bot")
let level = document.querySelector(".level")

let currentSec = 30;
let timerId = null;
let levelNumber = 1;
let squaresCountInRow = 2;


window.onload = function () {
  NewLevel()
  timerId = setInterval(() => {
    currentSec--;
    timer.textContent = "ОСТАВШЕЕСЯ ВРЕМЯ: " + currentSec + " СЕК"
    if (currentSec === 0) {
      clearInterval(timerId);
      level.textContent = "ВЫ ДОШЛИ ДО " + levelNumber + " УРОВНЯ"
      timer.style.display = "none"
      bot.style.display = "none"
      restart.style.display = "block"
      for (j = 0; j < allSquares.length; j++)
        allSquares[j].onclick = function () { }
    }
  }, 1000)
  restart.onclick = function () {
    location.reload()
  }
  bot.onclick = function () {
    findUniqueSquare()
  }
}

Rand = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

RandColor = function () {
  let red = Rand(100, 255)
  let green = Rand(100, 255)
  let blue = Rand(100, 255)
  return [red, green, blue]
}

NewLevel = function () {
  let squareCount = square.childElementCount;
  for (var i = 0; i < squareCount; i++)
    square.removeChild(square.firstElementChild);
  let randColor = RandColor()
  let randSquare = Rand(1, squareCount)
  let difference = 100 / levelNumber;
  for (var i = 0; i < squaresCountInRow * squaresCountInRow; i++) {
    var oneSquare = document.createElement("div");
    oneSquare.className = "square-cell";
    var squareSize = 500 / squaresCountInRow - 2;
    oneSquare.style.margin = `1px`;
    oneSquare.style.width = `${squareSize}px`;
    oneSquare.style.height = `${squareSize}px`;
    if (i != randSquare - 1) {
      oneSquare.style.backgroundColor = `rgb( ${randColor[0]}, ${randColor[1]}, ${randColor[2]})`
      oneSquare.onclick = endGame
    }
    else {
      oneSquare.style.backgroundColor = `rgb( ${randColor[0] - difference}, ${randColor[1] - difference}, ${randColor[2] - difference})`
      oneSquare.onclick = continuationGame
    }
    square.append(oneSquare);
  }
  squaresCountInRow++
}

continuationGame = function () {
  NewLevel()
  levelNumber++
  level.textContent = "УРОВЕНЬ: " + levelNumber
}

endGame = function () {
  level.textContent = "ВЫ ДОШЛИ ДО " + levelNumber + " УРОВНЯ"
  clearInterval(timerId);
  timer.style.display = "none"
  bot.style.display = "none"
  restart.style.display = "block"
  for (j = 0; j < allSquares.length; j++)
    allSquares[j].onclick = function () { }
}

AddSquares = function () {
}

findUniqueSquare = function () {
  let curColor
  if (allSquares[0].style.backgroundColor == allSquares[1].style.backgroundColor) {
    curColor = allSquares[0].style.backgroundColor
  }
  else {
    if (allSquares[0].style.backgroundColor == allSquares[2].style.backgroundColor) {
      allSquares[1].onclick()
      return
    }
    else {
      allSquares[0].onclick()
      return
    }
  }
  for (i = 0; i < allSquares.length; i++) {
    if (allSquares[i].style.backgroundColor != curColor) {
      allSquares[i].onclick()
      return
    }
  }
}