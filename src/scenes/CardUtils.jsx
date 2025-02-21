import Phaser from "phaser";

export const shuffleDeck = (scene) => {
  const suits = ["spades", "hearts", "diamonds", "clubs"];
  const ranks = ["J", "9", "A", "10", "K", "Q", "8", "7"];

  scene.deck = [];
  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      scene.deck.push({ suit, rank, id: `${rank}_of_${suit}` });
    });
  });

  Phaser.Utils.Array.Shuffle(scene.deck);
};

export const playCard = (scene, player, card) => {
  // Remove the card from the player's hand after playing
  const cardIndex = player.cards.indexOf(card);
  if (cardIndex !== -1) {
    player.cards.splice(cardIndex, 1);
  }

  // Optionally, update the display of cards in the player's hand here
  // For example, you can visually update the player's hand after playing the card.
};

export const handleCardSelection = (scene, player, card) => {
  if (!scene.biddingCompleted) {
    console.warn("❌ Bidding is not yet completed. Players cannot play cards.");
    return;
  }

  console.log(`Card selected: ${card.rank} of ${card.suit}`);

  if (scene.currentTrick.some(c => c.player === player)) {
    console.warn(`${player.name} has already played a card in this trick.`);
    return;
  }

  playCard(scene, player, card);

  // Calculate position for the card on the table
  const trickIndex = scene.currentTrick.length; // Get the index of the card in the trick
  const cardSpacing = 80; // Adjust space between cards
  const tableCenterX = scene.scale.width / 2;
  const tableCenterY = scene.scale.height / 2;

  scene.tweens.add({
    targets: card.sprite,
    x: tableCenterX - (1.7 * cardSpacing) + trickIndex * cardSpacing, // 2.7 on the right side
    y: tableCenterY,
    duration: 500,
    ease: "Power2",
    onComplete: () => {
      console.log(`${card.rank} of ${card.suit} placed on the table.`);
    }
  });

  // Add card to the current trick
  scene.currentTrick.push({ player, card });

  // Move to next player
  scene.moveToNextPlayer();

  // If all players have played a card, determine the trick winner
  if (scene.currentTrick.length === 4) {
    scene.determineTrickWinner(scene.currentTrick);
  }
};

export const updateTeamScores = (scene) => {
  scene.teamScores.teamAText.setText(`Team A: ${scene.teamScores.teamA}`);
  scene.teamScores.teamBText.setText(`Team B: ${scene.teamScores.teamB}`);
};

export const dealInitialCards = (scene) => {
  scene.players.forEach((player) => {
    player.cards = [];
    const cardSpacing = 64;
    const cardOffsetY = 5;

    for (let i = 0; i < 4; i++) {
      const assignedCard = scene.deck.pop();
      player.cards.push(assignedCard);

      // ✅ Check if the card ID is correct
      console.log(`Dealing card: ${assignedCard.rank} of ${assignedCard.suit} to ${player.name}`);

      // Create card sprite at player's position
      const cardSprite = scene.add.image(500, 300, assignedCard.id)

        .setScale(0.12) // Cards size chnages
        .setInteractive(); // ✅ Make it clickable

      // ✅ Log to confirm sprite exists
      console.log(`Card Sprite Created:`, cardSprite);

      // Attach the sprite to the card object
      assignedCard.sprite = cardSprite;

      // ✅ Set the click event
      cardSprite.on('pointerdown', () => {
        console.log(`Clicked on: ${assignedCard.rank} of ${assignedCard.suit}`);
        handleCardSelection(scene, player, assignedCard);
      });

      // Animate the card moving to player's position
      scene.tweens.add({
        targets: cardSprite,
        x: player.x - (1.5 * cardSpacing) + i * cardSpacing,
        y: player.y + 100 + cardOffsetY,
        duration: 500,
        ease: "Power2",
      });
    }
  });
};

export const dealExtraCards = (scene) => {
  scene.players.forEach((player) => {
    player.extraCards = player.extraCards || [];
    const cardSpacing = 63;
    const cardOffsetY = 20; // More spacing for extra cards

    for (let i = 0; i < 4; i++) {
      const assignedCard = scene.deck.pop();
      player.extraCards.push(assignedCard);

      // Display the actual card image
      const cardSprite = scene.add.image(500, 300, assignedCard.id)
        .setScale(0.12) // Cards size change
        .setVisible(true)
        .setInteractive(); // ✅ Make extra card interactive

      // ✅ Set click event for the extra cards
      cardSprite.on('pointerdown', () => {
        console.log(`Clicked on extra card: ${assignedCard.rank} of ${assignedCard.suit}`);
        handleCardSelection(scene, player, assignedCard);
      });

      scene.tweens.add({
        targets: cardSprite,
        x: player.x - (1.5 * cardSpacing) + i * cardSpacing,
        y: player.y + 130 + cardOffsetY, // Added extra spacing
        duration: 500,
        ease: "Power2",
      });

      assignedCard.sprite = cardSprite;
    }
  });
};


// New function to flip the cards of the player who selected the trump suit
export const flipPlayerCards = (scene, player) => {
  player.cards.forEach(card => {
    if (card.sprite) {
      // Flip the card to show the backside
      card.sprite.setTexture('cardBack');
    }
  });
};