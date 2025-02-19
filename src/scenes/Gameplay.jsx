import { playCard } from "./CardUtils";
import { determineTrickWinner } from "./Winner";

export const handleCardSelection = (scene, player, selectedCard) => {
  console.log(`handleCardSelection called for ${selectedCard.rank} of ${selectedCard.suit}`);

  if (scene.currentPlayer !== player) {
    console.log(`Not ${player.name}'s turn. Current turn: ${scene.currentPlayer.name}`);
    return;
  }

  if (!selectedCard.sprite) {
    console.log("❌ ERROR: selectedCard.sprite is undefined!");
    return;
  }

  console.log(`✅ Card sprite exists at (${selectedCard.sprite.x}, ${selectedCard.sprite.y})`);

  // Ensure table position exists
  if (!scene.table) {
    console.log("❌ ERROR: scene.table is undefined! Using default position.");
    scene.table = { x: 500, y: 350 };
  }

  console.log(`✅ Moving card to table at (${scene.table.x}, ${scene.table.y})`);

  // Add a debug tint
  selectedCard.sprite.setTint(0xff0000); // 🔴 Turns red

  // Ensure sprite is visible
  selectedCard.sprite.setVisible(true);

  // 🔹 Debug log before tween
  console.log(`🚀 Starting tween animation...`);

  // Animate card moving to center
  scene.tweens.add({
    targets: selectedCard.sprite,
    x: scene.table.x,
    y: scene.table.y,
    duration: 500,
    ease: "Power2",
    onUpdate: function (tween) {
      console.log(`🔄 Tween running: (${selectedCard.sprite.x}, ${selectedCard.sprite.y})`);
    },
    onComplete: () => {
      console.log(`✅ Tween complete: Card ${selectedCard.rank} moved to table`);
      selectedCard.sprite.clearTint(); // Remove tint after moving
    }
  });

  // Remove card from player's hand
  player.cards = player.cards.filter(card => card !== selectedCard);
  console.log(`${player.name}'s remaining cards:`, player.cards);
};



// Function to resolve the trick and determine the winner
export const resolveTrick = (scene) => {
  const trickWinner = determineTrickWinner(scene, scene.currentTrick);
  scene.tricksWon[trickWinner.team]++;
  scene.tricksPlayed++;

  console.log(`${trickWinner.name} wins this trick!`);

  if (scene.tricksPlayed === 8) {
    scene.determineWinner();
  } else {
    scene.moveToNextPlayer();
  }
};
