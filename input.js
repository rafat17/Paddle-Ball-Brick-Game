export default class InputHandler{

	constructor(game, paddle){

		//event when key is kept pressed
		document.addEventListener("keydown", event => {

			//alert(event.keyCode);

			switch (event.keyCode){

			case 37:
			paddle.moveLeft()
			break;

			case 39: 
			paddle.moveRight()
			break;

			case 27:
			game.pausetheGame()
			break;

			case 32:
			game.start()
			break;

			case 80:
		    game.homemenu()
			break;
		}

		});

        //event when key is released
		document.addEventListener("keyup", event => {

			//alert(event.keyCode);

			switch (event.keyCode){

			case 37:
			if(paddle.currentSpeed < 0) paddle.stop()
			break;

			case 39:
			if(paddle.currentSpeed > 0) paddle.stop()
			break;
		}

		});
	}

	}


