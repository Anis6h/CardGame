export const createUIElements = (scene) => {
  scene.add.rectangle(500, 300, 1000, 600, 0x191970);
  scene.add.image(500, 350, "table").setScale(0.8);

  const startButton = scene.add.text(500, 160, "Start Game", {
    fontSize: "13px",
    backgroundColor: "#28a745",
    padding: { x: 10, y: 5 },
    color: "#000",
    fontStyle: "bold",
  })
    .setInteractive()
    .on("pointerdown", () => scene.startGame())
    .setOrigin(0.5);
};

export const createPlayerPositions = (scene) => {
  const playerPositions = [
      { x: 100, y: 150, name: "Player 1", imageKey: "player1" },
      { x: 900, y: 150, name: "Player 2", imageKey: "player2" },
      { x: 100, y: 450, name: "Player 3", imageKey: "player3" },
      { x: 900, y: 450, name: "Player 4", imageKey: "player4" },
  ];

  return playerPositions.map((pos, index) => {
      const playerSprite = scene.add.image(pos.x, pos.y, pos.imageKey).setScale(0.5);
      const playerNameText = scene.add.text(pos.x, pos.y + 50, pos.name, { fontSize: "16px", color: "#FFFFFF", fontStyle: "bold" }).setOrigin(0.5);

      // Add score text above player
      const scoreText = scene.add.text(pos.x, pos.y - 50, `Score: 0`, { fontSize: "18px", color: "#FFD700", fontStyle: "bold" }).setOrigin(0.5);

      return {
          ...pos,
          index,
          sprite: playerSprite,
          nameText: playerNameText,
          scoreText, // Store score text reference
          score: 0, // Initialize score
      };
  });
};
