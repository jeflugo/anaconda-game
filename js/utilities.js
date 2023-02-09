// Get a random number between a min value and a max value
export const randomNumber = (min, max) => Math.floor(Math.random() * max) + min

// Round Element corners
const ROUND_PARAMETER = '15px'
export const roundTopLeftCorner = (element) =>
  (element.style.borderTopLeftRadius = ROUND_PARAMETER)
export const roundTopRightCorner = (element) =>
  (element.style.borderTopRightRadius = ROUND_PARAMETER)
export const roundBottomRightCorner = (element) =>
  (element.style.borderBottomRightRadius = ROUND_PARAMETER)
export const roundBottomLeftCorner = (element) =>
  (element.style.borderBottomLeftRadius = ROUND_PARAMETER)
