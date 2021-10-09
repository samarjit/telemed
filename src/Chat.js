import React, { useState, useRef, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import io from 'socket.io-client';
import './Chat.css';
import { addNotification } from './notificationReducer';
import { formatDuration, getHashCode, intToHSL } from './util/util';
import { backendServerUrl } from './util/backend-urls';



export default function Chat() {
  const [myUserid, setMyUserid] = useState('A');
  const [chatroom, setChatroom] = useState('Room1');
  const [socket, setSocket] = useState(null);

  const scrollBottom = useRef(null);
  const msgRef = useRef(null);
  const wsconn = useRef(null);
  const [msg, setMsg] = useState('');
  const [chats, setChats] = useState([
    {
      user: 'A',
      message: 'This is message from person AThis is message from person AThis is message from person AThis is message from person AThis is message from person A'
    },
    {
      user: 'A',
      message: 'This is a second message'
    },
    {
      user: 'B',
      message: 'This is message from person B'
    },
    { user: 'A', message: 'Doing work' },
    { user: 'A', message: 'Doing work' },
    { user: 'A', message: 'Doing work' },
    { user: 'A', message: 'Doing work' },
    { user: 'A', message: 'Doing work' },
    { user: 'A', message: 'Doing work' },
    { user: 'C', message: 'Doing work' },

  ]);

  useEffect(() => {
    console.log('setting socketio Socket')
    const newSocket = io(`${backendServerUrl}`
      // const newSocket = io(`http://localhost:5000`
      // , { transports: ['websocket'], upgrade: false }
    );
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);
  useEffect(() => {
    if (!socket) {
      console.log('socket still not initialized')
      return;
    }
    const messageListener = (user, message) => {
      if (typeof message === 'string')
        addChats(user, message);
      else
        addChats(user, message.msg);
    };

    const deleteMessageListener = (messageID) => {
      console.log('TODO: delete chats', messageID)
    };

    socket.on('updateChat', messageListener);
    socket.on('deleteMessage', deleteMessageListener);
    // socket.emit('getMessages');

    return () => {
      socket.off('updateChat', messageListener);
      socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.emit('subscribe', chatroom);
  //   socket.emit('unsubscribe', 'Room');
  // }, [chatroom])
  const createUser = () => {
    socket.emit('createUser', myUserid);
  }
  const subscribeToRoom = () => {

    // socket.emit('createRoom', chatroom);
    socket.emit('updateRooms', chatroom);
  }
  // const {
  //     sendMessage,
  //     lastMessage,
  //     readyState,
  //   } = useWebSocket("wss://echo.websocket.org", {
  //     onMessage: (d) => {
  //      console.log('cb',d.data)
  //      setChats([...chats, {user: myUserid, message: d.data}]);
  //     }
  //   });

  function addChats(user, msg) {
    console.log(msg)
    const m = msg;//JSON.parse(msg);
    setChats(ct => [...ct, { user: user, message: msg }]);
  }
  /*useEffect(() => {
    const webSocketUrl = 'wss://' + backendServerUrl.replace(/https?\:\/\//, '');
    const connection = new WebSocket(`${webSocketUrl}/${chatroom}`); // wss://echo.websocket.org
    wsconn.current = connection;
    console.log(wsconn)
    connection.onopen = (event) => {
      console.log("WebSocket is open now.");
    };

    connection.onclose = (event) => {
      console.log("WebSocket is closed now.");
    };

    connection.onerror = (event) => {
      console.error("WebSocket error observed:", event);
    };

    connection.onmessage = (event) => {
      // append received message from the server to the DOM element 
      // const chat = document.querySelector("#chat");
      // chat.innerHTML += event.data;
      // console.log(chats)
      addChats(event.data)

    };
    scrollBottom.current.scrollIntoView({ behavior: "smooth" })

    return () => {
      wsconn.current.close();
    }
  }, [chatroom]);*/

  function send() {
    console.log('send message', JSON.stringify({ user: myUserid, msg: msg, chatroom }))
    socket.emit('sendMessage', JSON.stringify({ user: myUserid, msg: msg, chatroom }));
    // sendMessage(msg);
    // wsconn.current.send(JSON.stringify({ user: myUserid, msg: msg }));
    // setChats([...chats, {user: myUserid, message: msg}]);
    setMsg('');
    msgRef.current.focus();
    scrollBottom.current.scrollIntoView({ behavior: "smooth" });
  }
  function onTextareaKeyDown(event) {
    if (event.altKey === false && (event.key === "Enter" || event.key === "NumpadEnter")) {
      console.log("Enter key was pressed. Run your function.");
      event.preventDefault();
      event.stopPropagation();
      send();
    }
  }
  return (
    <>
      <div class="chat-container col-mx-12 d-flex flex-column">
        SetUserID:
        <input value={myUserid} onChange={(e) => setMyUserid(e.currentTarget.value)} />
        <button onClick={(e) => createUser()}>Create User</button>
        Set Chatroom:
        <input value={chatroom} onChange={(e) => setChatroom(e.currentTarget.value)} />
        <button onClick={(e) => subscribeToRoom()}>Subscribe</button>
        <section className="message-list flex-grow-1">
          {chats.map((chat, key) =>
            <div className={chat.user === myUserid ? 'left' : 'right'} key={key}>
              <div className="user letterCircle text-white" style={{ backgroundColor: intToHSL(getHashCode(chat.user)) }}>{chat.user.charAt(0)}</div>
              <aside >{chat.message}</aside>
            </div>
          )}
          <div id="chat"></div>

          <div ref={scrollBottom}>&nbsp;</div>
        </section>
        <section id="chat-form" className="d-flex flex-shrink-0 justify-content-end">
          <textarea placeholder="Type a message" className="flex-grow-1" name="msg" rows="1" onChange={(e) => setMsg(e.currentTarget.value)} value={msg} ref={msgRef} onKeyDown={(e) => onTextareaKeyDown(e)}></textarea>
          <button type="button" class="btn btn-primary flex-shrink-0 " onClick={send}>
            <i className="material-icons rotate-45">send</i>
          </button>
        </section>
      </div>
    </>
  )
}