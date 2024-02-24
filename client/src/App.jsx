import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

function App() {
  const socket = io('http://localhost:8080')
  const [message, setMessage] = useState('')
  const [to, setTo] = useState('')


  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected and having socket id: ${socket.id}`)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    socket.on('receive', (message) => {
      console.log(message)
    })

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('message', { message, to })
    setMessage('')
    setTo('')
  }

  return (
    <>
      <div>
        <h1>Socket.io</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <input type="text" id="to" value={to} onChange={(e) => setTo(e.target.value)} />
          <input type="submit" id="send" />
        </form>
      </div>
    </>
  )
}

export default App;
