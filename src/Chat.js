import React, { useState, useRef, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import io from 'socket.io-client';
import './Chat.css';
import { addNotification } from './notificationReducer';
import { formatDuration, getHashCode, intToHSL } from './util/util';
import { backendServerUrl } from './util/backend-urls';
import UserCircle from './UserCircle';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Chat() {
  const [myUserid, setMyUserid] = useState('A');
  const [chatroom, setChatroom] = useState('Room1');
  const [socket, setSocket] = useState(null);

  const scrollBottom = useRef(null);
  const messageListRef = useRef(null);
  const msgTextareaRef = useRef(null);
  const wsconn = useRef(null);
  const [msg, setMsg] = useState('');
  const [meetingusers, setMeetingUsers] = useState([
    {
      username: 'A',
    },
    {
      username: 'B'
    },
    {
      username: 'C'
    }
  ]);
  const [chats, setChats] = useState([
    {
      username: 'A',
      message: 'This is message from person AThis is message from person AThis is message from person AThis is message from person AThis is message from person A',
      createdAt: '2021-10-09T04:47:30.077Z'
    },
    {
      username: 'A',
      message: 'This is a second message',
      createdAt: '2021-10-10T04:47:30.077Z'
    },
    {
      username: 'B',
      message: 'This is message from person B',
      createdAt: '2021-10-10T04:47:30.077Z'
    },
    { username: 'A', message: 'Doing work', createdAt: '2021-10-10T15:47:30.077Z' },
    { username: 'A', message: 'Doing work', createdAt: '2021-10-10T20:47:30.077Z' },
    { username: 'A', message: 'Doing work', createdAt: '2021-10-10T44:47:30.077Z' },
    { username: 'A', message: 'Doing work', createdAt: '2021-10-10T45:47:30.077Z' },
    { username: 'A', message: 'Doing work', createdAt: '2021-10-11T04:47:30.077Z' },
    { username: 'A', message: 'Doing work', createdAt: '2021-10-11T04:47:30.077Z' },
    { username: 'C', message: 'Doing work', createdAt: '2021-10-11T04:47:30.077Z' },
    { username: 'C', message: 'Doing work', createdAt: '2021-10-11T04:47:30.077Z' },
    { username: 'C', message: 'Doing work', createdAt: '2021-10-11T04:47:30.077Z' },
    { username: 'C', message: 'Doing work', createdAt: '2021-10-11T04:47:30.077Z' },
    { username: 'C', message: 'Doing work', createdAt: '2021-10-11T04:47:30.077Z' },
    { username: 'C', message: 'Doing work', createdAt: '2021-10-11T04:47:30.077Z' },
    { username: 'C', message: 'Doing work', createdAt: '2021-10-11T04:47:30.077Z' },
    { username: 'C', message: 'Doing work', createdAt: '2021-10-11T04:47:30.077Z' },
    { username: 'C', message: 'Doing work2', createdAt: '2021-10-11T04:47:30.077Z' },

  ]);

  useEffect(() => {
    document.querySelector('.chat-container').style.height = (window.innerHeight - document.getElementById('topNav').clientHeight - 1) + 'px';
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
    const messageListener = (username, message) => {
      if (typeof message === 'string')
        addChats(username, message);
      else
        addChats(username, message.msg);
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
    setChats(ct => [...ct, { username: user, message: msg }]);
    scrollToBottom();
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
    console.log('send message', JSON.stringify({ username: myUserid, msg: msg, chatroom }))
    socket.emit('sendMessage', JSON.stringify({ username: myUserid, msg: msg, chatroom }));
    // sendMessage(msg);
    // wsconn.current.send(JSON.stringify({ username: myUserid, msg: msg }));
    // setChats([...chats, {username: myUserid, message: msg}]);
    setMsg('');
    msgTextareaRef.current.focus();
    // scrollBottom.current.scrollIntoView({ behavior: "smooth" });
  }
  function scrollToBottom(scrollHeight = 0) {

    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight - scrollHeight;
    }
  };
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
        <section className="meetingHeader">
          <div className="meetingUsers">
            {meetingusers.map(mtUser => <div className="userCircleWrapper">
              <UserCircle user={{ username: mtUser.username }} />
            </div>
            )}
            <div className="userCircleWrapper">
              <div className="letterCircle addUserToMeeting">+</div>
            </div>
          </div>
          <div className="videoCall">
            <span class="material-icons">
              mic
            </span>
            <span class="material-icons">
              videocam
            </span>
          </div>
        </section>
        SetUserID:
        <input value={myUserid} onChange={(e) => setMyUserid(e.currentTarget.value)} />
        <button onClick={(e) => createUser()}>Create User</button>
        Set Chatroom:
        <input value={chatroom} onChange={(e) => setChatroom(e.currentTarget.value)} />
        <button onClick={(e) => subscribeToRoom()}>Subscribe</button>
        <section className="message-list flex-grow-1" ref={messageListRef}>
          <div id="chat">{chats.map((chat, key) =>
            <div className={chat.username === myUserid ? 'left' : 'right'} key={key}>
              <div className="user letterCircle text-white" style={{ backgroundColor: intToHSL(getHashCode(chat.username)) }}>{chat.username.charAt(0)}</div>
              <aside >{chat.message}
                <div className="chatFooter">{dayjs(chat.createdAt).format('MMM D h:mm a')}</div>
              </aside>

            </div>
          )}

          </div>
          <div className="msgSeparator">Hello</div>
          <div ref={scrollBottom}>&nbsp;</div>
        </section>
        <section id="chat-form" className="d-flex flex-shrink-0 justify-content-end">
          <textarea placeholder="Type a message" className="flex-grow-1" name="msg" rows="1" onChange={(e) => setMsg(e.currentTarget.value)} value={msg} ref={msgTextareaRef} onKeyDown={(e) => onTextareaKeyDown(e)}></textarea>
          <button type="button" class="btn btn-primary flex-shrink-0 " onClick={send}>
            <i className="material-icons ">send</i>
          </button>
        </section>
      </div>
    </>
  )
}