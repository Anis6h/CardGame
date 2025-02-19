

// import Phaser from "phaser";

// class GameScene extends Phaser.Scene {
//   constructor() {
//     super({ key: "GameScene" });
//     this.cards = [];
//     this.deck = [];
//     this.revealedCards = [];
//     this.trumpSuit = null;
//     this.players = [];
//     this.currentBidderIndex = 0;
//     this.bids = [];
//     this.highestBid = 15;
//     this.highestBidder = null;
//   }

//   create() {
//   this.add.rectangle(500, 300, 1000, 600, 0x191970);
//   this.add.image(500, 350, "table").setScale(0.8);

//   const startButton = this.add.text(500, 160, "Start Game", {
//     fontSize: "13px",
//     backgroundColor: "#28a745",
//     padding: { x: 10, y: 5 },
//     color: "#000",
//     fontStyle: "bold",
//   })
//     .setInteractive()
//     .on("pointerdown", () => {
//       this.shuffleDeck();
//       this.assignTeams(); // Assign teams before starting
//       this.dealCards();
//       this.startBiddingPhase();
//     })
//     .setOrigin(0.5);

//   this.add.image(500, 70, "dealer").setScale(0.4);

//   this.playerPositions = [
//     { x: 100, y: 150, name: "Player 1", imageKey: "player1" },
//     { x: 900, y: 150, name: "Player 2", imageKey: "player2" },
//     { x: 100, y: 450, name: "Player 3", imageKey: "player3" },
//     { x: 900, y: 450, name: "Player 4", imageKey: "player4" },
//   ];

//   this.players = this.playerPositions.map((pos, index) => ({
//     ...pos,
//     bid: null,
//     index,
//     team: index % 2 === 0 ? "Team 1" : "Team 2", // Team 1 (P1 & P3), Team 2 (P2 & P4)
//   }));

//   this.playerPositions.forEach((pos) => {
//     this.add.rectangle(pos.x, pos.y, 80, 30, 0x444444);
//     this.add.text(pos.x - 20, pos.y - 5, pos.name, { fontSize: "10px", color: "#fff" });
//     this.add.image(pos.x, pos.y - 66, pos.imageKey).setScale(0.1);
//   });

//   console.log("Teams assigned:", this.players.map(p => ({ name: p.name, team: p.team })));
// }

// assignTeams() {
//   this.players.forEach((player, index) => {
//     player.team = index % 2 === 0 ? "Team 1" : "Team 2";
//   });

//   console.log("Teams Updated:", this.players.map(p => `${p.name} -> ${p.team}`));
// }
// promptBid() {
//   const currentPlayer = this.players[this.currentBidderIndex];

//   // Check if teammate has the highest bid
//   const teammate = this.players.find(
//     (p) => p.team === currentPlayer.team && p !== currentPlayer
//   );

//   if (teammate && teammate.bid >= this.highestBid) {
//     console.log(`${currentPlayer.name} passes because their teammate already has the highest bid.`);
//     this.handleBid(currentPlayer, null);
//     return;
//   }

//   let bidValue = this.highestBid; // Start at the current highest bid

//   const bidText = this.add.text(currentPlayer.x, currentPlayer.y - 100, `Bid: ${bidValue}`, {
//     fontSize: "12px",
//     color: "#fff",
//   }).setOrigin(0.5);

//   const increaseBidButton = this.add.text(currentPlayer.x - 40, currentPlayer.y - 80, "▲", {
//     fontSize: "12px",
//     backgroundColor: "#28a745",
//     padding: { x: 5, y: 5 },
//     color: "#000",
//   })
//     .setInteractive()
//     .on("pointerdown", () => {
//       if (bidValue < 28) {
//         bidValue++;
//         bidText.setText(`Bid: ${bidValue}`);
//       }
//     });

//   const decreaseBidButton = this.add.text(currentPlayer.x + 40, currentPlayer.y - 80, "▼", {
//     fontSize: "12px",
//     backgroundColor: "#dc3545",
//     padding: { x: 5, y: 5 },
//     color: "#000",
//   })
//     .setInteractive()
//     .on("pointerdown", () => {
//       if (bidValue > this.highestBid) {
//         bidValue--;
//         bidText.setText(`Bid: ${bidValue}`);
//       }
//     });

//   const bidButton = this.add.text(currentPlayer.x - 50, currentPlayer.y - 50, "Bid", {
//     fontSize: "12px",
//     backgroundColor: "#28a745",
//     padding: { x: 10, y: 5 },
//     color: "#000",
//   })
//     .setInteractive()
//     .on("pointerdown", () => {
//       this.handleBid(currentPlayer, bidValue);
//       bidText.destroy();
//       increaseBidButton.destroy();
//       decreaseBidButton.destroy();
//       bidButton.destroy();
//       passButton.destroy();
//     });

