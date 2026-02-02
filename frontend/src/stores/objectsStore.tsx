import { makeAutoObservable } from 'mobx'
import { ObjectData } from '../types'

export const createObjectsStore = () => {
  const store = {
    objects: new Map<string, ObjectData>(),

    setObjects(list: ObjectData[]) {
      const now = Date.now()
      const receivedIds = new Set(list.map((o) => o.id))

      console.log(`\n[setObjects] Received ${list.length} objects`)

      list.forEach((obj) => {
        const existing = store.objects.get(obj.id)
        if (existing) {
          console.log(`[setObjects] Updating object ${obj.id}`)
          existing.targetPosition = obj.position
          existing.heading = obj.heading
          existing.lost = false
          delete existing.lostAt
          existing.lastUpdated = now
        } else {
          console.log(`[setObjects] Adding new object ${obj.id}`)
          store.objects.set(obj.id, {
            ...obj,
            position: { ...obj.position },
            targetPosition: { ...obj.position },
            lastUpdated: now,
          })
        }
      })

      store.objects.forEach((obj) => {
        if (!receivedIds.has(obj.id) && !obj.lost) {
          console.warn(`[setObjects] Marking object ${obj.id} as lost`)
          obj.lost = true
          obj.lostAt = now
        }
      })
    },

    updatePositions(deltaTime: number = 1 / 60) {
      const smoothing = 5
      store.objects.forEach((obj) => {
        obj.position.x +=
          (obj.targetPosition.x - obj.position.x) * smoothing * deltaTime
        obj.position.y +=
          (obj.targetPosition.y - obj.position.y) * smoothing * deltaTime
      })
    },

    cleanUpLost() {
      const now = Date.now()
      store.objects.forEach((obj, id) => {
        if (obj.lost && obj.lostAt && now - obj.lostAt > 300_000) {
          console.log(`[cleanUpLost] Removing object ${id} after 5 min lost`)
          store.objects.delete(id)
        }
      })
    },

    cleanUpAllLost() {
      store.objects.forEach((obj, id) => {
        if (obj.lost) {
          console.log(`[cleanUpAllLost] Removing object ${id}`)
          store.objects.delete(id)
        }
      })
    },

    getAll(): ObjectData[] {
      return Array.from(store.objects.values())
    },

    size(): number {
      return store.objects.size
    },
  }

  makeAutoObservable(store)
  return store
}

export const objectsStore = createObjectsStore()
