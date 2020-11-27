let allSquares = document.getElementsByClassName('square-cell')
let square = document.querySelector(".square")
let timer = document.querySelector(".timer")
let restart = document.querySelector(".restart")
let level = document.querySelector(".level")

let currentSec = 30;
let timerId = null;
var levelNumber = 1;
var squareCount = 4;

window.onload = function()
{
      NewLevel()
      timerId = setInterval(() => 
      {
          currentSec--;
          timer.textContent = "ОСТАВШЕЕСЯ ВРЕМЯ: " + currentSec + " СЕК"
          if (currentSec === 0)
          {
              clearInterval(timerId);
              level.textContent = "ВЫ ДОШЛИ ДО " + levelNumber + " УРОВНЯ"
              timer.style.display = "none"
              restart.style.display = "block"
              for(j = 0; j < allSquares.length; j++)
                  allSquares[j].onclick = function(){}
            }
        }, 1000)
        restart.onclick = function()
        {
          location.reload()
        }
}

Rand = function(val1, val2)
{
  let ran = Math.random() * (val2 - val1) + val1
  if (ran % 1 > 0.5)
    return Math.floor(ran) + 1
  else
    return Math.floor(ran)
}

RandColor = function()
{
  let red = Rand(0, 255)
  let green = Rand(0, 255)
  let blue = Rand(0, 255)
  return [red, green, blue]
}

NewLevel = function()
{
  let randColor = RandColor()
  let randSquare = Rand(1, squareCount)
  let difference = 100 / levelNumber;
  for (i = 0; i < allSquares.length; i++)
  {
    if (i != randSquare-1)
    {
      allSquares[i].style.backgroundColor = `rgb( ${randColor[0]}, ${randColor[1]}, ${randColor[2]})`
      allSquares[i].onclick = function()
      {
          level.textContent = "ВЫ ДОШЛИ ДО " + levelNumber + " УРОВНЯ"
          clearInterval(timerId);
          timer.style.display = "none"
          restart.style.display = "block"
          for(j = 0; j < allSquares.length; j++)
              allSquares[j].onclick = function(){}
      }
    }
    else
    {
      allSquares[i].style.backgroundColor = `rgb( ${randColor[0] - difference}, ${randColor[1] - difference}, ${randColor[2] - difference})`
      allSquares[i].onclick = function()
      {
          Next()
          NewLevel()
          levelNumber++
          level.textContent = "УРОВЕНЬ: " + levelNumber
      }
    }
  }
}

Next = function()
{
  let rows = document.getElementsByClassName("square-row")
  for (i = 0; i < rows.length; i++)
  {
    let newCell = document.createElement("div")
    newCell.className = "square-cell"
    rows[i].appendChild(newCell)
  }
  let newRow = document.createElement("div")
  newRow.className = "square-row"
  square.appendChild(newRow)
  for (i = 0; i < rows.length; i++)
  {
    let newCell = document.createElement("div")
    newCell.className = "square-cell"
    rows[rows.length-1].appendChild(newCell)
  }
  squareCount = rows.length * rows.length
}