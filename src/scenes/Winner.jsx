export const determineTrickWinner = (scene, playedCards) => {
  if (!playedCards.length) {
    console.error("❌ No cards played in this trick.");
    return null;
  }

  let winningCard = playedCards[0]?.card; 
  let winningPlayer = playedCards[0]?.player;
  determineWinner
  if (!winningCard || !winningPlayer) {
    console.error("❌ Invalid card or player in trick.");
    return null;
  }

  playedCards.forEach(({ card, player }) => {
    if (!card || !card.rank || !scene.cardRankings[card.rank]) {
      console.error(`❌ Invalid card detected:`, card);
      return;
    }

    if (card.suit === scene.trumpSuit || scene.cardRankings[card.rank] > scene.cardRankings[winningCard.rank]) {
      winningCard = card;
      winningPlayer = player;
    }
  });

  return winningPlayer;
};


export const determineWinner = (scene) => {
  // Determine the overall winner based on the team with most tricks
  const winningTeam = scene.tricksWon.Team1 > scene.tricksWon.Team2 ? "Team1" : "Team2";
  console.log(`${winningTeam} wins the game!`);
};
