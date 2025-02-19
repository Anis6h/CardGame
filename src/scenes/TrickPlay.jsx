export const playCard = (scene, player, selectedCard) => {
    if (scene.players[scene.currentPlayerIndex] !== player) return;

    // Ensure the player follows the lead suit
    if (scene.currentTrick.length === 0) {
        scene.leadSuit = selectedCard.suit; // Set lead suit
    } else if (player.cards.some(card => card.suit === scene.leadSuit) && selectedCard.suit !== scene.leadSuit) {
        console.log(`${player.name} must follow the lead suit.`);
        return;
    }

    // Play the card on the table
    scene.add.image(400 + scene.currentTrick.length * 50, 250, selectedCard.id).setScale(0.2);

    // Remove card from player's hand
    player.cards = player.cards.filter(card => card.id !== selectedCard.id);

    // Add to current trick
    scene.currentTrick.push({ player, card: selectedCard });

    // Move to the next player or resolve the trick
    if (scene.currentTrick.length === 4) {
        resolveTrick(scene);
    } else {
        moveToNextPlayer(scene);
    }
};

  
  const playerHasLeadSuit = (player, leadSuit) => {
    return player.cards.some((card) => card.suit === leadSuit);
  };
  
  const displayPlayedCard = (scene, player, card) => {
    scene.add.image(player.x, player.y - 50, card.id).setScale(0.2);
  };
  
  const moveToNextPlayer = (scene) => {
    scene.currentPlayerIndex = (scene.currentPlayerIndex + 1) % 4;
    console.log(`Next player: ${scene.players[scene.currentPlayerIndex].name}`);
  };
  
  const resolveTrick = (scene) => {
    const winner = determineTrickWinner(scene, scene.currentTrick);
    console.log(`${winner.name} wins the trick!`);

    // Assign trick to winning team
    scene.tricksWon[winner.team]++;

    // Reset trick
    scene.currentTrick = [];
    scene.currentPlayerIndex = winner.index;

    if (scene.tricksPlayed === 8) {
        endRound(scene);
    } else {
        scene.tricksPlayed++;
        console.log(`Starting trick ${scene.tricksPlayed + 1}`);
    }
};

  
  const endRound = (scene) => {
    console.log("Round Over. Calculating scores...");
    calculateScores(scene);
  };
  
  const calculateScores = (scene) => {
    let team1Score = 0, team2Score = 0;

    Object.keys(scene.tricksWon).forEach((team) => {
        const tricks = scene.tricksWon[team];
        team === "Team1" ? (team1Score += tricks * 1) : (team2Score += tricks * 1);
    });

    console.log(`Final Scores - Team 1: ${team1Score}, Team 2: ${team2Score}`);

    if (scene.highestBidder.team === "Team1" && team1Score >= scene.highestBid) {
        console.log("Team 1 meets the bid! +1 Point");
    } else if (scene.highestBidder.team === "Team2" && team2Score >= scene.highestBid) {
        console.log("Team 2 meets the bid! +1 Point");
    } else {
        console.log(`${scene.highestBidder.team} failed to meet the bid. -1 Point`);
    }
};

  
  const getCardPoints = (card) => {
    const points = { J: 3, 9: 2, A: 1, 10: 1, K: 0, Q: 0, 8: 0, 7: 0 };
    return points[card.rank] || 0;
  };
  