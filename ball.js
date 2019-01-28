import {detectcollision} from './detectcollision.js';

export default class Ball{

	constructor(game){

		this.image = document.querySelector('#img_ball')
		this.size = 27
		this.gamewidth = game.gamewidth
		this.gameheight = game.gameheight
		this.game = game
		this.resetposition()

		
	}

	resetposition(){

		this.position = {
			x: 300,
			y: 250
		}

		this.speed = {
			x: 5,
			y: 3
		}
	}

	draw(c){

		c.drawImage(this.image, this.position.x, this.position.y, this.size, this.size)
	}

	update(deltatime){

		this.position.x += this.speed.x
		this.position.y += this.speed.y

		//ball on hitting the sides of the wall
		if(this.position.x + this.size > this.gamewidth || this.position.x < 0){
			this.speed.x = -this.speed.x
		}
        
        //ball on hitting the top of the wall
		if(this.position.y < 0){
			this.speed.y = -this.speed.y
		}

        //ball on hitting the bottom of the wall

		if(this.position.y + this.size >= this.gameheight){
			
			this.game.lives--
			this.resetposition()

		}

		//ball on colliding with the paddle

		if(detectcollision(this, this.game.paddle)){
			
			this.speed.y = -this.speed.y
			this.position.y = this.game.paddle.position.y - this.size
		}

		
	}
}