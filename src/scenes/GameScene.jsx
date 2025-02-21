
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
        if (!this.gameStarted) {
            console.log("Game started! Dealing cards...");
            this.gameStarted = true;
    
            // Hide the start button
            if (this.startButton) {
                this.startButton.setVisible(false);
            }
    
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
