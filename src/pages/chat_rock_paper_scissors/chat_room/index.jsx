import React from 'react'
import { Row, Col } from 'antd';

import Contact from './Contact';
import "../../../styles/ChatRoom.css";

export default function ChatRoom() {
  return (
    <div>
        <Row className="chatroom-container">
            <Col className="room-list-container" span={6}><Contact /></Col>
            <Col span={18}></Col>
        </Row>
    </div>
  )
}
