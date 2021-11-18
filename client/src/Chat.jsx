import React from 'react'
import {useState , useEffect} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
export default function Chat({socket , username , room}) {

    const [currentMessage , setCurrentMessage] = useState('')
    const [messageList , setMessageList] = useState([])
    


    const sendMsg = async () => {
        if(currentMessage !== '')
        {
           const msgData = {
               room: room,
               author : username,
               message:currentMessage,
               time : new Date(Date.now()).getHours() +":"+ new Date(Date.now()).getMinutes()
           }

           await socket.emit('send_message' ,msgData)
           setMessageList((prevMsgs) => [...prevMsgs , msgData])
           setCurrentMessage('')
        }
    }
    
    
    useEffect(() => {
        socket.on('receive_message' , (data) => {
          setMessageList((previousMessages) => [
              ...previousMessages,
              data
          ])
        })
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
             <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
               {
                   messageList.map((msg) => {
                       return (
                       <div className="message" id={username === msg.author ? "you" : "other"}>
                          <div className="message-content">
                              <p>{msg.message}</p>
                          </div>
                          <div className="message-meta">
                              <p id="time">{msg.time}</p>
                              <p id="author">{msg.author}</p>
                          </div>
                       </div>
                       )
                   }) 
               }
               </ScrollToBottom>
            </div>
            <div className="chat-footer">
                 <input 
                 value={currentMessage}
                 type="text" 
                 placeholder="Your message.." name="" id=""
                 onChange={(e) => {setCurrentMessage(e.target.value)}}
                 onKeyPress={(e) => {e.key === "Enter" && sendMsg() }}
                 />

                 <button onClick={sendMsg}>&#9658;</button>

            </div>
        </div>
    )
}
