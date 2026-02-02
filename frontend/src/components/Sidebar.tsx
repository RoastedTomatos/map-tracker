import { observer } from 'mobx-react-lite'
import { objectsStore } from '../stores/objectsStore'
import { Box, Button, Divider, Typography } from '@mui/material'

export const Sidebar = observer(() => {
  const lostObjects = objectsStore.getAll().filter((o) => o.lost)

  return (
    <Box p={3} sx={{ height: '100%', overflowY: 'auto' }}>
      <Typography variant="subtitle1" gutterBottom>
        Total objects: {objectsStore.getAll().length}
      </Typography>

      {lostObjects.length > 0 && (
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => objectsStore.cleanUpAllLost()}
        >
          Remove all lost
        </Button>
      )}

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Lost objects ({lostObjects.length})
      </Typography>

      {lostObjects.length > 0 ? (
        lostObjects.map((obj) => (
          <Box
            key={obj.id}
            p={1}
            mb={1}
            bgcolor="background.default"
            borderRadius={1}
            boxShadow={1}
            display={'flex'}
            flexDirection={'column'}
          >
            <Typography variant="body2">ID: {obj.id}</Typography>
            <Typography variant="body2">
              Coord: {obj.position.x.toFixed(2)}, {obj.position.y.toFixed(2)}
            </Typography>
            <Typography variant="body2">
              Lost at {new Date(obj.lostAt!).toLocaleString()}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No lost objects
        </Typography>
      )}
    </Box>
  )
})
