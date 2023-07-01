import { useEffect, useContext, useState } from "react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { Row, Col, Image, Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ChatContext } from "../../../contexts/ChatContext";
import { auth, db } from "../../../contexts/FirebaseContext";

import GameHeader from "./GameHeader";
import "../../../styles/RockPaperScissors.css";
import iconRock from "../../../images/rock_paper_scissors/icon-rock.svg";
import iconPaper from "../../../images/rock_paper_scissors/icon-paper.svg";
import iconScissors from "../../../images/rock_paper_scissors/icon-scissors.svg";

export default function RockPaperScissors() {
    const { currentRoomId, dispatch } = useContext(ChatContext);
    const [finishedBetting, setFinishedBetting] = useState(false);
    const [hostChoice, setHostChoice] = useState(null);
    const [playerChoice, setPlayerChoice] = useState(null);

    useEffect(() => {
        const docRef = doc(db, "rooms", currentRoomId);

        const unsubscribe = onSnapshot(docRef, async (doc) => {
            const data = doc.data();
            const betting = data.betting;
            const hostChoice = betting.host.choice;
            const playerChoice = betting.player.choice;
            const ready = data.readyToPlay;
            if (hostChoice && playerChoice) {
                updateDoc(docRef, {
                    readyToPlay: {
                        host: false,
                        player: false,
                    },
                });
                setFinishedBetting(true);
            }
            if (ready.host && ready.player) {
                setFinishedBetting(false);
                setHostChoice(null);
                setPlayerChoice(null);
            }
            if (!finishedBetting) {
                setHostChoice(hostChoice);
                setPlayerChoice(playerChoice);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [currentRoomId]);

    function getChoice(choice) {
        switch (choice) {
            case 1:
                return <Image src={iconRock} alt="rock" />;
            case 2:
                return <Image src={iconPaper} alt="paper" />;
            case 3:
                return <Image src={iconScissors} alt="scissors" />;
        }
    }

    function evaluateWinner(choice1, choice2) {
        if (choice1 === choice2) {
            return <b>Draw.</b>;
        }
        if ((choice1 - choice2 + 3) % 3 === 1) {
            return (
                <>
                    <b>Host</b>
                    <span> wins.</span>
                </>
            );
        }
        return (
            <>
                <b>Player</b>
                <span> wins.</span>
            </>
        );
    }

    return (
        <div className="rock-paper-scissors-game-container">
            <GameHeader />
            <Row className="game-state">
                <Col span={8} className="name">
                    Host: {hostChoice ? <CheckOutlined /> : <CloseOutlined />}
                </Col>
                <Col span={8}></Col>
                <Col span={8} className="name">
                    Player:{" "}
                    {playerChoice ? <CheckOutlined /> : <CloseOutlined />}
                </Col>
                <Col span={8}>
                    <div className="choice">
                        {finishedBetting && getChoice(hostChoice)}
                    </div>
                </Col>
                <Col span={8} style={{ flexDirection: "column" }}>
                    {finishedBetting && (
                        <>
                            <p style={{ fontSize: "1.5rem" }}>
                                {evaluateWinner(hostChoice, playerChoice)}
                            </p>
                            <Button
                                style={{
                                    color: "black",
                                    border: "1px solid black",
                                }}
                                onClick={async () => {
                                    const docRef = doc(
                                        db,
                                        "rooms",
                                        currentRoomId
                                    );
                                    const data = (await getDoc(docRef)).data();
                                    const currentHost = data.host_id;
                                    const currentPlayer = data.player_id;
                                    console.log(currentHost, currentPlayer);
                                    if (auth.currentUser.uid === currentHost) {
                                        updateDoc(docRef, {
                                            "betting.host": {
                                                bet: 0,
                                                choice: 0,
                                            },
                                            "readyToPlay.host": true,
                                        });
                                    } else if (
                                        auth.currentUser.uid === currentPlayer
                                    ) {
                                        updateDoc(docRef, {
                                            "betting.player": {
                                                bet: 0,
                                                choice: 0,
                                            },
                                            "readyToPlay.player": true,
                                        });
                                    }
                                }}
                            >
                                Play Again
                            </Button>
                        </>
                    )}
                </Col>
                <Col span={8}>
                    <div className="choice">
                        {finishedBetting && getChoice(playerChoice)}
                    </div>
                </Col>
            </Row>
        </div>
    );
}
