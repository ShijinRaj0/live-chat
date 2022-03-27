import React, { useEffect, useState } from "react";
import "./index.css";
// Import the functions you need from the SDKs you need
import { trim } from "lodash";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  serverTimestamp,
  onValue,
} from "firebase/database";

const firebaseConfig = require("./firebaseConfig.json");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function ChatWindow(props) {
  const [msgList, setMsgList] = useState({});

  let { senderId,sessionId } = props;

  useEffect(() => {
    listenToMessages();
  }, []);

  useEffect(() => {
    console.log(msgList);
  }, [msgList]);

  function sendMessage(e) {
    if (e.keyCode !== 13) {
      return;
    }
    e.preventDefault();
    let text = e.target.value;
    if (trim(text) == "" || trim(senderId) == "") {
      return;
    }
    let msgId = Math.floor(Math.random() * 10000);
    const msg = {
      text,
      type: "message",
      senderId,
      msgId,
      timestamp: serverTimestamp(),
    };
    set(ref(db, `users/messages/${sessionId}/${msgId}`), msg);
    console.log(msg);
    e.target.value = "";
    scrollToBottom();
  }

  function listenToMessages() {
    if (trim(senderId) == "") {
      return;
    }
    onValue(ref(db, `users/messages/${sessionId}`), (snapshot) => {
      
      const data = snapshot.val();
      console.log("Listening for " + senderId);
      if (!data) {
        return;
      }
      setMsgList(data);
    });
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center my-5">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="row bg-white chat-title shadow-sm p-3 border-bottom">
            <div className="welcomeHeading blue">
              Live <span className="yellow">Chat</span>
            </div>
            <div className="d-flex justify-content-between">
            <div>{sessionId}</div>
            <div>{senderId}</div>
            </div>
          </div>
          <div className="row shadow-sm">
            <div
              className="chatbox bg-white bg-light pt-3 pb-3"
              id="chatOutput"
            >
              <MessageBox msgList={msgList} senderId={senderId} ></MessageBox>
            </div>
          </div>
          <div className="row border-top">
            <input
              className="chat-input shadow-sm"
              type="text"
              id="chatInput"
              placeholder="Type something"
              onKeyUp={sendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


function MessageBox(params) {
  let {msgList} = params;
  let msgs= Object.keys(msgList).length;
  let msgArray = [];
setTimeout(scrollToBottom,500);
  if(msgs>0){
    let messages = Object.values(msgList);
    messages.sort((a,b) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0));
    messages.forEach((value,key) => {
      let msgType= (value.senderId==params.senderId)?"send":"reply";
      msgArray.push(<Message key={key} text={value.text} type={msgType} senderId={value.senderId} timestamp={value.timestamp}></Message>);
      
    });
  }
  return msgArray;
}

function Message(params) {
  let {type,text,senderId,timestamp} =params;
  let datetime = formatTimestamp(timestamp);
  scrollToBottom();
    if (type == 'reply') {
        return (<div className="conversation mb-1 mt-2 border shadow-sm px-3 py-2 reply border-1 text-light">
         <div className="conv-user">{senderId} </div>
         <div>{text}</div>
         <div className="timestamp">{datetime}</div>
         </div>);
    } else if (type == 'send') {
      return (<div className="conversation mb-1 mt-2 border shadow-sm px-3 py-2 send border-2">
        <div className="conv-user">You</div>
        <div>{text}</div>
        <div className="timestamp text-dark">{datetime}</div>
        </div>);
    } else {
        return (<></>);
    }
}


function formatTimestamp(timestamp){
  let result;
  let timeStamp = new Date(timestamp);
  let now = new Date();
  if(now.getDate()==timeStamp.getDate()&&
  now.getMonth()==timeStamp.getMonth()&&
  now.getFullYear()==timeStamp.getFullYear()
  ){
      result= "Today, "+timeStamp.toLocaleString('en-IN', {hour: '2-digit', hour12: true ,minute:'2-digit'});
  }else{
      result = timeStamp.toLocaleDateString('en-IN')+" "+timeStamp.toLocaleTimeString('en-IN',{hour: "2-digit", hour12: true ,minute:'2-digit'});
  }


  return result;
}

function scrollToBottom() {
  var elem = document.getElementById("chatOutput");
  elem.scrollTop=elem.scrollHeight;
}