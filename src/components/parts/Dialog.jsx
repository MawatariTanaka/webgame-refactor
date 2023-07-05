import React, { useContext, useEffect, useState } from "react";
import "../../styles/Dialog.css";
import { AppContext } from "../../contexts/AppContext";
import { Button, Col, Row, Slider } from "antd";
import {
    SoundOutlined
} from '@ant-design/icons';

const Dialog = (probs) => {
    const { showDialog, statusGame } = useContext(AppContext);
    const [style, setStyle] = useState({});

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    useEffect(() => {
        console.log("dialog", windowWidth, windowHeight);
        showDialog
            ? setStyle({
                opacity: 1,
                top: `${0}px`,
                width: `${windowWidth}px`,
                height: `${windowHeight}px`,
            })
            : setStyle({ width: `${0}px`, height: `${0}px` });
    }, [showDialog]);

    return (
        <div className="dialog" style={style}>
            {statusGame === "menu" && <DialogMenu probs={probs} />}
            {statusGame === "pause" && <DialogMenu probs={probs} />}
            {statusGame === "setting" && <DialogSetting probs={probs} />}
            {statusGame === "game_over" && <DialogGameOver probs={probs} />}
            {statusGame === "win" && <DialogWin probs={probs} />}
        </div>
    );
};

export default Dialog;

const DialogMenu = (probs) => {
    const { shuffleCards, handleResumeGame } = probs.probs;
    const { setStatusGame, statusGame } = useContext(AppContext);
    return (
        <div className="dialog-menu">
            <h1>Memory Game</h1>
            <Button
                style={{
                    fontSize: "20px",
                    height: "40px",
                }}
                onClick={() =>
                    statusGame === "menu" ? shuffleCards() : handleResumeGame()
                }
            >
                {statusGame === "menu" ? "Play Game" : "Resume Game"}
            </Button>
            <Button
                onClick={() => {
                    setStatusGame("setting");
                }}
            >
                Setting
            </Button>
        </div>
    );
};

const IconSlider = (props) => {
    const { volume, setVolume } = useContext(AppContext);

    const { max, min } = props;
    const [value, setValue] = useState(0);
    const mid = Number(((max - min) / 2).toFixed(5));
    const preColorCls = volume >= mid ? '' : 'icon-wrapper-active';
    const nextColorCls = volume >= mid ? 'icon-wrapper-active' : '';
    return (
        <div className="icon-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <SoundOutlined className={nextColorCls} style={{ fontSize: '30px' }} />
            </div>
            <Slider {...props} onChange={setVolume} value={volume} style={{ width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
        </div>
    );
};

const DialogSetting = (probs) => {
    const { setStatusGame } = useContext(AppContext);
    return (
        <div className="dialog-menu">
            <h1> Setting </h1>
            <Row style={{ width: '80%', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Col span={24}>
                    <IconSlider max={100} min={0} />
                </Col>
            </Row>
            <Button
                onClick={() => {
                    setStatusGame("menu");
                }}
            >
                Back
            </Button>
        </div>
    );
};

const DialogGameOver = (probs) => {
    const { setStatusGame } = useContext(AppContext);
    return (
        <div className="dialog-menu">
            <h1>Game Over</h1>
            <Button
                onClick={() => {
                    setStatusGame("menu");
                }}
            >
                New Game
            </Button>
            <Button
                onClick={() => {
                    setStatusGame("menu");
                }}
            >
                Lưu kết quả
            </Button>
        </div>
    );
};

const DialogWin = () => {
    const { setStatusGame } = useContext(AppContext);
    return (
        <div className="dialog-menu">
            <h1>Chiến thắng</h1>
            <div>
                <Button
                    onClick={() => {
                        setStatusGame("menu");
                    }}
                >
                    Màn kế tiếp
                </Button>
            </div>
        </div>
    );
};
