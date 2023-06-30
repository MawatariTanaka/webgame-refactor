import { useContext } from "react";
import { Form, Button, Radio } from "antd";
import { doc, updateDoc, getDoc } from "firebase/firestore";

import { auth, db } from "../../../contexts/FirebaseContext";
import { ChatContext } from "../../../contexts/ChatContext";
import iconRock from "../../../images/rock_paper_scissors/icon-rock.svg";
import iconPaper from "../../../images/rock_paper_scissors/icon-paper.svg";
import iconScissors from "../../../images/rock_paper_scissors/icon-scissors.svg";

const { Item } = Form;

export default function BetDecision() {
    const { dispatch, currentRoomId } = useContext(ChatContext);

    const onFinish = async (values) => {
        const { option } = values;
        const roomRef = doc(db, "rooms", currentRoomId);
        const roomData = (await getDoc(roomRef)).data();
        const roomHost = roomData.host_id;
        const roomPlayer = roomData.player_id;
        const ready = roomData.readyToPlay;
        if (ready.host && ready.player) {
            if (roomHost === auth.currentUser.uid) {
                await updateDoc(roomRef, {
                    "betting.host": { choice: option, bet: 0 },
                });
            } else if (roomPlayer === auth.currentUser.uid) {
                await updateDoc(roomRef, {
                    "betting.player": { choice: option, bet: 0 },
                });
            }
        }
        dispatch({
            type: "CHANGE_GOING_TO_BET",
            payload: false,
        });
    };

    const centerAlignStyles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <div className="bet-decision-alert">
            <h2>Choose an option:</h2>
            <Form name="bet-decision-form" onFinish={onFinish}>
                <Item
                    name="option"
                    rules={[
                        { required: true, message: "Please select an option!" },
                    ]}
                >
                    <Radio.Group
                        style={{ ...centerAlignStyles, padding: "0 0.5rem" }}
                    >
                        <Radio value={1}>
                            <img size={64} src={iconRock} alt="Rock" />
                        </Radio>
                        <Radio value={2}>
                            <img size={64} src={iconPaper} alt="Paper" />
                        </Radio>
                        <Radio value={3}>
                            <img size={64} src={iconScissors} alt="Scissors" />
                        </Radio>
                    </Radio.Group>
                </Item>
                <Item style={centerAlignStyles}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginRight: 10 }}
                    >
                        Play
                    </Button>
                    <Button
                        htmlType="submit"
                        onClick={() => {
                            dispatch({
                                type: "CHANGE_GOING_TO_BET",
                                payload: false,
                            });
                        }}
                    >
                        Cancel
                    </Button>
                </Item>
            </Form>
        </div>
    );
}