//   const passButton = this.add.text(currentPlayer.x + 50, currentPlayer.y - 50, "Pass", {
//     fontSize: "12px",
//     backgroundColor: "#dc3545",
//     padding: { x: 10, y: 5 },
//     color: "#000",
//   })
//     .setInteractive()
//     .on("pointerdown", () => {
//       this.handleBid(currentPlayer, null);
//       bidText.destroy();
//       increaseBidButton.destroy();
//       decreaseBidButton.destroy();
//       bidButton.destroy();
//       passButton.destroy();
//     });
// }

// handleBid(player, bidValue) {
//   if (bidValue !== null) {
//     player.bid = bidValue;
//     this.bids.push({ player, bid: bidValue });

//     if (bidValue > this.highestBid) {
//       this.highestBid = bidValue;
//       this.highestBidder = player;
//     }
//   } else {
//     player.bid = "Pass";
//     this.bids.push({ player, bid: "Pass" });f
//   }

//   // Move to next player
//   this.currentBidderIndex++;

//   // If all players have bid, check the result
//   if (this.currentBidderIndex < this.players.length) {
//     this.promptBid();
//   } else {
//     this.endBiddingPhase();
//   }
// }


//   shuffleDeck() {
//     const suits = ["spades", "hearts", "diamonds", "clubs"];
//     const ranks = ["J", "9", "A", "10", "K", "Q", "8", "7"];

//     this.deck = [];
//     suits.forEach((suit) => {
//       ranks.forEach((rank) => {
//         this.deck.push(`${rank}_of_${suit}`);
//       });
//     });

//     Phaser.Utils.Array.Shuffle(this.deck);
//   }

//   dealCards() {
//     this.cards.forEach((card, index) => {
//       const assignedCard = this.deck.pop();
//       card.actualCard = assignedCard;

//       this.time.delayedCall(index * 200, () => {
//         card.sprite.setVisible(true);
//         this.tweens.add({
//           targets: card.sprite,
//           x: card.targetX,
//           y: card.targetY,
//           duration: 500,
//           ease: "Power2",
//         });
//       });
//     });
//   }

//   startBiddingPhase() {
//     this.players = this.playerPositions.map((pos, index) => ({
//       ...pos,
//       bid: null,
//       index,
//     }));

//     this.currentBidderIndex = 0;
//     this.bids = [];
//     this.highestBid = 15;
//     this.highestBidder = null;
//     this.promptBid();
//   }

//   promptBid() {
//     const currentPlayer = this.players[this.currentBidderIndex];
//     let bidValue = 15;

//     const bidText = this.add.text(currentPlayer.x, currentPlayer.y - 100, `Bid: ${bidValue}`, {
//       fontSize: "12px",
//       color: "#fff",
//     }).setOrigin(0.5);

//     const increaseBidButton = this.add.text(currentPlayer.x - 40, currentPlayer.y - 80, "▲", {
//       fontSize: "12px",
//       backgroundColor: "#28a745",
//       padding: { x: 5, y: 5 },
//       color: "#000",
//     })
//       .setInteractive()
//       .on("pointerdown", () => {
//         if (bidValue < 28) {
//           bidValue++;
//           bidText.setText(`Bid: ${bidValue}`);
//         }
//       });

//     const decreaseBidButton = this.add.text(currentPlayer.x + 40, currentPlayer.y - 80, "▼", {
//       fontSize: "12px",
//       backgroundColor: "#dc3545",
//       padding: { x: 5, y: 5 },
//       color: "#000",
//     })
//       .setInteractive()
//       .on("pointerdown", () => {
//         if (bidValue > 15) {
//           bidValue--;
//           bidText.setText(`Bid: ${bidValue}`);
//         }
//       });

//     const bidButton = this.add.text(currentPlayer.x - 50, currentPlayer.y - 50, "Bid", {
//       fontSize: "12px",
//       backgroundColor: "#28a745",
//       padding: { x: 10, y: 5 },
//       color: "#000",
//     })
//       .setInteractive()
//       .on("pointerdown", () => {
//         this.handleBid(currentPlayer, bidValue);
//         bidText.destroy();
//         increaseBidButton.destroy();
//         decreaseBidButton.destroy();
//         bidButton.destroy();
//         passButton.destroy();
//       });

//     const passButton = this.add.text(currentPlayer.x + 50, currentPlayer.y - 50, "Pass", {
//       fontSize: "12px",
//       backgroundColor: "#dc3545",
//       padding: { x: 10, y: 5 },
//       color: "#000",
//     })
//       .setInteractive()
//       .on("pointerdown", () => {
//         this.handleBid(currentPlayer, null);
//         bidText.destroy();
//         increaseBidButton.destroy();
//         decreaseBidButton.destroy();
//         bidButton.destroy();
//         passButton.destroy();
//       });
//   }

