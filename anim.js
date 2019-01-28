import Game from './game.js';

let canvas  = document.querySelector('canvas');
let c = canvas.getContext("2d");

//the constants of game window

const game_width = canvas.width 
const game_height = canvas.height

console.log(canvas.width)

//creating instances of the game object Paddle

//let paddle = new Paddle(game_width, game_height)
//let ball  = new Ball(game_width, game_height)

//new InputHandler(paddle)

let game = new Game(game_width, game_height)
//ame.start()

let lasttime = 0;

//function to continue animation
function gameloop(timestamp){
	let deltatime = timestamp - lasttime
	lasttime = timestamp

	c.clearRect(0,0,game_width, game_height)
	game.update(deltatime)
	game.draw(c)

	requestAnimationFrame(gameloop)
}

//gameloop()
requestAnimationFrame(gameloop)



