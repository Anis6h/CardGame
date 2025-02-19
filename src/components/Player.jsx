import React, { useState } from "react";

const Player = ({ name, position, onBidSelected, isBiddingPhase, currentBid, isBidWinner }) => {
  const [bidValue, setBidValue] = useState(16);
  const [showTrumpOptions, setShowTrumpOptions] = useState(false);
  const [selectedTrump, setSelectedTrump] = useState(null);

  const handleBidChange = (event) => {
    setBidValue(event.target.value);
  };

  const handleBidSubmit = () => {
    onBidSelected(bidValue);
  };

  const handlePass = () => {
    onBidSelected("pass");
  };

  const handleTrumpSelection = (suit) => {
    setSelectedTrump(suit);
    onBidSelected(suit); // Send the trump suit to the parent component or game logic
  };

  return (
    <div className="player" style={{ left: position.x, top: position.y }}>
      <p>{name}</p>
      <div className="bidding-options">
        {isBiddingPhase && currentBid === 16 && !isBidWinner && (
          <>
            <input
              type="number"
              min="16"
              value={bidValue}
              onChange={handleBidChange}
              disabled={!isBiddingPhase}
            />
            <button onClick={handleBidSubmit} disabled={!isBiddingPhase}>
              Bid
            </button>
            <button onClick={handlePass} disabled={!isBiddingPhase}>
              Pass
            </button>
          </>
        )}
        {isBidWinner && (
          <>
            <button onClick={() => handleTrumpSelection('spades')}>Spades</button>
            <button onClick={() => handleTrumpSelection('hearts')}>Hearts</button>
            <button onClick={() => handleTrumpSelection('diamonds')}>Diamonds</button>
            <button onClick={() => handleTrumpSelection('clubs')}>Clubs</button>
          </>
        )}
      </div>
    </div>
  );
};
export default Player;

