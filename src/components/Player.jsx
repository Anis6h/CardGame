import React from "react";

const Player = ({ name, position }) => {
  return (
    <div className="player" style={{ left: position.x, top: position.y }}>
      <p>{name}</p>
    </div>
  );
};

export default Player;
