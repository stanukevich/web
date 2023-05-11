import { useContext, useState, useRef, useEffect } from "react"
import { Context } from "../App";
import { io } from 'socket.io-client';
import { observer } from "mobx-react-lite"

function Chat() {
  const {user} = useContext(Context)
  const logout = async () => {
    await user.setIsAuth(false)
    await user.setUser({})
    await user.setMessages({})
  }

  const [_message, setMessage] = useState('')

  const listRef = useRef(null);

  const socket = io('http://localhost:9000');

  useEffect(() => {
    socket.on('resToReceiveMessages', async (data) => {
      try{
        user.setMessages(data)
        listRef.current?.lastElementChild?.scrollIntoView();
      }
      catch(e) {
          console.log(e)
        }
    });

    listRef.current?.lastElementChild?.scrollIntoView();
  });


  const MessageList = observer(() => {
    const messages = user.getMessages

    const listItems = messages.map((item) => 
      ((userID, senderName, messageUserID, value, messageID) => {
       if(userID === messageUserID) return(
       <li className="chat-message-own" key={(messageID)}>
        <p className="chat-message-senderName">{senderName}(YOU)</p>
        <p className="chat-message-text">{value}</p>
      </li>)
       else return(
       <li className="chat-message-other" key={messageID}>
        <p className="chat-message-senderName">{senderName}</p>
        <p className="chat-message-text">{value}</p>
      </li>)
       })(item.userId, item.senderName, user.getUser.id, item.value, item.id, item.createdAt)   
    );
    return (
      listItems
    )
  })

  const sendMessage = async () => {
    const userId = await user.getUser.id
    socket.emit('reqToCreateNewMessage', {_message, userId})
  }

  function UserInfoBlock(){
    return(
      <div className="chat-userData">
        <p>USERNAME: {user.getUser.username}</p>
        <p>ID: {user.getUser.id}</p>
    </div>
    )
  }

    return (
      <div className="chat center">
        <p>Stanukevich Chat</p>
        <ul className="chat-message-box" ref={listRef}><MessageList/></ul>
        <form className="message-form">
          <input className="message-form-input" type="text" value={_message} onChange={e => setMessage(e.target.value)} />
          <input type="button" className="message-form-send-button" value="Send" onClick={sendMessage} />
        </form>
        <UserInfoBlock/>
        <button className="chat-button-logout" onClick={logout} >Logout</button>
      </div>
    );
  }
  
export default Chat;