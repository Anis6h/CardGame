

import Phaser from "phaser";
import DealerImg from '../assets/deleaer2.svg';
import TableImg from  '../assets/table.jpg';
import Player1Img from '../assets/player1.jpg'; // Example Player 1 image
import Player2Img from '../assets/player2.jpg'; // Example Player 2 image
import Player3Img from '../assets/player3.jpg'; // Example Player 3 image
import Player4Img from '../assets/player4.jpg'; // Example Player 4 image
import CardBackImg from '../assets/cardBack.jpg'; // Card backside  



class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    this.load.image("table", TableImg);
    this.load.image("dealer", DealerImg);
    this.load.image("cardBack", CardBackImg);
  
    const suits = ["spades", "hearts", "diamonds", "clubs"];
    const ranks = ["J", "9", "A", "10", "K", "Q", "8", "7"];
  
    ranks.forEach((rank) => {
      suits.forEach((suit) => {
        this.load.image(`${rank}_of_${suit}`, `src/assets/cards/${rank}_of_${suit}.jpg`);
      });
    });
  }

  create() {
    console.log("Assets Preloaded");
    this.scene.start("GameScene");
  }
}

export default PreloadScene;