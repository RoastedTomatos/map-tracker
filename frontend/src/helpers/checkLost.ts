import { ObjectData } from '../types'

const LOST_TIMEOUT = 5000

export const checkLost = (objects: ObjectData[]) => {
  const now = Date.now()

  objects.forEach((obj) => {
    if (!obj.lost && now - obj.lastUpdated > LOST_TIMEOUT) {
      obj.lost = true
      obj.lostAt = now
    }
  })
}
