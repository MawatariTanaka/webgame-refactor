import React from "react";
import { Row, Col } from "antd";

import "../../../styles/ChatRoom.css";
import Contact from "./Contact";
import ShowRoom from "./ShowRoom";

export default function ChatRoom() {
  return (
    <Row className="chatroom-container">
      <Col className="room-list-container" span={6}>
        <Contact />
      </Col>
      <Col className="current-room-container" span={18}>
        <ShowRoom />
      </Col>
    </Row>
  );
}
