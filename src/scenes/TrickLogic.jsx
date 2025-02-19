export const determineTrickWinner = (scene, playedCards) => {
    if (playedCards.length !== 4) return null; // Wait until all 4 cards are played
  
    const leadSuit = playedCards[0].suit;
    let highestCard = playedCards[0];
    let winningPlayer = playedCards[0].player;
  
    playedCards.forEach((card) => {
      if (
        card.suit === highestCard.suit &&
        getCardRank(card.rank) > getCardRank(highestCard.rank)
      ) {
        highestCard = card;
        winningPlayer = card.player;
      } else if (card.suit === scene.trumpSuit && highestCard.suit !== scene.trumpSuit) {
        highestCard = card;
        winningPlayer = card.player;
      }
    });
  
    scene.tricksWon[winningPlayer.team]++;
    return winningPlayer;
  };
  
  export const getCardRank = (rank) => {
    const rankOrder = { J: 7, 9: 6, A: 5, 10: 4, K: 3, Q: 2, 8: 1, 7: 0 };
    return rankOrder[rank] || 0;
  };
  