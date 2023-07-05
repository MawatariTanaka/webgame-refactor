import {useContext} from 'react';
import { Row, Col } from 'antd';
import { ChatContext } from '../../contexts/ChatContext';
import ChatRoom from './chat_room';
import RockPaperScissors from './rock_paper_scissors';

export default function ChatRockPaperScissors() {
  const {currentRoomId} = useContext(ChatContext);
  return (
    <Row>
      <Col span={12}><ChatRoom /></Col>
      {
        currentRoomId && <Col span={12}><RockPaperScissors/></Col>
      }
    </Row>
  );
}
