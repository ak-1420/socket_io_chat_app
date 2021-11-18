import './App.css';
import  io from 'socket.io-client'
import {useState} from 'react'
import Chat from './Chat';


const socket = io.connect('http://localhost:3001')


function App() {

  const [username, setusername] = useState('')
  const [room, setroom] = useState('')
  const [showChat, setshowChat] = useState(false)

  const joinRoom = () => {
    if(username !== "" && room !== "")
    {
      socket.emit('join_room' ,room)
      setshowChat(true)
    }
  }
  return (
    <div className="App">
      {
        !showChat ?
        (
          <div className="joinChatContainer">
        <h3>Join a chat</h3>

        <input
          type="text"
          name="username"
          id="username"
          placeholder="John..."
          onChange={(e) => { setusername(e.target.value) }}
        />

        <input
          type="text"
          id="room"
          name="room"
          placeholder="Room Id"
          onChange={(e) => { setroom(e.target.value) }}
        />

        <button onClick={joinRoom}>Join a room</button>

      </div>) :

        (
          <Chat socket={socket} username={username} room={room}/>
        )
      }
      
       

    </div>
  );
}

export default App;
