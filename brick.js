import {detectcollision} from './detectcollision.js';


export default class Brick{

	constructor(game, position){

		this.image = document.querySelector('#img_brick')
		this.size = 27
		this.game = game

		this.position = position

		this.width = 150
		this.height = 20
}

	update(){

		if(detectcollision(this.game.ball, this)){
			this.game.ball.speed.y = -this.game.ball.speed.y
			 this.deletebrick = true
		}

	}

	draw(c){

		c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
	}
}