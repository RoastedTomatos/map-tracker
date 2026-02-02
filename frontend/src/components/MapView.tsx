import { observer } from 'mobx-react-lite'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { useEffect, useRef } from 'react'
import { objectsStore } from '../stores/objectsStore'
import { runInAction } from 'mobx'
import { checkLost } from '../helpers/checkLost'
import 'leaflet/dist/leaflet.css'

export const MapView = observer(() => {
  const mapCenter: [number, number] = [50, 50]
  const zoom = 5
  const lastTime = useRef(performance.now())

  useEffect(() => {
    let animationFrame: number

    const animate = (time: number) => {
      const delta = (time - lastTime.current) / 1000
      lastTime.current = time

      const smoothingFactor = 2

      runInAction(() => {
        objectsStore.getAll().forEach((obj) => {
          const factor = Math.min(delta * smoothingFactor, 1)
          obj.position.x += (obj.targetPosition.x - obj.position.x) * factor
          obj.position.y += (obj.targetPosition.y - obj.position.y) * factor
        })

        objectsStore.cleanUpLost()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      runInAction(() => {
        checkLost(objectsStore.getAll())
        objectsStore.cleanUpLost()
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OSM</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {objectsStore.getAll().map((obj) => (
        <CircleMarker
          key={`${obj.id}-${obj.lost}`}
          center={[obj.position.y, obj.position.x]}
          radius={4}
          pathOptions={{ color: obj.lost ? 'gray' : 'blue' }}
        >
          <Popup>
            <div style={{ padding: '8px', lineHeight: 1.4 }}>
              <div>
                <strong>ID:</strong> {obj.id}
              </div>
              <div>
                <strong>Coords:</strong> {obj.position.x.toFixed(2)},{' '}
                {obj.position.y.toFixed(2)}
              </div>
              {obj.lost && obj.lostAt && (
                <div>
                  <strong>Lost at:</strong>{' '}
                  {new Date(obj.lostAt).toLocaleString()}
                </div>
              )}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
})
