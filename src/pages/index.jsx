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
                        <div>
                            <img
                                className="game-card-img-cover"
                                alt="Rock Paper Scissors Game preview"
                                src={rockPaperScissorsCoverImg}
                                style={{ padding: "1rem" }}
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
