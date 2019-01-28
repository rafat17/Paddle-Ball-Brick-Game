export function detectcollision(ball, gameObject){

	//this.ball = ball
	//this.gameObject = gameObject

	//ball position fixing
	
	let bottomofBall = ball.position.y + ball.size
	let topofBall = ball.position.y

	//gameObject position fixing
    
    let gameObject_top = gameObject.position.y
    let gameObject_bottom = gameObject.position.y + gameObject.height
	let gameObject_leftSide = gameObject.position.x
	let gameObject_rightSide = gameObject.position.x + gameObject.width

		
	if(bottomofBall > gameObject_top && 
	   topofBall <= gameObject_bottom  && 
	   ball.position.x >= gameObject_leftSide && 
	   ball.position.x + ball.size <= gameObject_rightSide)
	
	{
		return true
	}

	else
	{
		return false
	}


} 