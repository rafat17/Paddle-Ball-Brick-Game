 export default class Paddle{

	constructor(game){

		this.gamewidth = game.gamewidth
		this.gameheight = game.gameheight
		this.width = 150
		this.height = 20

		this.position = {
			x: this.gamewidth/2 - this.width/2,
			y: this.gameheight - this.height - 10,
		}

		this.maxSpeed = 7;
		this.currentSpeed = 0;
	}


	moveLeft(){
		this.currentSpeed = -this.maxSpeed

	}

	moveRight(){
		this.currentSpeed = this.maxSpeed
	}

	stop(){
		this.currentSpeed = 0
	}

	draw(c){ 

        c.fillStyle = "blue"
		c.fillRect(this.position.x , this.position.y, this.width, this.height)

	}



	update(deltatime){
		console.log(deltatime)

		//if(!deltatime) return;
		
	    this.position.x += this.currentSpeed;

	    if(this.position.x < 0)
	    	this.position.x = 0


	    if(this.position.x + this.width >= this.gamewidth)
	    	this.position.x = this.gamewidth - this.width

	}




}

