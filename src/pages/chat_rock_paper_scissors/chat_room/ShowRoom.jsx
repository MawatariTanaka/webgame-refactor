import React, { useContext } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import CreateRoom from "./CreateRoom";
import CurrentRoom from "./CurrentRoom";
import BlankRoom from "./BlankRoom";

export default function ShowRoom() {
  const { goingToAddRoom, currentRoomId } = useContext(ChatContext);
  return (
    <div className="messaging-container">
            <div className="messaging-space">
              {goingToAddRoom ? <CreateRoom /> : currentRoomId ? <CurrentRoom /> : <BlankRoom />}
            </div>
            {/* {currentRoomId && currentRoomId !== "add-room" && <MessageDetail />} */}
    </div>
  )
}
