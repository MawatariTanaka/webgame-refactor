import React, { useContext, useEffect, useState } from "react";
import { Input, Button, Layout } from "antd";
import { doc, arrayUnion, updateDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../contexts/FirebaseContext";
import { ChatContext } from "../../../contexts/ChatContext";
import CurrentRoomHeader from "./CurrentRoomHeader";

const { Content, Footer } = Layout;

export default function CurrentRoom() {
    const { currentRoomId, dispatch } = useContext(ChatContext);
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [banChat, setBanChat] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        const roomRef = doc(db, "rooms", currentRoomId);
        onSnapshot(roomRef, (doc) => {
            const roomData = doc.data();
            if (roomData.ban.includes(auth.currentUser.uid)) {
                dispatch({
                    type: "CHANGE_ROOM",
                    payload: "",
                });
            }
            setRoomName(roomData.roomName);
            setMessages(roomData.messages);
            setBanChat(roomData.ban_chat);
        });
    }, [currentRoomId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newMessage = {
            sender: auth.currentUser.uid,
            text: text,
        };
        const roomRef = doc(db, "rooms", currentRoomId);

        await updateDoc(roomRef, {
            messages: arrayUnion(newMessage),
            in_chat: arrayUnion({
                id: auth.currentUser.uid,
                username: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
            }),
        });
        setText("");
    };

    if (!auth.currentUser) {
        return null;
    }

    return (
        <Layout style={{ height: "100%" }}>
            <CurrentRoomHeader roomName={roomName} />
            <Content className="message-container">
                {auth.currentUser.uid &&
                    messages.map((message, index) => (
                        <div
                            key={index}
                            style={
                                auth.currentUser.uid === message.sender
                                    ? {
                                          alignSelf: "flex-end",
                                          background:
                                              "linear-gradient(to left, #0a618c, #34c0db)",
                                          color: "white",
                                      }
                                    : {}
                            }
                        >
                            {message.text}
                        </div>
                    ))}
            </Content>
            {banChat.includes(auth.currentUser.uid) ? null : (
                <Footer className="message-send-chat">
                    <form
                        onSubmit={handleSubmit}
                        style={{ display: "flex", flex: 1 }}
                    >
                        <Input
                            placeholder="Type your message here"
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            style={{ marginRight: "10px" }}
                        />
                        <Button
                            style={{
                                marginRight: "10px",
                                color: "red",
                                border: "1px solid red",
                            }}
                            onClick={() => {
                                dispatch({
                                    type: "CHANGE_GOING_TO_BET",
                                    payload: true,
                                });
                            }}
                        >
                            Play
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Send
                        </Button>
                    </form>
                </Footer>
            )}
        </Layout>
    );
}
