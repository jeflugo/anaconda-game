import { snakeOutsideGrid, snakeIntersection } from './snake.js'
import { randomNumber } from './utilities.js'

// Display stuff
export const gameBoard = document.querySelector('.game-board')
export const TILE_SIZE = 30
// Cols and Rows based on the size of the client screen
const W = window.innerWidth
const H = window.innerHeight
export const COLS = Math.round(W / TILE_SIZE)
export const ROWS = Math.round(H / TILE_SIZE)

// Game states
// Game Overlay changed by game states
const gameOverlay = document.querySelector('.game-overlay')
export let gameOver = false
// Game starts standing still
export let gamePaused = true

// Movement
const DIRECTIONS = {
	up: { x: 0, y: -1 },
	right: { x: 1, y: 0 },
	down: { x: 0, y: 1 },
	left: { x: -1, y: 0 },
}
let direction = DIRECTIONS.up
let lastDirection = DIRECTIONS.up
export function detectMovement(keyPressed) {
	if (gamePaused) return
	switch (keyPressed) {
		case 'ArrowUp':
			if (lastDirection.y !== 0) break
			setDirection(DIRECTIONS.up)
			break
		case 'ArrowRight':
			if (lastDirection.x !== 0) break
			setDirection(DIRECTIONS.right)
			break
		case 'ArrowDown':
			if (lastDirection.y !== 0) break
			setDirection(DIRECTIONS.down)

			break
		case 'ArrowLeft':
			if (lastDirection.x !== 0) break
			setDirection(DIRECTIONS.left)
			break
	}
}
function setDirection(newDirection) {
	setTimeout(() => {
		direction = newDirection
		getDirection(direction)
	}, 50)
}
export function getDirection() {
	lastDirection = direction
	return direction
}

// Random position for food
export const randomGridPosition = () => ({
	x: randomNumber(1, COLS),
	y: randomNumber(1, ROWS),
})

//Checks for death
export const checkDeath = () => {
	gameOver = snakeOutsideGrid() || snakeIntersection()
}
export function gameLost() {
	gameBoard.innerHTML = ''
	gameOverlay.style.display = 'flex'
	gameOverlay.innerHTML = '<h1>Game Lost.<br>Press "R" to Restart</h1>'
}

// Checks restarting
export function restart() {
	window.location = '/'
}

// Checks pausing and resuming
export function resumeGame() {
	gameOverlay.style.display = 'none'
	gamePaused = false
}
export function pauseGame() {
	gameOverlay.style.display = 'flex'
	gameOverlay.innerHTML = '<h1>Game paused.<br>Press "Enter"</h1>'
	gamePaused = true
}
