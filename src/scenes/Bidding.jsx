export const startBiddingPhase = (scene) => {
  // Identify dealer and start bidding with the next player (clockwise)
  const dealerIndex = scene.players.findIndex(player => player.name === "Player 4"); 
  scene.currentBidderIndex = (dealerIndex + 1) % scene.players.length;

  scene.bids = [];
  scene.highestBid = 15;
  scene.highestBidder = null;
  promptBid(scene);
};

  
  export const promptBid = (scene) => {
    const currentPlayer = scene.players[scene.currentBidderIndex];
    let bidValue = scene.highestBid; // Start from current highest bid
   
  
    const bidText = scene.add.text(currentPlayer.x+ 10, currentPlayer.y - 30, `Bid: ${bidValue}`, {
      fontSize: "12px",
      color: "#FFFF00",
      fontStyle: "bold",
    }).setOrigin(0.5,0.5);
  
    const increaseBidButton = scene.add.text(currentPlayer.x - 40, currentPlayer.y - 40, "▲", {
      fontSize: "12px",
      backgroundColor: "#28a745",
      padding: { x: 5, y: 5 },
      color: "#000",
    })
      .setInteractive()
      .on("pointerdown", () => {
        if (bidValue < 28) {
          bidValue++;
          bidText.setText(`Bid: ${bidValue}`);
        }
      });
  
    const bidButton = scene.add.text(currentPlayer.x - 50, currentPlayer.y - 10, "Bid", {
      fontSize: "12px",
      backgroundColor: "#28a745",
      padding: { x: 10, y: 5 },
      color: "#000",
    })
      .setInteractive()
      .on("pointerdown", () => {
        if (bidValue > scene.highestBid) {  // Ensure the bid is higher than the current highest bid
          handleBid(scene, currentPlayer, bidValue);
          bidText.destroy();
          increaseBidButton.destroy();
          bidButton.destroy();
          passButton.destroy();
        }
      });
  // y moved to down
    const passButton = scene.add.text(currentPlayer.x + 50, currentPlayer.y - 10, "Pass", {
      fontSize: "12px",
      backgroundColor: "#dc3545",
      padding: { x: 10, y: 5 },
      color: "#fff",
    })
      .setInteractive()
      .on("pointerdown", () => {
        handleBid(scene, currentPlayer, null);
        bidText.destroy();
        increaseBidButton.destroy();
        bidButton.destroy();
        passButton.destroy();
      });
  };
  

  export const endBiddingPhase = (scene) => {
    console.log("Bidding phase ended. Highest Bid:", scene.highestBid, "by", scene.highestBidder);
    
    if (scene.highestBidder) {
      scene.promptTrumpSelection();  // Proceed to trump selection if there is a valid bidder
    } else {
      console.log("No valid bids, restarting bidding phase.");
      scene.startBiddingPhase();  // Restart bidding if no valid bids
    }
  };
  export const handleBid = (scene, player, bidValue) => {
    if (bidValue !== null && bidValue > scene.highestBid) {
      scene.highestBid = bidValue;
      scene.highestBidder = player;
    }
  
    scene.currentBidderIndex++;
  
    if (scene.currentBidderIndex >= scene.players.length) {
      scene.endBiddingPhase();
    } else {
      promptBid(scene);
    }
  };
  