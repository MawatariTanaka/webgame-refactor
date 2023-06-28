import { useContext } from "react";
import { Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { ChatContext } from "../../../contexts/ChatContext"; 

const { Header } = Layout;

export default function CurrentRoomHeader({ roomName }) {
    const { dispatch } = useContext(ChatContext);
    return (
        <Header className="message-header">
            <span>{roomName}</span>
            <MenuOutlined
                style={{ fontSize: "1.5rem" }}
                onClick={() =>
                    dispatch({ type: "CHANGE_SHOW_STATUS", payload: true })
                }
            />
        </Header>
    );
}
