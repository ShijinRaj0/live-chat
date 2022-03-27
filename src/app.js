import { trim } from "lodash";
import React, { useState, useEffect } from "react";

import ChatWindow from "./components/ChatWindow";

function App() {
  const [senderId, setSenderId] = useState("");
  const [sessionKey, setSessionKey] = useState("");
  const [inpSenderId, setInpSenderId] = useState("");
  const [inpSessionKey, setInpSessionKey] = useState("");


  function updateUserId(e) {
    if (trim(e.target.value) != "") {
        setInpSenderId(e.target.value);
      }
  }

  function updateSessionKey(e) {
    if (trim(e.target.value) != "") {
      setInpSessionKey(e.target.value);
    }
  }

  function  startConversation() {
    if (inpSenderId!="") {
        setSenderId(inpSenderId);
    }
    if(inpSessionKey!=""){
        setSessionKey(inpSessionKey);
    }
  }
  function renderChatWindow() {
    if (senderId!="" && sessionKey!="") {
      return (
        <ChatWindow
          senderId={senderId}
          sessionId={sessionKey}
        />
      );
    } else {
      return (
        <div>
          <h5>Sender : {senderId}</h5>
          <input onChange={updateUserId} />
          <h5>Session : {sessionKey}</h5>
          <input onChange={updateSessionKey}/><br/>
          <button onClick={startConversation}>Start Conversation</button>
        </div>
      );
    }
  }

  return <div>{renderChatWindow()}</div>;
}

export default App;
