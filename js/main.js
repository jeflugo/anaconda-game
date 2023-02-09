import { drawSnake, SNAKE_SPEED, updateSnake } from './snake.js'
import { drawFood, updateFood } from './food.js'
import {
  COLS,
  ROWS,
  gameBoard,
  detectMovement,
  gameOver,
  checkDeath,
  restart,
  resumeGame,
  pauseGame,
  gamePaused,
  gameLost,
} from './game.js'

let lastRenderTime = 0
function main(currentTime) {
  if (gameOver) {
    gameLost()
    return
  }

  window.requestAnimationFrame(main)

  if (gamePaused) return

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000

  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

  lastRenderTime = currentTime

  update()
  draw()
}

function update() {
  updateFood()
  updateSnake()
  checkDeath()
}
function draw() {
  // We erase the board everytime we draw
  gameBoard.innerHTML = ''

  drawFood(gameBoard)
  drawSnake(gameBoard)
}

// Initial function
function init() {
  // Displays the columns and rows for the game board
  gameBoard.style.gridTemplateColumns = `repeat(${COLS},1fr)`
  gameBoard.style.gridTemplateRows = `repeat(${ROWS},1fr)`

  // Draws everything for the first time
  update()
  draw()

  // Starts render Loop
  window.requestAnimationFrame(main)

  // Checks for movement
  document.addEventListener('keydown', (e) => detectMovement(e.key))

  // Checks for restarting and pausing
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'r':
      case 'R':
        restart()
        break
      case 'Enter':
        if (gameOver) break
        if (gamePaused) {
          resumeGame()
          break
        }
        pauseGame()
        break
    }
  })
}

// Everything starts when the page is loaded
window.addEventListener('load', init)
