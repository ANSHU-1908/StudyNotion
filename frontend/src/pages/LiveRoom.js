// LiveRoom.js
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const LiveRoom = () => {
  const { roomId } = useParams();
  const { user } = useSelector((s) => s.auth);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);
  const videoRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5000");
    socketRef.current.emit("join-room", { roomId, userId: user?._id, userName: `${user?.firstName} ${user?.lastName}` });
    socketRef.current.on("chat-message", (msg) => setMessages((prev) => [...prev, msg]));

    // Get local media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      }).catch(() => {});

    return () => {
      socketRef.current.disconnect();
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [roomId, user]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const msg = { text: message, sender: `${user?.firstName} ${user?.lastName}`, time: new Date().toLocaleTimeString() };
    socketRef.current.emit("send-message", { roomId, ...msg });
    setMessages((prev) => [...prev, msg]);
    setMessage("");
  };

  return (
    <div className="live-room">
      <div>
        <div style={{ background: "#000", borderRadius: 12, overflow: "hidden", aspectRatio: "16/9", marginBottom: "1rem" }}>
          <video ref={videoRef} autoPlay muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span style={{ background: "#ef4444", color: "#fff", padding: "0.25rem 0.6rem", borderRadius: 4, fontSize: "0.8rem", fontWeight: 700 }}>🔴 LIVE</span>
          <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Room: {roomId}</span>
        </div>
      </div>
      <div className="chat-panel">
        <div style={{ padding: "1rem", borderBottom: "1px solid var(--border)", fontWeight: 700 }}>💬 Live Chat</div>
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: "0.75rem" }}>
              <span style={{ color: "var(--primary)", fontSize: "0.8rem", fontWeight: 600 }}>{msg.sender}</span>
              <span style={{ color: "var(--text-secondary)", fontSize: "0.75rem", marginLeft: "0.5rem" }}>{msg.time}</span>
              <p style={{ fontSize: "0.875rem", marginTop: "0.2rem" }}>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendMessage()} />
          <button className="btn btn-primary" onClick={sendMessage} style={{ fontSize: "0.85rem" }}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default LiveRoom;
