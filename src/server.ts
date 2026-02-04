import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
app.use(cors())

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('transcription', (text: string) => {
    // Send to all other clients (desktop)
    socket.broadcast.emit('live-transcript', text)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

httpServer.listen(3001, () => {
  console.log('WebSocket server running on port 3001')
})
