export const promptTrumpSelection = (scene) => {
    if (!scene.highestBidder) return;
  
    const suits = ["spades", "hearts", "diamonds", "clubs"];
    let xOffset = scene.highestBidder.x - 50;
    let suitButtons = [];
  
    suits.forEach((suit) => {
      const suitButton = scene.add.text(xOffset, scene.highestBidder.y - 100, suit.toUpperCase(), {
        fontSize: "12px",
        backgroundColor: "#ffa500",
        padding: { x: 10, y: 5 },
        color: "#000",
      })
        .setInteractive()
        .on("pointerdown", () => {
          scene.trumpSuit = suit;
          suitButtons.forEach((btn) => btn.destroy());
          scene.dealExtraCards();
        });
  
      suitButtons.push(suitButton);
      xOffset += 100;
    });
  };
  