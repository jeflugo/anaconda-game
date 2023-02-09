import { TILE_SIZE, randomGridPosition } from './game.js'
import { snakeExpand, snakeIsOn } from './snake.js'

const FOOD_IMG_SRC = '/assets/cow.png'
const FOOD_EATEN_SOUND = new Audio('/assets/swallow.mp3')
let foodPosition = randomFoodPosition()

export function updateFood() {
  if (!snakeIsOn(foodPosition)) return
  snakeExpand()
  FOOD_EATEN_SOUND.play()
  foodPosition = randomFoodPosition()
}
export function drawFood(gameBoard) {
  const foodElement = document.createElement('img')
  foodElement.style.gridRowStart = foodPosition.y
  foodElement.style.gridColumnStart = foodPosition.x
  foodElement.style.width = `${TILE_SIZE - 3}px`
  foodElement.src = FOOD_IMG_SRC
  foodElement.className = 'food'

  gameBoard.appendChild(foodElement)
}

export function randomFoodPosition() {
  let newPosition
  do {
    newPosition = randomGridPosition()
  } while (snakeIsOn(newPosition))
  return newPosition
}
