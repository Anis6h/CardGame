import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
// import BootScene from "../scenes/BootScene";
import PreloadScene from "../scenes/PreloadScene";
import GameScene from "../scenes/GameScene";
import "./GameBoard.css";

const GameBoard = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 1000,
      height: 600,
      parent: gameRef.current,
      scene: [ PreloadScene, GameScene],
    };

    const game = new Phaser.Game(config);
    return () => game.destroy(true);
  }, []);

  return  <div className="game-container">
  <div ref={gameRef} />
</div>;
};

export default GameBoard;

