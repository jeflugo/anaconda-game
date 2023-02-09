import { COLS, ROWS, getDirection, gamePaused } from './game.js'
import {
	roundTopLeftCorner,
	roundTopRightCorner,
	roundBottomLeftCorner,
	roundBottomRightCorner,
} from './utilities.js'

// SNAKE DEFINITION
export const SNAKE_SPEED = 5
const SNAKE_SOUND = new Audio('/assets/snake-hissing.mp3')
let snakeDirection = getDirection()
let snakeFoodEaten = 0
// Snake initial State
let snakeHead = { x: Math.round(COLS / 2), y: Math.round(ROWS / 2) }
let snakeBody = [
	snakeHead,
	{ x: snakeHead.x, y: snakeHead.y + 1 },
	{ x: snakeHead.x, y: snakeHead.y + 2 },
	{ x: snakeHead.x, y: snakeHead.y + 3 },
]
let snakeTail = snakeBody[snakeBody.length - 1]
let snakePreTail = snakeBody[snakeBody.length - 2]

export function updateSnake() {
	// Checks if the direction changes
	snakeDirection = getDirection()

	// The snake makes a sound while moving
	if (!gamePaused) SNAKE_SOUND.play()

	// Updates the position of every snake part
	for (let i = snakeBody.length - 2; i >= 0; i--) {
		snakeBody[i + 1] = { ...snakeBody[i] }
	}

	// Update snake head
	snakeHead = snakeBody[0]
	// Update snake tail
	snakeTail = snakeBody[snakeBody.length - 1]
	// Update snake pre tail
	snakePreTail = snakeBody[snakeBody.length - 2]

	// Move the snake
	snakeHead.x += snakeDirection.x
	snakeHead.y += snakeDirection.y
}
export function drawSnake(gameBoard) {
	snakeBody.forEach((snakeSegment, index) => {
		const segmentElement = document.createElement('div')
		segmentElement.style.gridRowStart = snakeSegment.y
		segmentElement.style.gridColumnStart = snakeSegment.x
		segmentElement.className = 'snake'
		if (index === 0) segmentElement.classList.add('snake-head')
		if (index === snakeBody.length - 1)
			segmentElement.classList.add('snake-tail')

		gameBoard.appendChild(segmentElement)
	})

	decorateSnake()
}
export function snakeExpand() {
	snakeFoodEaten++
	snakeBody.push(snakeBody[snakeBody.length - 1])

	// Updates the cows count
	document.querySelector('.cows-count').innerHTML = snakeFoodEaten
}
export const snakeIsOn = (position, { ignoreHead = false } = {}) =>
	snakeBody.some((snakeSegment, index) => {
		if (ignoreHead && index === 0) return false
		return position.x === snakeSegment.x && position.y === snakeSegment.y
	})

export const snakeOutsideGrid = () =>
	snakeHead.x < 1 || snakeHead.x > COLS || snakeHead.y < 1 || snakeHead.y > ROWS

export const snakeIntersection = () =>
	snakeIsOn(snakeHead, { ignoreHead: true })

function decorateSnake() {
	roundSnakeHead()
	roundSnakeTail()
	roundSnakeCorners()
	paintSnake()
}

function roundSnakeHead() {
	const snakeHeadElement = document.querySelector('.snake-head')
	// Round head going up
	if (snakeDirection.y === -1) {
		roundTopLeftCorner(snakeHeadElement)
		roundTopRightCorner(snakeHeadElement)
		return
	}
	// Round head going right
	if (snakeDirection.x === 1) {
		roundTopRightCorner(snakeHeadElement)
		roundBottomRightCorner(snakeHeadElement)
		return
	}
	// Round going down
	if (snakeDirection.y === 1) {
		roundBottomLeftCorner(snakeHeadElement)
		roundBottomRightCorner(snakeHeadElement)
		return
	}
	// Round head going left
	roundTopLeftCorner(snakeHeadElement)
	roundBottomLeftCorner(snakeHeadElement)
}
function roundSnakeTail() {
	const snakeTailElement = document.querySelector('.snake-tail')

	// Round Tail going down
	if (snakeTail.y < snakePreTail.y) {
		roundTopLeftCorner(snakeTailElement)
		roundTopRightCorner(snakeTailElement)
		return
	}
	// Round Tail going left
	if (snakeTail.x > snakePreTail.x) {
		roundTopRightCorner(snakeTailElement)
		roundBottomRightCorner(snakeTailElement)
		return
	}
	// Round going up
	if (snakeTail.y > snakePreTail.y) {
		roundBottomLeftCorner(snakeTailElement)
		roundBottomRightCorner(snakeTailElement)
		return
	}
	// Round Tail going right
	roundTopLeftCorner(snakeTailElement)
	roundBottomLeftCorner(snakeTailElement)
}
function roundSnakeCorners() {
	const snakeElements = document.querySelectorAll('.snake')
	for (let i = 1; i < snakeBody.length - 1; i++) {
		// Round corners clock wise
		if (
			snakeBody[i].y > snakeBody[i - 1].y &&
			snakeBody[i].x < snakeBody[i + 1].x
		) {
			roundBottomLeftCorner(snakeElements[i])
		}
		if (
			snakeBody[i].x < snakeBody[i - 1].x &&
			snakeBody[i].y < snakeBody[i + 1].y
		) {
			roundTopLeftCorner(snakeElements[i])
		}
		if (
			snakeBody[i].y < snakeBody[i - 1].y &&
			snakeBody[i].x > snakeBody[i + 1].x
		) {
			roundTopRightCorner(snakeElements[i])
		}
		if (
			snakeBody[i].x > snakeBody[i - 1].x &&
			snakeBody[i].y > snakeBody[i + 1].y
		) {
			roundBottomRightCorner(snakeElements[i])
		}

		// Round corners clock bakcwards
		if (
			snakeBody[i].y > snakeBody[i + 1].y &&
			snakeBody[i].x < snakeBody[i - 1].x
		) {
			roundBottomLeftCorner(snakeElements[i])
		}
		if (
			snakeBody[i].x < snakeBody[i + 1].x &&
			snakeBody[i].y < snakeBody[i - 1].y
		) {
			roundTopLeftCorner(snakeElements[i])
		}
		if (
			snakeBody[i].y < snakeBody[i + 1].y &&
			snakeBody[i].x > snakeBody[i - 1].x
		) {
			roundTopRightCorner(snakeElements[i])
		}
		if (
			snakeBody[i].x > snakeBody[i + 1].x &&
			snakeBody[i].y > snakeBody[i - 1].y
		) {
			roundBottomRightCorner(snakeElements[i])
		}
	}
}
function paintSnake() {
	const snakeElements = document.querySelectorAll('.snake')
	snakeElements.forEach((snakeSegmentElement, index) => {
		if (index % 2 !== 0)
			snakeSegmentElement.style.backgroundColor = ' rgb(0, 208, 0)'
	})
}
