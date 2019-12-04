import { Scene } from 'phaser';
import dogImg from "./interactive/2019/12/pet-the-dog/images/dog.png";
import dogHappyImg from "./interactive/2019/12/pet-the-dog/images/dog-happy.png";
import dogNoTail from "./interactive/2019/12/pet-the-dog/images/dogNoTail.png";
import dogSad from "./interactive/2019/12/pet-the-dog/images/dogSad.png";
import dogNudge from "./interactive/2019/12/pet-the-dog/images/dogNudge.png";
import tail from "./interactive/2019/12/pet-the-dog/images/tail.png";
import heartImg from "./interactive/2019/12/pet-the-dog/images/heart.png";
import rectangle from "./interactive/2019/12/pet-the-dog/images/rectangle.png";
import ball from "./interactive/2019/12/pet-the-dog/images/ball.png";
import ball2 from "./interactive/2019/12/pet-the-dog/images/ball2.png";
import bone from "./interactive/2019/12/pet-the-dog/images/bone.png";
import toy from "./interactive/2019/12/pet-the-dog/images/toy.png";
import biscuit from "./interactive/2019/12/pet-the-dog/images/biscuit.png";
import poop from "./interactive/2019/12/pet-the-dog/images/poop.png";
import background from "./interactive/2019/12/pet-the-dog/images/background.png";

let numOfClicks = 0;
let pets;
let clicks;
let recentClick = false;
let tailWag = false;
let firstTailWag = true;

class GameScene extends Scene {

  preload() {
    this.load.image("dog", dogImg);
    this.load.image("dogHappy", dogHappyImg);
    this.load.image("dogNoTail", dogNoTail);
    this.load.image("dogSad", dogSad);
    this.load.image("dogNudge", dogNudge);
    this.load.image("tail", tail);
    this.load.image("heart", heartImg);
    this.load.image("rectangle", rectangle);
    this.load.image("ball", ball);
    this.load.image("ball2", ball2);
    this.load.image("bone", bone);
    this.load.image("toy", toy);
    this.load.image("biscuit", biscuit);
    this.load.image("poop", poop);
    this.load.image("background", background);
  }

