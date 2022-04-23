import { trim } from "lodash";
import React, { useState, useEffect } from "react";
import logo from "./public/icons/chat.png";
import keyIcon from "./public/icons/key-chain.png";
import userIcon from "./public/icons/profile.png";

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
            <div className="col-12 col-md-6 col-lg-6">
              <div className="row chat-title py-4">
                <div className="welcomeHeading blue">
                  <img
                    style={{ width: "32px", height: "32px" }}
                    src={logo}
                    alt="img"
                  />
                  <span className="mx-2">Live Chat</span>
                </div>
              </div>
              <div className="row">
                <div>
                  <div>
                    <div className="mt-3 px-5">
                      <div className="chat-label position-absolute ph-mt">
                        <img
                          style={{ width: "24px", height: "24px" }}
                          src={userIcon}
                          alt="img"
                        />
                        <span className="ph-text">Sender</span>
                      </div>
                      <input
                        className="chat-input pl-max"
                        type="text"
                        onChange={updateUserId}
                      />
                    </div>
                    <div className="mt-3 px-5">
                      <div className="chat-label position-absolute ph-mt">
                        <img
                          style={{ width: "24px", height: "24px" }}
                          src={keyIcon}
                          alt="img"
                        />
                        <span className="ph-text">Room Key</span>
                      </div>
                      <input
                        className="chat-input pl-max"
                        type="text"
                        onChange={updateSessionKey}
                      />
                    </div>
                    <br />
                    <div className="d-flex justify-content-center mb-5">
                      <button
                        className="btn"
                        onClick={startConversation}
                      >
                        Join
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
