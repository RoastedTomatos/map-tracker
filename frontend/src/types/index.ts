export type Vector = { x: number; y: number }

export type ObjectData = {
  id: string
  position: Vector
  targetPosition: Vector
  heading: number
  lost?: boolean
  lostAt?: number
  lastUpdated: number
}
