import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import Brick from "/src/brick";
import { buildLevel, level1 } from "/src/levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start() {
    this.gameState = GAMESTATE.RUNNING;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);

    let bricks = buildLevel(this, level1);
    // for (let i = 0; i < 10; i++) {
    //   bricks.push(new Brick(this, { x: i * 52, y: 30 }));
    // }

    this.gameObjects = [this.ball, this.paddle, ...bricks];
    new InputHandler(this.paddle, this);
  }

  update(deltaTime) {
    if (this.gameState === GAMESTATE.PAUSED) return;

    this.gameObjects.forEach(object => object.update(deltaTime));

    this.gameObjects = this.gameObjects.filter(
      object => !object.markedForDeletion
    );
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));
  }

  togglePause() {
    //
    if (this.gameState === GAMESTATE.RUNNING) {
      this.gameState = GAMESTATE.PAUSED;
    } else {
      this.gameState = GAMESTATE.RUNNING;
    }
  }
}
