import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import { buildLevel, level1, level2, level3 } from "./levels.js";

const Game_status = {
  PAUSE: 0,
  RESUME: 1,
  HOME_MENU: 2,
  GAMEOVER: 3,
  NEW_LEVEL: 4
};

const width = 1500
const height  = 1200

export default class Game {
  
  constructor(gamewidth, gameheight) {
    this.gamewidth = gamewidth;
    this.gameheight = gameheight;

    this.home_audio = document.querySelector("#homemenuaudio")
    this.pause_audio = document.querySelector("#pauseaudio");
    this.gameover_audio = document.querySelector("#gameoveraudio");
    this.gamecomplete_audio = document.querySelector("#gamecomplete_audio");

    this.gamestate = Game_status.HOME_MENU;
    this.gameObjects = [];
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.bricks = [];
    this.lives = 3;
    this.levels = [level1, level2, level3];
    this.currentLevel = 0;
    new InputHandler(this, this.paddle);
  }

  endmusic(){
    //null function 

 }

  homeaudio_song(){

    this.home_audio.volume = 0.1
    this.home_audio.loop = true
    this.home_audio.play()

  }

  pauseaudio_song() {
    this.pause_audio.volume = 0.1;
    this.pause_audio.loop = true;
    this.pause_audio.play();
  }

// must be called once only when status is gameover
  gameoveraudio_song(){

    this.gameover_audio.volume = 0.3;
    this.gameover_audio.play();
    this.gameover_audio.loop = false
    this.gameoveraudio_song = this.endmusic
    
}

//must be called when the game has been completed
  gamecomepleteaudio_song(){

    this.gamecomplete_audio.volume = 0.3;
    this.gamecomplete_audio.play();
    this.gamecompleteaudio_song = this.endmusic
  }

  start() {
    //this.gamestate = Game_status.HOME_MENU

    //this.paddle = new Paddle(this)
    //this.ball  = new Ball(this)
    if (
      this.gamestate != Game_status.HOME_MENU &&
      this.gamestate != Game_status.NEW_LEVEL
    )
      return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.resetposition();
    this.gameObjects = [this.paddle, this.ball];

    this.home_audio.load()
    this.gamestate = Game_status.RESUME;

    //new InputHandler(this, this.paddle)
  }

  update(deltatime) {
    
    if(this.gamestate == Game_status.HOME_MENU){
        this.homeaudio_song()
        return
      }

      if (this.lives == 0) {
      this.gamestate = Game_status.GAMEOVER;
      this.gameoveraudio_song()
    }

      if (
      this.gamestate == Game_status.PAUSE ||
      this.gamestate == Game_status.GAMEOVER ||
      this.gamestate == Game_status.HOME_MENU
    ) return;



    //checks if all the bricks are destroyed in a given level and move on to the next level
    if (this.bricks.length == 0) {
        this.currentLevel++;

      //checks if all the levels have been completed
      if(this.currentLevel == this.levels.length){
        
        this.gamestate = Game_status.GAMEOVER
        this.gamecomepleteaudio_song()
        return
      }

      this.gamestate = Game_status.NEW_LEVEL;
      this.start();
    }

    [...this.gameObjects, ...this.bricks].forEach(object =>
      object.update(deltatime)
    );

    this.bricks = this.bricks.filter(brick => !brick.deletebrick);
  }

  draw(c) {
    [...this.gameObjects, ...this.bricks].forEach(object => object.draw(c));

    //lives remaining status view
    c.fillStyle = "rgba(0,0,0,0.5)";
    c.fillRect(1295, 0, 205, 35);

    c.fillStyle = "white";
    c.fillText("Lives Remaining : ", 1380, 20);
    c.fillText(this.lives, 1480, 20);

    //current level status view
    c.fillStyle = "rgba(0,0,0,0.5)";
    c.fillRect(0, 0, 175, 37);

    c.fillStyle = "white";
    c.fillText("Level : ", 40, 30);
    c.fillText(this.currentLevel + 1, 85, 30);

    if (this.gamestate == Game_status.PAUSE) {
      c.fillStyle = "rgba(0,0,0,0.5)";
      c.fillRect(0, 0, this.gamewidth, this.gameheight);

      c.font = "30px Arial";
      c.fillStyle = "white";
      c.textAlign = "center";
      c.fillText("Game PAUSED !", this.gamewidth / 2, this.gameheight / 2 - 80);

      c.font = "20px Arial";
      c.fillStyle = "white";
      c.textAlign = "center";
      c.fillText(
        "Press ESC to resume your game !",
        this.gamewidth / 2,
        this.gameheight / 2 + 40
      );
    }

    if (this.gamestate == Game_status.HOME_MENU) {
      c.fillStyle = "rgba(0,0,0,0.9)";
      c.fillRect(0, 0, this.gamewidth, this.gameheight);

      c.font = "30px Arial";
      c.fillStyle = "white";
      c.textAlign = "center";
      c.fillText(
        "Welcome to the Paddle Ball Brick GAME",
        this.gamewidth / 2,
        this.gameheight / 2 - 80
      );

      c.font = "20px Arial";
      c.fillStyle = "white";
      c.textAlign = "center";
      c.fillText(
        "Press SPACEBAR to begin your game !",
        this.gamewidth / 2,
        this.gameheight / 2 + 40
      );
    }

    if (this.gamestate == Game_status.GAMEOVER) {
      c.fillStyle = "rgba(0,0,0,0.9)";
      c.fillRect(0, 0, this.gamewidth, this.gameheight);

      c.font = "30px Arial";
      c.fillStyle = "white";
      c.textAlign = "center";
      c.fillText("GAME OVER !", this.gamewidth / 2, this.gameheight / 2 - 100);

      if(this.currentLevel == this.levels.length){

        c.font = "20px Arial"
        c.fillStyle = "white"
        c.textAlign = "center"
        c.fillText("Congratulations ! You have completed the game !", this.gamewidth / 2, this.gameheight / 2 - 60);
      }

      c.font = "20px Arial";
      c.fillStyle = "white";
      c.textAlign = "center";
      c.fillText("Press P to go back to the Main Menu", this.gamewidth / 2, this.gameheight / 2 - 30);




    }
  }

  //All game menus are dealt with here

  pausetheGame() {
    
    if(this.gamestate == Game_status.HOME_MENU) return

    if (this.gamestate == Game_status.PAUSE) {
      this.pause_audio.load();
      this.gamestate = Game_status.RESUME;
    }
    else {
      this.gamestate = Game_status.PAUSE;
      this.pauseaudio_song();
    }
  }

  homemenu(){
    
    if(this.gamestate == Game_status.GAMEOVER){
      location.reload();
    }
    else return
  }



}
