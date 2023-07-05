import { useContext } from "react";
import { Row, Col } from "antd";
import { ChatContext } from "../../contexts/ChatContext";
import RockPaperScissors from "./rock_paper_scissors";
import Contact from "./chat_room/Contact";
import ShowRoom from "./chat_room/ShowRoom";

export default function ChatRockPaperScissors() {
    const { currentRoomId } = useContext(ChatContext);

    return (
        <div>
            <Row style={{ height: "93vh" }}>
                {
                    <Col span={4}>
                        <Contact />
                    </Col>
                }
                {currentRoomId && (
                    <Col span={10}>
                        <ShowRoom />
                    </Col>
                )}
                {currentRoomId && (
                    <Col span={10}>
                        <RockPaperScissors />
                    </Col>
                )}
            </Row>
        </div>
    );
}
