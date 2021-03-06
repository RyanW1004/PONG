var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 2.5;
var ballY = 50;
var ballSpeedY = 2.5;
var ballRadius = 8;

var paddle1Y = 250;
var paddle2Y = 250;
var playerScore = 0;
var AIScore = 0;
const PADDLE_HEIGHT = 100;
var AISpeed = 3;
var winningScore = 11;

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function handleMouseClick() {
	if(playerScore === winningScore || AIScore === winningScore) {
	playerScore = 0;
	AIScore = 0;
	ballX = 50;
	ballSpeedX = 5;
	ballY = 50;
	ballSpeedY = 5;
	ballRadius = 8;
	paddle2Y = 250;
	};
}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	canvasContext.font="26px Verdana";
	
	var framesPerSec = 120;
	setInterval(function() {
		moveEverything();
		drawEverything(); 
	}, 1000/framesPerSec);
	
	canvas.addEventListener('mousedown', handleMouseClick);
	
	canvas.addEventListener('mousemove',
		function(evt) {
			var mousePos = calculateMousePos(evt)
			paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
		});

	var para = document.getElementById('gameText');
	para.append(' ' + winningScore + ' points! Good Luck!');
}

function ballReset() {
	ballSpeedX = -ballSpeedX
	ballSpeedY = ballSpeedY/2
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}

function AIMove() {
	var pad2Center = paddle2Y + PADDLE_HEIGHT/2;
	if (ballY < pad2Center - 20) {
		paddle2Y -= AISpeed;
	}else if (ballY > pad2Center + 20) {
		paddle2Y += AISpeed;
	}
}

function moveEverything() {
	AIMove();
	ballX += ballSpeedX;
	ballY += ballSpeedY;	
	
	// if the ball hits the AI paddle bounce back
	if (ballX > canvas.width - ballRadius - 10) {
		if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT){
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.3;
		}
		else {
		ballReset();
		playerScore++;
		} 
	}
	// if the ball hits the playes paddle bounce back
	if (ballX < ballRadius + 10) {
		if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.3;
		}
		else {
		ballReset();
		AIScore++;
		} 
	}
	if (ballY > canvas.height - ballRadius) {
		ballSpeedY = -ballSpeedY;
	}
	if (ballY < ballRadius) {
		ballSpeedY = -ballSpeedY;
	}
}

function drawEverything() {
	// canvas
	drawRect(0, 0, canvas.width, canvas.height, 'black');
	
	//ball
	colorCircle(ballX, ballY, ballRadius, 'white');
	
	//player paddle
	drawRect(0, paddle1Y, 10, PADDLE_HEIGHT, 'white');
	
	//AI paddle
	drawRect(790, paddle2Y, 10, PADDLE_HEIGHT, 'white');
	
	//scores
	canvasContext.fillText(playerScore, 100, 100);
	canvasContext.fillText(AIScore, canvas.width-130, 100);
	
	winning();
}

function drawRect(leftX, topY, width, height, drawColor){
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
	
}

function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}
function winning () {
	if (playerScore === winningScore) {
		canvasContext.fillText('YOU WIN!!!', canvas.width/2-80, canvas.height/2-30);
		canvasContext.fillText('Click to restart', canvas.width/2 - 105, canvas.height/2 + 20);
		ballX = 100;
		ballSpeedX = 0;
		ballY = 100;
		ballSpeedY = 0;
		ballRadius = 0;
		paddle2Y = 250;
	}
	if (AIScore === winningScore) {
		canvasContext.fillText('YOU LOSE!', canvas.width/2-80, canvas.height/2-30);
		canvasContext.fillText('Click to restart', canvas.width/2 - 105, canvas.height/2 + 20);
		ballX = 100;
		ballSpeedX = 0;
		ballY = 100;
		ballSpeedY = 0;
		ballRadius = 0;
		paddle2Y = 250;
	}}