import type { ServerObject } from '../types/index.js'

class ObjectsStore {
  private objects = new Map<string, ServerObject>()

  set(object: ServerObject) {
    this.objects.set(object.id, object)
  }

  remove(id: string) {
    this.objects.delete(id)
  }

  get(id: string): ServerObject | undefined {
    return this.objects.get(id)
  }

  getAll(): ServerObject[] {
    return Array.from(this.objects.values())
  }

  size(): number {
    return this.objects.size
  }
}

export const objectsStore = new ObjectsStore()
