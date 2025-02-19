import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import PreloadScene from "../scenes/PreloadScene";
import GameScene from "../scenes/GameScene";
import "./GameBoard.css";

const GameBoard = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current && gameRef.current.children.length > 0) {
      gameRef.current.innerHTML = ""; // Ensure no duplicate Phaser instance
    }

    const config = {
      type: Phaser.AUTO,
      width: 1100, // Increased width
      height: 700, // Increased height
      parent: gameRef.current,
      scene: [PreloadScene, GameScene],
      scale: {
        mode: Phaser.Scale.FIT, // Auto-fit within the container
        autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game
      },
      backgroundColor: "#191970", // Ensure background color
    };

    const game = new Phaser.Game(config);

    return () => game.destroy(true);
  }, []);

  return (
    <div className="game-container">
      <div ref={gameRef} className="game-box" />
    </div>
  );
};

export default GameBoard;

