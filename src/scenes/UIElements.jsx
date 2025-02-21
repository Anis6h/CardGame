export const createUIElements = (scene) => {
  // Background color for better visibility
  scene.add.rectangle(scene.scale.width / 2, scene.scale.height / 2, 1200, 700, 0x191970);

  // Centering the game table
  const table = scene.add.image(scene.scale.width / 2, scene.scale.height / 2, "table").setScale(0.7);

  // Start Button (Positioned at the top center)
  const startButton = scene.add.text(scene.scale.width / 2, 30, "Start Game", {
    fontSize: "16px",
    backgroundColor: "#28a745",
    padding: { x: 15, y: 8 },
    color: "#fff",
    fontStyle: "bold",
    borderRadius: "5px",
  })
    .setInteractive()
    .on("pointerdown", () => scene.startGame())
    .setOrigin(0.5);

  // Store reference in scene
  scene.startButton = startButton;

  // Team Score Display (Top-right corner)
  scene.teamScores = {
    teamA: 0,
    teamB: 0,
    teamAText: scene.add.text(scene.scale.width - 150, 30, "Team A: 0", {
      fontSize: "18px",
      color: "#FFD700",
      fontStyle: "bold",
    }),
    teamBText: scene.add.text(scene.scale.width - 150, 60, "Team B: 0", {
      fontSize: "18px",
      color: "#FFD700",
      fontStyle: "bold",
    }),
  };
};

// Function to create player positions dynamically with two teams
export const createPlayerPositions = (scene) => {
  const centerX = scene.scale.width / 2;
  const centerY = scene.scale.height / 2;
  const radius = 280; // Adjusted for better spacing

  // Define teams (partners sit opposite each other)
  const players = [
    { angle: -90, name: "Player 1", adjustY: -27, team: "A" }, // Team A
    { angle: 0, name: "Player 2", adjustX: 95, adjustY: -50,team: "B" }, // Team B
    { angle: 90, name: "Player 3", adjustY: -140, team: "A" }, // Team A
    { angle: 180, name: "Player 4", adjustX: -95,adjustY: -50, team: "B" }, // Team B
  ];

  return players.map((pos, index) => {
    const radians = Phaser.Math.DegToRad(pos.angle);
    let x = centerX + radius * Math.cos(radians);
    let y = centerY + radius * Math.sin(radians);

    // Apply manual adjustments
    if (pos.adjustX) x += pos.adjustX;
    if (pos.adjustY) y += pos.adjustY;

    // Player Avatar
    const playerSprite = scene.add.image(x, y, pos.imageKey).setScale(0.6);

    // Player Name Text (no individual scores, only team scores now)
    const playerNameText = scene.add.text(x, y + 40, pos.name, {
      fontSize: "18px",
      color: "#FFFFFF",
      fontStyle: "bold",
    }).setOrigin(0.5);

    return {
      ...pos,
      index,
      x,
      y,
      sprite: playerSprite,
      nameText: playerNameText,
    };
  });
};
