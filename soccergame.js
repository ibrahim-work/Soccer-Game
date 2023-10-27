var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 326;
document.body.appendChild(canvas);
var fieldReady = false;
var fieldImage = new Image();
fieldImage.onload = function () {
	fieldReady = true;
};
fieldImage.src = "images/field.png";
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function () {
	playerReady = true;
};
playerImage.src = "images/player.png";
var ballReady = false;
var ballImage = new Image();
ballImage.onload = function () {
	ballReady = true;
};
ballImage.src = "images/ball.png";
var player = {
	xspeed: 0, 
	yspeed:0,
	acc: 200,
	fric:800
};
var ball = {};
var ballsCaught = 0;
var keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
var reset = function () {
	player.x = canvas.width / 2;
	player.y = canvas.height / 2;
	ball.x = 32 + (Math.random() * (canvas.width - 64));
	ball.y = 32 + (Math.random() * (canvas.height - 64));
};
var update = function (modifier) {
	var f=0;
	player.x+=player.xspeed * modifier;
	player.y+=player.yspeed * modifier;
	if (player.x < 0) {
        player.x = 0;
        player.xspeed = 0;
    }
    if (player.x > canvas.width - 40) {
        player.x = canvas.width - 40;
        player.xspeed = 0;
    }
    if (player.y < 0) {
        player.y = 0;
        player.yspeed = 0;
    }
    if (player.y > canvas.height - 40) {
        player.y = canvas.height - 40;
        player.yspeed = 0;
    }
	if (38 in keysDown) {
		player.yspeed -= player.acc * modifier;
		f=1;
	}
	if (40 in keysDown) { 
		player.yspeed += player.acc * modifier;
		f=1;
	}
	if (37 in keysDown) { 
		player.xspeed -= player.acc * modifier;
		f=1;
	}
	if (39 in keysDown) { 
		player.xspeed += player.acc * modifier;
		f=1;
	}
	if (f==0)
	{
		if (player.xspeed>0)
			{
				if (player.xspeed<player.fric * modifier)
					player.xspeed=0;
				else
					player.xspeed-=player.fric * modifier;
			}
		if (player.yspeed>0)
		{
			if (player.yspeed<player.fric * modifier)
				player.yspeed=0;
			else
			player.yspeed-=player.fric * modifier;
		}
		if (player.xspeed<0)
		{
			if (player.xspeed>-1*player.fric * modifier)
				player.xspeed=0;
			else
				player.xspeed+=player.fric * modifier;
		}	
		if (player.yspeed<0)
		{
			if (player.yspeed>-1*player.fric * modifier)
			player.yspeed=0;
			else
			player.yspeed+=player.fric * modifier;
		}	
	}
	if (player.x<0)
	{
		player.x=3;
		player.xspeed=20;
	}
	if (player.x>472)
	{
		player.x=470;
		player.xspeed=-20;
	}
	if (player.y<0)
	{
		player.y=3;
		player.yspeed=-20;
	}
	if (player.y>445)
	{
		player.y=440;
		player.yspeed=20;
	}
	if (
		player.x <= (ball.x + 32)
		&& ball.x <= (player.x + 32)
		&& player.y <= (ball.y + 32)
		&& ball.y <= (player.y + 32)
	) {
		++ballsCaught;
		player.xspeed=0;
		player.yspeed=0;
		reset();
	}
};
var render = function () {
	if (fieldReady) {
		ctx.drawImage(fieldImage, 0, 0);
	}

	if (playerReady) {
		ctx.drawImage(playerImage, player.x, player.y,40,40);
	}

	if (ballReady) {
		ctx.drawImage(ballImage, ball.x, ball.y);
	}
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Points: " + ballsCaught, 32, 32);
};
var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;
	requestAnimationFrame(main);
};
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var then = Date.now();
reset();
main();