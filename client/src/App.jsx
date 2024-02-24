import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

function App() {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [to, setTo] = useState('')
  // const [messages, setMessages] = useState([])

  useEffect(() => {
    const newSocket = io('http://localhost:8080')
    setSocket(newSocket)

    newSocket.on('connect', () => {
      console.log(`Connected and having socket id: ${newSocket.id}`)
    })

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    newSocket.on("receive", (message) => {
      console.log(message)
    });

    return () => {
      newSocket.disconnect();
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // socket.emit('message', { message, to })
    socket.emit('broadcast', message)
    setMessage('')
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
        {/* <div>
          <h2>Messages</h2>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div> */}
      </div>
    </>
  )
}

export default App;
