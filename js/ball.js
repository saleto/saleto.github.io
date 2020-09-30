//Name: Petar Angelov
//Date: 01/07/2019
//Ball class 


class Ball{
	constructor(x, y, vx, vy, radius){
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.radius = radius;
	}

	get X() { return this.x; }
	get Y() { return this.y; }
	//Update velocity.
	updateV(Hx, Hy){
		this.vx += Hx;
		this.vy += Hy;	
	}
	
	//Update ball coordinates.
	update(){
		this.x += this.vx;
		this.y += this.vy;	
	}

	get Radius() { return this.radius; }
	
	//Drawing the canvas with all the boxes and the ball
	draw(ctx,W,H) {
		
		//Draw boxes.
		ctx.fillStyle = '#6fa';
      		ctx.fillRect(0, 0, W, H);
		ctx.fillStyle = 'blue'
		ctx.fillRect(W*0.3,H*0.3,150,50);
		ctx.fillRect(W*0.3+100,H*0.3+100,150,50);
		ctx.fillRect(30,30,150,50);
		ctx.fillRect(W-100,H*0.3+200,50,150);
		ctx.fillRect(W-200,H-150,50,150);
		ctx.strokeStyle = 'black';
		
		ctx.fillStyle = "red";
		ctx.fillRect(W-10,H-40,40,40);
		
		//Draw ball.
    		ctx.beginPath();
    		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    		ctx.stroke();
		ctx.fill();
  	}
};

//Check whether cicle touches a line.
function doesLineInterceptCircle(A, B, C, radius) {
	var dist;
    	const v1x = B.x - A.x;
	const v1y = B.y - A.y;
    	const v2x = C.x - A.x;
    	const v2y = C.y - A.y;
    
	// Distance to the closest point of the line from the circle center.
	const u = (v2x * v1x + v2y * v1y) / (v1y * v1y + v1x * v1x);
        
    	// Point is on the line.
    	if(u >= 0 && u <= 1){
    		dist  = (A.x + v1x * u - C.x) ** 2 + (A.y + v1y * u - C.y) ** 2;
    	} 
	else {
    		// Point is not on the line.
        	dist = u < 0 ?
        		(A.x - C.x) ** 2 + (A.y - C.y) ** 2 :
            		(B.x - C.x) ** 2 + (B.y - C.y) ** 2;
	}
	
    	return dist < radius * radius;
}

