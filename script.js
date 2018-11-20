/*
Game Functions:
-Player must guess a number between min and max
-Player gets a certain amount of guesses
-Display the number the guesses remaining
-Display the correct guess if the player looses
-Give the option to play again
*/


// Ui elements
const gameForm = document.querySelector('#game-form'),
      gameInput = document.querySelector('#game-input'),
      submitBtn = document.querySelector('#submit-btn'),
      maxNum = document.querySelector('.max-num'),
      minNum = document.querySelector('.min-num'),
      message = document.querySelector('.message');
      


// Game values
var min = 1,
    max = 10,
    winingNum = getRandomNum(min,max),
    guessesLeft = 3,
    danger = 'red',
    success = 'green';


// assign the Ui min and max
minNum.textContent = min;
maxNum.textContent = max;

//Listen for guess
gameForm.addEventListener('submit', function(e){
    let guess = parseInt(gameInput.value);

    // validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(danger, `please guess a number between ${min} to ${max}`);
        gameInput.value = '';
    }
    // check for wining
    else if(guess === winingNum){
        gameOver(success, `${winingNum} is correct. You win!`); 
        celebrate();
    }

    else{
        --guessesLeft;
        gameInput.value = '';
        if(guessesLeft === 0){
            gameOver(danger, `game over - you lost. The wining number was ${winingNum}`);
        }

        else{
             setMessage(danger, `wrong guess. ${guessesLeft} guesses left`);
        }      
    }
    e.preventDefault();
});




// set message
function setMessage(msgType, msg){
    // message.classList.remove('danger','success');
    message.textContent = msg;
    // adds class to message
    message.style.color = msgType;
}

function gameOver(color, msg){
    // disable the input
    gameInput.disabled = true;
    // give the input a border color of green or red
    gameInput.style.borderColor = color;
    //set message
    setMessage(color, msg);

    submitBtn.value = 'play again';
    submitBtn.classList.add('play-again');

    var playAgain = document.querySelector('.play-again');

    playAgain.addEventListener('click', function(){
        window.location.reload(true);
        console.log(3);
    });
}

function getRandomNum(min, max){
    return Math.round(Math.random()*(max-min)+min);
}





function celebrate(){

    let yay = document.querySelector('video');
    yay.volume -= 0.8;
    yay.play();

	//canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	//canvas dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	//snowflake particles
	var mp = 500; //max particles
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*4+1, //radius
			d: Math.random()*mp, //density
            color: "rgba(" + Math.floor((Math.random() * 255)) +", " + Math.floor((Math.random() * 255)) +", " + Math.floor((Math.random() * 255)) + ", 0.8)"
		})
	}
	
	//Lets draw the flakes
	function draw()
	{
		ctx.clearRect(0, 0, W, H);
		
		
		
		for(var i = 0; i < mp; i++)
		{ 
			var p = particles[i];
            ctx.beginPath();
            ctx.fillStyle = p.color;
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
            ctx.fill();
		}
		
		update();
	}
	
	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	function update()
	{
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%3 > 0) //66.67% of the flakes
				{
                    particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d, color : p.color};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
                        particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d, color: p.color};
					}
					else
					{
						//Enter from the right
                        particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d, color : p.color};
					}
				}
			}
		}
	}
	
	//animation loop
	setInterval(draw, 33);
}
