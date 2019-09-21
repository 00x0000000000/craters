"use strict";

class mygame extends craters.game {
	
	intitiate () {
	
		super.intitiate();
		
		this.score = '0000';
		this.constants.color = 'rgba(255,255,255,1)';
		this.constants.bgcolor = 'rgba(0,0,0,0.001)';
		this.constants.font = '1.5em Arial';
		
		for (var i = 0; i < 5; i++){
			this.state.entities.push( new boltbug(this, {pos: {x: (Math.random() * this.constants.width), y: (Math.random() * this.constants.height)}}));
		}
		
		this.state.entities.push( new ladybug(this, 'f18') );
	}
	
	render () {
	
		// super.render(this)
		var player = {
			pos: {x: ((this.constants.width / 2) - (196 / 2)), y: ((this.constants.height) - (218 / 2))}
		}
		
		var world = {
			minX: 0,
			maxX: 2000,
			minY: 0,
			maxY: 2000
		}
		var canvas = this.constants;
		
	    this.context.setTransform(1,0,0,1,0,0); //reset the transform matrix as it is cumulative
	    this.context.clearRect(0, 0, world.maxX * 2, world.maxY * 2); //clear the viewport AFTER the matrix is reset
	    
	
	    //Clamp the camera position to the world bounds while centering the camera around the player                                             
	    var camX = clamp(-player.pos.x + canvas.width/2, world.minX, world.maxX - canvas.width);
	    var camY = clamp(-player.pos.y + canvas.height/2, world.minY, world.maxY - canvas.height);
	
	    this.context.translate( camX, camY );    
		
		function clamp(value, min, max){
		    
		    if(value < min) return min;
		    else if(value > max) return max;
		    return value;
		}
		
		super.render(this)
		this.context.fillText('score: ' + this.score, (16), (50));
	}
}

class ladybug extends craters.entity {
	// extend the entity class
	constructor (scope, name) {
		super();
		
		this.state.size = {x:196, y:218};
		this.state.pos = {x: (scope.constants.width / 2) - (this.state.size.x / 2), y: (scope.constants.height - this.state.size.y)}
				
		scope.state.entities.push(new craters.sprite(scope, {pos: this.state.pos, size: this.state.size, frames: [0, 1, 2], image: media.fetch('./src/media/bug.png')}))
	}
}

class boltbug extends craters.entity {
	constructor (scope, args) {
		super();
		
		this.state.pos = args.pos;
		this.state.angle = (Math.random() * 360);
		
		scope.state.entities.push(new craters.sprite(scope, {size: {x: 214, y: 282}, pos: this.state.pos , frames: [0, 1, 2], image: media.fetch('./src/media/bolt.png'), angle: this.state.angle}))
	}
}

// what this does is , it loads all resources 
// and later , it starts the game if all files were loaded

var media = new craters.loader;
	media.load([
	'./src/media/bug.png',
	'./src/media/bolt.png'
], function() { window.game = new mygame('#container', window.innerWidth, window.innerHeight, 6, false)});