//   handleBid(player, bidValue) {
//     if (bidValue !== null) {
//       player.bid = bidValue;
//       this.bids.push({ player, bid: bidValue });

//       if (bidValue > this.highestBid) {
//         this.highestBid = bidValue;
//         this.highestBidder = player;
//       }
//     } else {
//       player.bid = "Pass";
//       this.bids.push({ player, bid: "Pass" });
//     }

//     this.currentBidderIndex++;
//     if (this.currentBidderIndex < this.players.length) {
//       this.promptBid();
//     } else {
//       this.endBiddingPhase();
//     }
//   }

//   endBiddingPhase() {
//     if (this.highestBidder) {
//       this.promptTrumpSelection();
//     } else {
//       console.log("All players passed. Restarting bidding...");
//       this.startBiddingPhase();
//     }
//   }

//   promptTrumpSelection() {
//     if (!this.highestBidder) return;
  
//     const suits = ["spades", "hearts", "diamonds", "clubs"];
//     let xOffset = this.highestBidder.x - 50; // Show buttons near the highest bidder
//     let suitButtons = []; // Store buttons in an array
  
//     suits.forEach((suit) => {
//       const suitButton = this.add.text(xOffset, this.highestBidder.y - 100, suit.toUpperCase(), {
//         fontSize: "12px",
//         backgroundColor: "#ffa500",
//         padding: { x: 10, y: 5 },
//         color: "#000",
//       })
//         .setInteractive()
//         .on("pointerdown", () => {
//           this.trumpSuit = suit;
//           console.log(`Trump suit selected by ${this.highestBidder.name}, but remains hidden.`);
          
//           // Destroy all buttons after selection
//           suitButtons.forEach((btn) => btn.destroy()); 
          
//           this.dealExtraCards();
//         });
  
//       suitButtons.push(suitButton); // Store the button
//       xOffset += 100;
//     });
//   }
//   determineTrickWinner(playedCards) {
//     // Sort played cards based on rank and trump suit
//     playedCards.sort((a, b) => {
//       if (a.suit === this.trumpSuit && b.suit !== this.trumpSuit) return -1;
//       if (b.suit === this.trumpSuit && a.suit !== this.trumpSuit) return 1;
  
//       const rankOrder = ["7", "8", "Q", "K", "10", "A", "9", "J"];
//       return rankOrder.indexOf(b.rank) - rankOrder.indexOf(a.rank);
//     });
  
//     // The first card is now the highest-ranked one
//     const winningCard = playedCards[0];
//     const winningPlayer = winningCard.player;
  
//     // Determine which team won the trick
//     if (winningPlayer.team === "Team 1") {
//       this.tricksWon.Team1++;
//     } else {
//       this.tricksWon.Team2++;
//     }
  
//     console.log(`${winningPlayer.name} wins the trick!`);
//   }
  
  
//   dealExtraCards() {
//     this.players.forEach((player) => {
//       player.extraCards = player.extraCards || [];
  
//       const cardSpacing = 65; // Adjust space between cards
  
//       for (let i = 0; i < 4; i++) {
//         const assignedCard = this.deck.pop(); // Draw a card from the deck
//         player.extraCards.push(assignedCard); // Store it for the player
  
//         // Display the extra card visually in a second row (spaced properly)
//         const cardSprite = this.add.image(500, 300, "cardBack").setScale(0.15).setVisible(true);
  
//         this.tweens.add({
//           targets: cardSprite,
//           x: player.x - (1.5 * cardSpacing) + i * cardSpacing,  // Adjusted spacing
//           y: player.y + 130, // Second row below first row
//           duration: 500,
//           ease: "Power2",
//         });
//       }
//     });
  
//     console.log("Extra cards dealt:", this.players.map(p => ({ name: p.name, cards: p.extraCards })));
//   }
  
  
// }

// export default GameScene;

import Phaser from 'phaser';
import { createUIElements, createPlayerPositions } from './UIElements';
import { shuffleDeck, dealInitialCards, dealExtraCards, flipPlayerCards } from './CardUtils';
import { startBiddingPhase, endBiddingPhase } from './Bidding';
import { promptTrumpSelection } from './TrumpSelection';

import { determineTrickWinner, determineWinner } from './Winner';


