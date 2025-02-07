// import Phaser from "phaser";

// class GameScene extends Phaser.Scene {
//   constructor() {
//     super({ key: "GameScene" });
//   }

//   create() {
//     // Add Background Color (Replacing Black with #191970)
//     this.add.rectangle(500, 300, 1000, 600, 0x191970); 

//     // Add Table Background
//     this.add.image(500, 350, "table").setScale(0.8);

//     // Add Start Game Button
//     const startButton = this.add.text(500, 160, "Start Game", {
//       fontSize: "13px",
//       backgroundColor: "#28a745",
//       padding: { x: 10, y: 5 },
//       color: "#000",
//       fontStyle: "bold",
//     })
//     .setInteractive()
//     .on("pointerdown", () => {
//       console.log("Game Started!");
//       this.dealCards();
//     })
//     .setOrigin(0.5);

//     // Add Dealer Image BELOW the Start Button
//     this.add.image(500, 70, "dealer").setScale(0.4);

//     // Define Player Positions at Four Corners
//     const playerPositions = [
//       { x: 100, y: 150, name: "Player 1", imageKey: "player1" }, // Top-Left
//       { x: 900, y: 150, name: "Player 2", imageKey: "player2" }, // Top-Right
//       { x: 100, y: 450, name: "Player 3", imageKey: "player3" }, // Bottom-Left
//       { x: 900, y: 450, name: "Player 4", imageKey: "player4" }, // Bottom-Right
//     ];

//     // Add Players to the Table
//     playerPositions.forEach((pos) => {
//       // Player Rectangle (Seat)
//       this.add.rectangle(pos.x, pos.y, 80, 30, 0x444444);
//       // Player Name
//       this.add.text(pos.x - 20, pos.y - 5, pos.name, {
//         fontSize: "10px",
//         color: "#fff",
//       });

//       // Add Player Image
//       this.add.image(pos.x, pos.y - 66, pos.imageKey).setScale(0.1);

//       // Deal Three Face-Down Cards to Each Player with spacing
//       for (let i = 0; i < 3; i++) {
//         this.add.image(pos.x - 60 + i * 60, pos.y + 60, "cardBack").setScale(0.15);
//       }
//     });
//   }

//   dealCards() {
//     console.log("Dealing Cards...");
//     // Logic for dealing random cards from the deck
//   }
// }

// export default GameScene;


import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    this.cards = []; // Store card references
    this.deck = []; // Deck of cards
    this.revealedCards = []; // Track revealed cards
  }

  create() {
    this.add.rectangle(500, 300, 1000, 600, 0x191970); // Background
    this.add.image(500, 350, "table").setScale(0.8); // Table image

    // Start Game Button
    const startButton = this.add.text(500, 160, "Start Game", {
      fontSize: "13px",
      backgroundColor: "#28a745",
      padding: { x: 10, y: 5 },
      color: "#000",
      fontStyle: "bold",
    })
    .setInteractive()
    .on("pointerdown", () => {
      console.log("Game Started!");
      this.shuffleDeck();
      this.dealCards();
    })
    .setOrigin(0.5);

    this.add.image(500, 70, "dealer").setScale(0.4); // Dealer image

    // Player Positions
    this.playerPositions = [
      { x: 100, y: 150, name: "Player 1", imageKey: "player1" },
      { x: 900, y: 150, name: "Player 2", imageKey: "player2" },
      { x: 100, y: 450, name: "Player 3", imageKey: "player3" },
      { x: 900, y: 450, name: "Player 4", imageKey: "player4" },
    ];

    // Add Players
    this.playerPositions.forEach((pos) => {
      this.add.rectangle(pos.x, pos.y, 80, 30, 0x444444);
      this.add.text(pos.x - 20, pos.y - 5, pos.name, { fontSize: "10px", color: "#fff" });
      this.add.image(pos.x, pos.y - 66, pos.imageKey).setScale(0.1);

      // Create Three Hidden Cards per Player
      for (let i = 0; i < 3; i++) {
        const card = this.add.image(500, 300, "cardBack").setScale(0.15).setVisible(false).setInteractive();
        this.cards.push({ sprite: card, targetX: pos.x - 60 + i * 60, targetY: pos.y + 60, actualCard: null });
      }
    });
  }

  shuffleDeck() {
    const suits = ["spades", "hearts", "diamonds", "clubs"];
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    
    this.deck = [];
    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        this.deck.push(`${rank}_of_${suit}`);
      });
    });

    // Shuffle Deck
    Phaser.Utils.Array.Shuffle(this.deck);
  }

  dealCards() {
    console.log("Dealing Cards...");

    this.cards.forEach((card, index) => {
      const assignedCard = this.deck.pop(); // Get a random card
      card.actualCard = assignedCard;

      this.time.delayedCall(index * 200, () => {
        card.sprite.setVisible(true);
        this.tweens.add({
          targets: card.sprite,
          x: card.targetX,
          y: card.targetY,
          duration: 500,
          ease: "Power2",
          onComplete: () => {
            card.sprite.setInteractive().on("pointerdown", () => {
              this.revealCard(card);
            });
          },
        });
      });
    });
  }

  revealCard(card) {
    if (card.actualCard) {
      // Calculate new position with spacing
      const revealSpacing = 160; // Space between revealed cards
      const revealCenterX = 379; // Center X position
      const revealY = 350; // Y position of revealed cards

      // Find index for spacing
      let revealX = revealCenterX - (this.revealedCards.length * revealSpacing) / 2 + this.revealedCards.length * revealSpacing;

      this.revealedCards.push(card);

      this.tweens.add({
        targets: card.sprite,
        x: revealX, // Set spaced out position
        y: revealY,
        duration: 500,
        ease: "Power2",
        onComplete: () => {
          card.sprite.setTexture(card.actualCard);
        },
      });
    }
  }
}

export default GameScene;
