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
    // Table, dealer, and UI elements
    this.load.image("table", TableImg);
    this.load.image("dealer", DealerImg);

    // Player images
    this.load.image("player1", Player1Img);
    this.load.image("player2", Player2Img);
    this.load.image("player3", Player3Img);
    this.load.image("player4", Player4Img);

    // Card assets
    for (let suit of ["spades", "hearts", "diamonds", "clubs"]) {
      for (let rank of ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]) {
        this.load.image(`${rank}_of_${suit}`, `src/assets/cards/${rank}_of_${suit}.jpg`);
      }
    }

    this.load.image("cardBack", CardBackImg); // Card backside
  }

  create() {
    console.log("Assets Preloaded");
    this.scene.start("GameScene");
  }
}

export default PreloadScene;