const cardPointsMapping = {
    J: 3,
    9: 2,
    A: 1,
    10: 1,
    K: 0,
    Q: 0,
    8: 0,
    7: 0,
  };
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.cards = [];
        this.deck = [];
        this.trumpSuit = null;
        this.players = [];
        this.currentBidderIndex = 0;
        this.bids = [];
        this.highestBid = 15;
        this.highestBidder = null;
        this.tricksWon = { Team1: 0, Team2: 0 };
        this.tricksPlayed = 0;
        this.currentTrick = [];
        this.currentPlayerIndex = 0;
        this.cardRankings = { J: 8, 9: 7, A: 6, 10: 5, K: 4, Q: 3, 8: 2, 7: 1 };
        this.gameStarted = false; // ✅ Track if the game has started
        this.biddingCompleted = false; // ✅ Track if bidding is completed

    }

    preload() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const ranks = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        suits.forEach(suit => {
            ranks.forEach(rank => {
                this.load.image(`card_${rank}_${suit}`, `src/assets/cards/${rank}_of_${suit}.jpg`);
            });
        });
    }

    create() {
        console.log('GameScene is running');
        createUIElements(this);
        
        // Ensure players are initialized properly
        this.players = createPlayerPositions(this) || [];
        
        if (!Array.isArray(this.players) || this.players.length !== 4) {
          console.error("❌ Players array is not properly initialized.");
          return;
      }

        this.players.forEach(player => {
            if (player.cards && Array.isArray(player.cards)) {
                player.cards.forEach(card => {
                    const cardSprite = card.sprite;
                    if (cardSprite) {
                        cardSprite.setInteractive();
                        scene.input.setTopOnly(false);
                        cardSprite.on('pointerdown', () => {
                            console.log(`Card clicked: ${card.rank} of ${card.suit}`);
                            handleCardSelection(this, player, card);
                            this.moveCardToCenter(cardSprite);
                        });
                    } else {
                        console.warn(`Card sprite not found for ${card.rank} of ${card.suit}`);
                    }
                });
            }
        });
    }

    startGame() {
        if (!this.gameStarted) { // ✅ Only start the game if it hasn't been started before
            console.log("Game started! Dealing cards...");
            this.gameStarted = true; // Mark game as started
            shuffleDeck(this);
            dealInitialCards(this);
            this.startBiddingPhase();
        } else {
            console.log("Game already started. Ignoring further clicks.");
        }
    }


    startBiddingPhase() {
        startBiddingPhase(this);
    }

    endBiddingPhase() {
        endBiddingPhase(this);
        this.biddingCompleted = true; // ✅ Mark bidding as completed
        console.log("Bidding phase completed. Players can now play cards.");
    }
    

    promptTrumpSelection() {
        promptTrumpSelection(this);
    }

    determineTrickWinner(playedCards) {
        const winner = determineTrickWinner(this, playedCards);
        
        if (!winner) {
            console.error("❌ No winner determined for the trick.");
            return;
        }
    
        console.log(`Winner of the trick: ${winner.name}`);
    
        // Calculate total points in the trick
        const trickPoints = playedCards.reduce(
            (sum, { card }) => sum + (cardPointsMapping[card.rank] || 0),
            0
        );
    
        // Find the actual player object in the scene
        const winningPlayer = this.players.find(p => p.name === winner.name);
        if (winningPlayer) {
            // Update the player's score
            winningPlayer.score = (winningPlayer.score || 0) + trickPoints;
    
            // Update the score text
            if (winningPlayer.scoreText) {
                winningPlayer.scoreText.setText(`Score: ${winningPlayer.score}`);
            }
    
            console.log(`${winningPlayer.name} wins ${trickPoints} points! Total score: ${winningPlayer.score}`);
        } else {
            console.error(`❌ Unable to find winning player ${winner.name} in GameScene players.`);
        }
    
        // Animate cards moving to the winner’s area
        playedCards.forEach(({ card }, index) => {
            this.tweens.add({
                targets: card.sprite,
                x: winner.x,
                y: winner.y - 100,
                duration: 500,
                ease: 'Power2',
                delay: index * 100,
                onComplete: () => {
                    card.sprite.destroy();
                }
            });
        });
    
        // Clear the trick after a delay to allow animations to finish
        this.time.delayedCall(700, () => {
            this.currentTrick = [];
            // Start next trick or check if the game is over
        });
    }
    
      

    dealExtraCards() {
        dealExtraCards(this);
    }

    determineWinner() {
        determineWinner(this);
    }

    startTrickPhase() {
        console.log(`Trick ${this.tricksPlayed + 1} begins. Player: ${this.players[this.currentPlayerIndex]?.name}`);
    }
    moveToNextPlayer() {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 4;
      console.log(`Next turn: ${this.players[this.currentPlayerIndex]?.name}`);
  }
  

    handleTrumpSelection(selectedTrumpSuit, selectedPlayer) {
        this.trumpSuit = selectedTrumpSuit;
        console.log(`${selectedPlayer?.name} selected ${selectedTrumpSuit} as the trump suit.`);
        flipPlayerCards(this, selectedPlayer);
    }

    moveCardToCenter(card) {
        console.log('Starting animation...');
        this.tweens.add({
            targets: card,
            x: this.scale.width / 2,
            y: this.scale.height / 2,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                console.log('Card reached the center ✅');
            }
        });
    }
}


export default GameScene;
