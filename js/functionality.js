//Name: Petar Angelov
//Date: 01/07/2019
//Functionality of the Maze Game

window.onload = function(){
	//Initialising the elements
	var canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	resizeCanvas();
	ball = new Ball(20,20,0,0, 7);
	ax = 0;
	ay = 0;
	
	//Resizing the canvas
	window.addEventListener('resize', resizeCanvas, false);
  	function resizeCanvas() {
		canvas.width = window.innerWidth-5;
		canvas.height = window.innerHeight-5;
	 }
	
	//Device orientation acceleration
	window.ondevicemotion = function(event) {
		ax = event.accelerationIncludingGravity.x;
		ay = event.accelerationIncludingGravity.y;
	}
	
	//Desktop arrow keys acceleration
	window.addEventListener('keydown', function(event){
		//X-axis movements
		if(event.keyCode === 37){
			ax = -0.11;
		}
		else if (event.keyCode === 39){
			ax = 0.11;
		}
		
		//Y-axis movements
		if(event.keyCode === 38){
			ay = -0.11;
		}
		else if (event.keyCode === 40){
			ay = 0.11;
		}
	}, false);
					
	window.addEventListener('keyup', function() {
		ax = 0;
		ay = 0;
	}, false);

	//Calculations of the next frame
	(function drawFrame (){

		//Initializing the canvas and it's elements
		W = canvas.width;
		H = canvas.height;
		
		A = {x : W*0.3, y : H*0.3};
    		B = {x : W*0.3 + 150, y : H*0.3}; 
		A2 = {x : W*0.3, y : H*0.3 + 50};
    		B2 = {x : W*0.3 + 150, y : H*0.3 + 50}; 

		A3 = {x : W*0.3 + 100, y : H*0.3 + 100};
    		B3 = {x : W*0.3 + 250, y : H*0.3 + 100}; 
		A4 = {x : W*0.3 + 100, y : H*0.3 + 150};
    		B4 = {x : W*0.3 + 250, y : H*0.3 + 150}; 
			
		A5 = {x : 30, y : 30};
    		B5 = {x : 180, y : 30}; 
		A6 = {x : 30, y : 80};
    		B6 = {x : 180, y : 80};
			
		D = {x : W-100, y : H*0.3+200};
    		E = {x : W-100 + 50, y : H*0.3+200}; 
		D2 = {x : W-100, y : H*0.3+350};
    		E2 = {x : W-100 + 50, y : H*0.3+350};  

		D3 = {x : W-200, y : H-150};
    		E3 = {x : W-200 + 50, y : H-150}; 
		D4 = {x : W-200, y : H};
    		E4 = {x : W-200 + 50, y : H};  	

					
		//Animation Frame
		window.requestAnimationFrame(drawFrame, canvas);

		//Clear previous canvas
		context.clearRect(0, 0, canvas.width, canvas.height);

		//Canvas borders collision
		if(ball.x + ball.vx > canvas.width - ball.Radius) {
			if(ball.y + ball.vy > canvas.height - 40){
				window.alert("Congratulations!");
			}
    			ball.vx = -ball.vx / 2.1;
			ball.x = canvas.width - ball.Radius;
		}
		if(ball.x + ball.vx < ball.Radius){
			ball.vx = - ball.vx / 2.1;
			ball.x = ball.Radius;
		}
		if(ball.y + ball.vy > canvas.height - ball.Radius) {
   			ball.vy = - ball.vy / 2.1;
			ball.y = canvas.height - ball.radius;
		}
		if(ball.y + ball.vy < ball.Radius){
			ball.vy = - ball.vy / 2.1;
			ball.y = ball.radius;					
		}
		
		//Boxes collision
		helper(A, B, A2, B2, ball);
		helper(A3, B3, A4, B4, ball);
		helper(A5, B5, A6, B6, ball);
		helper(D, E, D2, E2, ball);
		helper(D3, E3, D4, E4, ball);	
				
		//Update velocity
		ball.updateV(ax, ay);

		//Update coordinates
		ball.update();

		//Drag coefficient
		if(ball.vx > 0){ball.vx -= 0.0075;}
		if(ball.vy > 0){ball.vy -= 0.0075;}
		if(ball.vx < 0){ball.vx += 0.0075;}
		if(ball.vy < 0){ball.vy += 0.0075;}

		//Drawing the new calculated frame
		ball.draw(context, canvas.width, canvas.height);
	}());
};
//Box collision function
function helper(A, B, A2, B2, ball){
	C = {x : ball.x, y : ball.y};
		
	if(doesLineInterceptCircle(A, B, C, ball.radius)){	
		ball.vy = - ball.vy / 2.1;
		ball.y = A.y - ball.radius;
	}
	if(doesLineInterceptCircle(A2, B2, C, ball.radius)){
		ball.vy = - ball.vy / 2.1;
		ball.y = A2.y + ball.radius;			
	}
	if(doesLineInterceptCircle(A, A2, C, ball.radius)){	
		ball.vx = - ball.vx/2.1;
		ball.x = A.x - ball.radius;			
	}
	if(doesLineInterceptCircle(B, B2, C, ball.radius)){
		ball.vx = - ball.vx / 2.1;
		ball.x = B.x + ball.radius;				
	}
}
