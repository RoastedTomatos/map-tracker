import { objectsStore } from '../store/objectsStore.js'
import { generateObject } from './generator.js'
import { moveObject } from './mover.js'

const TICK_MS = 1000
const INITIAL_OBJECTS = 80
const MAX_OBJECTS = 200
const MIN_LIFETIME = 5000
const MAX_LIFETIME = 300000

export function startWorld() {
  for (let i = 0; i < INITIAL_OBJECTS; i++) {
    const obj = generateObject()
    objectsStore.set(obj)

    const lifetime =
      MIN_LIFETIME + Math.random() * (MAX_LIFETIME - MIN_LIFETIME)
    setTimeout(() => {
      objectsStore.remove(obj.id)
    }, lifetime)
  }

  setInterval(() => {
    if (objectsStore.size() < MAX_OBJECTS && Math.random() < 0.25) {
      const obj = generateObject()
      objectsStore.set(obj)
      const lifetime =
        MIN_LIFETIME + Math.random() * (MAX_LIFETIME - MIN_LIFETIME)
      setTimeout(() => {
        console.log('Object removed: ', obj.id)
        objectsStore.remove(obj.id)
      }, lifetime)
    }

    for (const obj of objectsStore.getAll()) {
      const moved = moveObject(obj)
      objectsStore.set(moved)
    }
  }, TICK_MS)
}
