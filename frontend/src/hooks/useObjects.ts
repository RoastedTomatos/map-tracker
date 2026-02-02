import { useEffect } from 'react'
import { objectsStore } from '../stores/objectsStore'
import { ObjectData } from '../types'

export function useObjects(isAuth: boolean) {
  const API_URL = process.env.REACT_APP_API_URL

  useEffect(() => {
    if (!isAuth) return

    const accessKey = localStorage.getItem('access_key')
    if (!accessKey) return

    let cancelled = false

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/objects`, {
          headers: {
            Authorization: `Bearer ${accessKey}`,
          },
        })

        if (!res.ok) {
          console.error('Unauthorized or server error')
          return
        }

        const data: ObjectData[] = await res.json()
        if (!cancelled) {
          objectsStore.setObjects(data)
        }
      } catch (e) {
        console.error('Failed to fetch objects', e)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 1000)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [isAuth, API_URL])
}
