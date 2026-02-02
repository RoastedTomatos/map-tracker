import type { ServerObject } from '../types/index.js'

export const moveObject = (object: ServerObject): ServerObject => {
  const NOISE = 0.02

  const vx = object.velocity.x + (Math.random() - 0.5) * NOISE
  const vy = object.velocity.y + (Math.random() - 0.5) * NOISE
  const heading = Math.atan2(vy, vx) * (180 / Math.PI)

  return {
    ...object,
    heading,
    position: {
      x: object.position.x + vx,
      y: object.position.y + vy,
    },
  }
}