  create() {
    this.firstTailWag = true;
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    // petsCount = 0;

    this.add.image(0, 0, "background").setDepth(1).setOrigin(0, 0);


    this.createInterface();
    this.createDog();

    const tailTween = this.tweens.add({
      targets: this.tail,
      y: 370,
      rotation: -0.3,
      ease: 'Power0',
      duration: 400,
      yoyo: true,
      repeat: -1,
      paused: true
    });

    // this.createTween();
    this.controlClicks();

    //subtract clicks at certain interval
    setInterval( function() {
      if (numOfClicks > 0) {
        numOfClicks--;
      }

      if (numOfClicks > 50) {
        // const tailTween = this.tailTween;
        if (firstTailWag === true) {
          tailTween.play();
          tailWag = true;
          firstTailWag = false;
        } else {
          tailTween.resume();
          tailWag = true;
        }
      }
    },1000);



  }
  createInterface() {
    this.add.rectangle(700, 60, 120, 40, '0xffffff').setDepth(2);
    pets = this.add.text(650, 47, "Pets: 0", {
      fontFamily: 'Lato, sans-serif', fontSize: '24px', fill: '#000', align: 'center',
    }).setDepth(2);

    this.add.text(50, 30, "Pet the puppy!", {
      fontFamily: 'Lato, sans-serif', fontSize: '36px', fill: '#000', align: 'center',
    }).setDepth(2);

    //add a platform for things (the ball) to land on
    this.platform = this.physics.add.staticGroup();
    this.platform.create(0, 480, 'rectangle').setDepth(0);

    //add another platform for ball2 to land on
    this.platform2 = this.physics.add.staticGroup();
    this.platform2.create(0, 380, 'rectangle').setDepth(0);

    //add a third platform
    this.platform3 = this.physics.add.staticGroup();
    this.platform3.create(0, 580, 'rectangle').setDepth(0);
  }
  createDog() {
    //various dog images
    this.dog = this.add.sprite(376, 300, "dog").setInteractive().setDepth(4);
    this.dogHappy = this.add.sprite(376, 300, "dogHappy").setInteractive().setDepth(4);
    this.dogHappy.visible = false;
    this.dogNoTail = this.add.sprite(376, 300, "dogNoTail").setInteractive().setDepth(4);
    this.dogNoTail.visible = false;
    this.dogSad = this.add.sprite(376, 300, "dogSad").setInteractive().setDepth(3);
    this.dogSad.visible = false;
    this.dogNudge = this.add.sprite(377, 300, "dogNudge").setInteractive().setDepth(3);
    this.dogNudge.visible = false;
    this.tail = this.add.sprite(445, 375, "tail").setInteractive().setDepth(2);
    // tail.visible = false;

    //invisible overlay box to control the clicks
    this.petBox = this.add.rectangle(400, 300, 161, 220, '0xffffff', 0).setInteractive({ cursor: 'pointer'﻿ }).setDepth(5);
  }
  createTween() {
    //tail wag tween

  }
  // wagTail() {
  //
  // }
  controlClicks() {
    const dog = this.dog;
    const dogHappy = this.dogHappy;
    const dogNoTail = this.dogNoTail;
    const dogSad = this.dogSad;
    const dogNudge = this.dogNudge;
    let clearClick = null;
    let beSad = null;
    let petsCount = 0;

    function clearRecentClick() {
      clearClick = setTimeout( function() {
        recentClick = false;
        if (petsCount > 50) {
          dogNoTail.visible = true;
          dogHappy.visible = false;
          dogNudge.visible = false;
        } else {
          dog.visible = true;
          dogHappy.visible = false;
          dogNudge.visible = false;
        }
      }, 500);
    }

    function showSadDog() {
      beSad = setTimeout( function() {
        dogNudge.visible = true;
        dog.visible = false;
        dogHappy.visible = false;
        dogNoTail.visible = false;
        setTimeout( function() {
          dogNudge.visible = false;
          if (petsCount > 50) {
            dogNoTail.visible = true;
          } else {
            dog.visible = true;
          }
        },600);
      }, 4000);

    }


    function stopTimeout() {
      clearTimeout(clearClick);
      clearTimeout(beSad);
    }

    this.petBox.on('pointerdown', (event) => {
      stopTimeout();
      numOfClicks++;
      petsCount ++;
      pets.setText(`Pets: ${petsCount}`);

      //check if the user is clicking fast
      if (recentClick === false) {
        recentClick = true;

        if (petsCount > 50) {
          dog.visible = false;
          dogNoTail.visible = false;
          dogNudge.visible = false;
          dogHappy.visible = true;
        } else {
          dog.visible = false;
          dogNudge.visible = false;
          dogHappy.visible = true;
        }
      }
      clearRecentClick();
      showSadDog();

      //add a heart every 10 clicks
      if (petsCount % 10 === 0) {
        const xPos = Math.random() * this.width;
        const yPos = Math.random() * this.height;
        this.heart = this.add.sprite(xPos,yPos, "heart").setDepth(1).setInteractive({ cursor: 'pointer'﻿ });

        this.heart.on('pointerdown', (event) => {
          const text = this.add.text(xPos - 10, yPos + 20, "<3", {
            fontFamily: 'Lato, sans-serif', fontSize: '14px', fill: '#000', align: 'center',
          }).setDepth(3);

          setTimeout(function() {
            text.destroy();
          },300);

        });
      }

      if (petsCount === 45) {
        this.bone = this.physics.add.sprite(300, 220, 'bone').setDepth(3).setBounce(0.2).setGravityY(500).setInteractive({ cursor: 'pointer'﻿ });

        this.physics.add.collider(this.platform, this.bone);

        this.bone.on('pointerdown', (event) => {
          const text = this.add.text(230, 460, "Keep petting the puppy!", {
            fontFamily: 'Lato, sans-serif', fontSize: '14px', fill: '#000', align: 'center',
          }).setDepth(3);

          setTimeout(function() {
            text.destroy();
          },600);

        });
      }

      if (petsCount === 88) {
        this.ball = this.physics.add.sprite(510, 240, 'ball').setDepth(3).setBounce(0.5).setGravityY(500).setInteractive({ cursor: 'pointer'﻿ });

        this.physics.add.collider(this.platform, this.ball);

        this.ball.on('pointerdown', (event) => {
          const text = this.add.text(490, 450, "woof!", {
            fontFamily: 'Lato, sans-serif', fontSize: '16px', fill: '#000', align: 'center',
          }).setDepth(3);

          setTimeout(function() {
            text.destroy();
          },600);
        });
      }

      if (petsCount === 145) {
        this.biscuit = this.physics.add.sprite(660, 420, 'biscuit').setDepth(3).setBounce(0.2).setGravityY(500).setInteractive({ cursor: 'pointer'﻿ });

        this.physics.add.collider(this.platform3, this.biscuit);

        this.biscuit.on('pointerdown', (event) => {
          const text = this.add.text(630, 560, "nom nom!", {
            fontFamily: 'Lato, sans-serif', fontSize: '14px', fill: '#000', align: 'center',
          }).setDepth(3);

          setTimeout(function() {
            text.destroy();
          },600);
        });
      }

      if (petsCount === 202) {
        this.toy = this.physics.add.sprite(130, 420, 'toy').setDepth(3).setBounce(0.2).setGravityY(500).setInteractive({ cursor: 'pointer'﻿ });

        this.physics.add.collider(this.platform3, this.toy);

        this.toy.on('pointerdown', (event) => {
          const text = this.add.text(100, 560, "grrrrrr!", {
            fontFamily: 'Lato, sans-serif', fontSize: '18px', fill: '#000', align: 'center',
          }).setDepth(3);

          setTimeout(function() {
            text.destroy();
          },600);
        });
      }

      if (petsCount === 234) {
        this.ball2 = this.physics.add.sprite(170, 220, 'ball2').setDepth(3).setBounce(0.7).setGravityY(500).setInteractive({ cursor: 'pointer'﻿ });

        this.physics.add.collider(this.platform2, this.ball2);

        this.ball2.on('pointerdown', (event) => {
          const text = this.add.text(140, 360, "squeak!", {
            fontFamily: 'Lato, sans-serif', fontSize: '20px', fill: '#000', align: 'center',
          }).setDepth(3);

          setTimeout(function() {
            text.destroy();
          },600);
        });
      }

      if (petsCount === 298) {
        this.poop = this.physics.add.sprite(700, 220, 'poop').setDepth(3).setBounce(0.1).setGravityY(700).setInteractive({ cursor: 'pointer'﻿ });

        this.physics.add.collider(this.platform2, this.poop);

        this.poop.on('pointerdown', (event) => {
          const text = this.add.text(680, 360, "gross!", {
            fontFamily: 'Lato, sans-serif', fontSize: '16px', fill: '#000', align: 'center',
          }).setDepth(3);

          setTimeout(function() {
            text.destroy();
          },600);
        });
      }

      if (petsCount === 500) {
        this.ball3 = this.physics.add.sprite(400, 220, 'ball').setDepth(3).setBounce(0.5).setGravityY(700).setInteractive({ cursor: 'pointer'﻿ });

        this.physics.add.collider(this.platform3, this.ball3);

        this.ball3.on('pointerdown', (event) => {
          const text = this.add.text(370, 550, "yip yip!", {
            fontFamily: 'Lato, sans-serif', fontSize: '16px', fill: '#000', align: 'center',
          }).setDepth(3);

          setTimeout(function() {
            text.destroy();
          },600);
        });
      }

    })
  }
}

export default GameScene
