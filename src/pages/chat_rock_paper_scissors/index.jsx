import React from 'react';
import { Row, Col } from 'antd';
import ChatRoom from './chat_room';
import RockPaperScissors from './rock_paper_scissors';

export default function ChatRockPaperScissors() {
  return (
    <Row>
      <Col span={12}><ChatRoom /></Col>
      <Col span={12}><RockPaperScissors/></Col>
    </Row>
  );
}
