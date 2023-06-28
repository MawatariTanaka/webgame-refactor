import React from 'react';
import { Card, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import memoryGameCoverImg from '../images/memory_game/preview.png';
import rockPaperScissorsCoverImg from '../images/rock_paper_scissors/image-rules.svg';
import '../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="card-container">
            <Col>
                <Card
                    className="game-card"
                    hoverable
                    cover={<img alt="Memory game preview" src={memoryGameCoverImg} />}
                    onClick={() => {
                        navigate('/memory-game');
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
                        
                            <img
                                alt="Rock Paper Scissors Game preview"
                                src={rockPaperScissorsCoverImg}
                            />
                    }
                    onClick={() => {
                        navigate('/rock-paper-scissors-game');
                    }}
                >
                    Rock Paper Scissors Game
                </Card>
            </Col>
        </div>
    );
};

export default Home;
