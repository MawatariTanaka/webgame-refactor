import React from "react";
import { Card, Col } from "antd";
import { useNavigate } from "react-router-dom";
import memoryGameCoverImg from "../images/memory_game/preview.png";
import rockPaperScissorsCoverImg from "../images/rock_paper_scissors/image-rules.svg";
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="card-container">
            <Col>
                <Card
                    className="game-card"
                    hoverable
                    cover={
                        <img
                            className="game-card-img-cover"
                            alt="Memory game preview"
                            src={memoryGameCoverImg}
                        />
                    }
                    onClick={() => {
                        navigate("/memory-game");
                    }}
                >
                    Memory Game
                </Card>
            </Col>

            <Col>
                <Card
                    className="game-card"
                    hoverable
                    cover={
                        <div style={{
                            height: '240px',
                            padding: '0px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#659FA0',
                            borderRadius: '10px 10px 0px 0px'
                        }}>
                            <img style={{width: '220px', height: '220px'}}
                                alt="Rock Paper Scissors Game preview"
                                src={rockPaperScissorsCoverImg}
                            />
                        </div>
                    }
                    onClick={() => {
                        navigate("/rock-paper-scissors-game");
                    }}
                >
                    Rock Paper Scissors Game
                </Card>
            </Col>
        </div>
    );
};

export default Home;
