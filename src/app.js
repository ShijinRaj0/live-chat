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

  function startConversation() {
    if (inpSenderId != "") {
      setSenderId(inpSenderId);
    }
    if (inpSessionKey != "") {
      setSessionKey(inpSessionKey);
    }
  }
  function renderChatWindow() {
    if (senderId != "" && sessionKey != "") {
      return <ChatWindow senderId={senderId} sessionId={sessionKey} />;
    } else {
      return (
        <div className="container">
          <div className="row justify-content-center align-items-center my-5">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="row bg-white chat-title shadow-sm p-3 border-bottom">
                <div className="welcomeHeading blue">
                  Live <span className="yellow">Chat</span>
                </div>
              </div>
              <div className="row shadow-sm">
                <div
                  className="chatbox bg-white bg-light pt-3 pb-3"
                  id="chatOutput"
                >
                  <div>
                    <div className="chat-label">Sender</div>
                    <input
                      className="chat-input shadow-sm"
                      type="text"
                      placeholder="Sender ID"
                      onChange={updateUserId}
                    />
                    <div className="chat-label mt-3">Session</div>
                    <input
                      className="chat-input shadow-sm"
                      type="text"
                      placeholder="Session ID"
                      onChange={updateSessionKey}
                    />
                    <br />
                    <div className="d-flex justify-content-center my-5">
                    <button className="btn btn-primary shadow-sm" onClick={startConversation}>
                      Start Conversation
                    </button>

                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row border-top">
                <input
                  className="chat-input shadow-sm"
                  type="text"
                  id="chatInput"
                  placeholder="Type something"
                  onKeyUp={sendMessage}
                />
              </div> */}
            </div>
          </div>
        </div>
      );
    }
  }

  return <div>{renderChatWindow()}</div>;
}

export default App;
