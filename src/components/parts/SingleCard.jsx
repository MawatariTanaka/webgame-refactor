import React from "react";
import "../../styles/SingleCard.css";
import cardCover from "../../images/memory_game/bg1.png"

const SingleCard = ({ card, click, flipped, choicing }) => {
  return (
    <div className="cardItem">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="" />
        <img
          onClick={() => {
            if (!choicing){
                click(card)
            }
          }}
          className="back"
          src={cardCover}
          alt=""
        />
      </div>
    </div>
  );
};

export default SingleCard;
