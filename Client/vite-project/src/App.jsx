import './App.css'
import { useState } from 'react';
import io from 'socket.io-client';
import Chat from './assets/Chat';

const socket = io.connect('http://localhost:3001');

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName && room) {
      socket.emit('join room', room)
      setShowChat(true);
    }
  }
  return (
    <div className="App">
      {!showChat ? (
        <div className='joinChatContainer'>
          <h3>Join A Chat</h3>
          <input
            type='text'
            placeholder='John...'
            onChange={(event) => setUserName(event.target.value)}
          />
          <input
            type='text'
            placeholder='Room ID...'
            onChange={(event) => setRoom(event.target.value)}

          />
          <button onClick={joinRoom}>Join a Room</button>
        </div>
      )
        : (
          <Chat
            socket={socket}
            userName={userName}
            room={room}
          />)
      }

    </div>
  )
}

export default App
