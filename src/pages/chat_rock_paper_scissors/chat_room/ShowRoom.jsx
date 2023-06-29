import React, { useContext } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import CreateRoom from "./CreateRoom";
import CurrentRoom from "./CurrentRoom";
import BlankRoom from "./BlankRoom";
import RoomDetail from "./RoomDetail";
import BetDecision from "./BetDecision";

export default function ShowRoom() {
  const { goingToAddRoom, goingToBet, currentRoomId } = useContext(ChatContext);
  return (
    <div className="messaging-container">
      <div className="messaging-space">
        {goingToAddRoom ? <CreateRoom /> : currentRoomId ? <CurrentRoom /> : <BlankRoom />}
      </div>
      {currentRoomId && <RoomDetail />}
      {goingToBet && <BetDecision />}
    </div>
  )
}
