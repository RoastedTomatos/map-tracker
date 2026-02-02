import { randomUUID } from 'crypto'
import type { ServerObject } from '../types/index.js'

const SQUARE = {
  topLeft: { x: 37.0, y: 50.0 },
  topRight: { x: 41.0, y: 50.0 },
  bottomRight: { x: 41.0, y: 48.0 },
  bottomLeft: { x: 37.0, y: 48.0 },
}

const randomPointInSquare = (square: typeof SQUARE) => {
  const x =
    square.topLeft.x + Math.random() * (square.topRight.x - square.topLeft.x)
  const y =
    square.topLeft.y + Math.random() * (square.bottomLeft.y - square.topLeft.y)
  return { x, y }
}

const randomVelocity = () => {
  const speed = 0.01 + Math.random() * 0.02
  const angleDeg = 45 + (Math.random() - 0.5) * 30
  const angleRad = (angleDeg * Math.PI) / 180
  return {
    x: Math.cos(angleRad) * speed,
    y: Math.sin(angleRad) * speed,
  }
}

export const generateObject = (): ServerObject => {
  const velocity = randomVelocity()
  const heading = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI)
  return {
    id: randomUUID(),
    position: randomPointInSquare(SQUARE),
    velocity,
    heading,
  }
}
