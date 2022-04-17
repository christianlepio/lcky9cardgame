
let value=['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
let suit=['♦','♠','♥','♣'];
let val = new Array(6), sut = new Array(6);
let win = 0, lose = 0, draw = 0, score1 = 0, score2 = 0;
let c1 = 0, c2 = 0, j = 0;
let color;
const CardValueMap = {
	'2' : 2,
	'3' : 3,
	'4' : 4,
	'5' : 5,
	'6' : 6,
	'7' : 7,
	'8' : 8,
	'9' : 9,
	'10' : 10,
	'J' : 11,
	'Q' : 12,
	'K' : 13,
	'A' : 1
}

const SoundWin = new Audio('bgmusic/win.wav');
const SoundLose = new Audio('bgmusic/lose.wav');
const SoundDraw = new Audio('bgmusic/draw.wav');
const SoundHit = new Audio('bgmusic/flip.wav');
const SoundError = new Audio('bgmusic/error.wav');

function RandomCards(){
	for(let i=0 ; i < val.length ; i++){
		val[i] = value[Math.floor(Math.random()*13)];
		sut[i] = suit[Math.floor(Math.random()*4)];
	}
	loop:
	for(let i=0 ; i < val.length ; i++){
		for(let a=0 ; a < val.length ; a++){
			if(i == a){
				continue loop;
			}
			else if(val[i] == val[a] && sut[i] == sut[a]){
				val[i] = value[Math.floor(Math.random()*13)];
				sut[i] = suit[Math.floor(Math.random()*4)];
				i=0;
				continue loop;			
			}
		}
	}
}RandomCards();

function hit(){
	if(c1 < 3){
		score1 += CardValueMap[val[j]];
		score1 %= 10;
		document.getElementById('sc1').innerText = score1;		
		sut[j] == suit[1] || sut[j] == suit[3] ? color = "black" : color = "red";
		let plyrSlot = document.getElementById('hooman');
		let cardDiv = document.createElement('div');
		cardDiv.innerText = sut[j];
		cardDiv.classList.add("card", color);
		cardDiv.dataset.value = val[j]+sut[j];
		plyrSlot.appendChild(cardDiv);
		SoundHit.play();
		c1+=1;
		j++;
	}else{
		SoundError.play();
	}
}

async function stand(){
	if(c1 == 2 || c1 == 3){
		c1 = 3;	
		if(c2 < 3){
			sut[j] == suit[1] || sut[j] == suit[3] ? color="black":color="red";
			let cmptrSlot = document.getElementById('bot');
			let cardDiv = document.createElement('div');
			cardDiv.innerText = sut[j];
			cardDiv.classList.add("card", color);
			cardDiv.dataset.value = val[j]+sut[j];
			cmptrSlot.appendChild(cardDiv);
			score2 += CardValueMap[val[j]];
			score2 %= 10;
			document.getElementById('sc2').innerText=score2;
			SoundHit.play();
			c2+=1;
			j++;
			await pause(800);
			do{
				if(c2 < 3){
					sut[j] == suit[1] || sut[j] == suit[3] ? color="black":color="red";
					let cmptrSlot = document.getElementById('bot');
					let cardDiv = document.createElement('div');
					cardDiv.innerText = sut[j];
					cardDiv.classList.add("card", color);
					cardDiv.dataset.value = val[j]+sut[j];
					cmptrSlot.appendChild(cardDiv);
					score2 += CardValueMap[val[j]];
					score2 %= 10;
					document.getElementById('sc2').innerText=score2;
					SoundHit.play();
					c2+=1;
					j++;
					await pause(800);	
				}else{
					break;
				}
			}while(score2 < 8);
			c2 = 3;
			GameScore(score1, score2);	
		}else{
			SoundError.play();			
		}
	}else{
		SoundError.play();
	}
}

function deal(){
	if(c1 == 3 && c2 == 3){
		clear();	
	}else{
		SoundError.play();
	}
}

function ref(){
	win=0;
	lose=0;
	draw=0;
	document.getElementById('panalo').textContent = win;
	document.getElementById('talo').textContent = lose;
	document.getElementById('patas').textContent = draw;
	document.getElementById('panalo').style.color = "white";
	document.getElementById('talo').style.color = "white";
	document.getElementById('patas').style.color = "white";
	clear();
}

function GameScore(s1 , s2){
	if((c1 == 2 || c1 == 3) && (c2 == 2 || c2 == 3)){
		if(s1 > s2){
			win++;
			document.getElementById('status').style.color = "blue";
			document.getElementById('status').style.textShadow = "0 0 1px white, 0 0 2px white";
			document.getElementById('status').textContent = "YOU WIN!";
			document.getElementById('panalo').textContent = win;
			document.getElementById('panalo').style.color = "blue";
			SoundWin.play();
		}
		else if(s1 < s2){
			lose++;
			document.getElementById('status').style.color = "red";
			document.getElementById('status').style.textShadow = "0 0 1px white, 0 0 2px white";
			document.getElementById('status').textContent = "YOU LOSE!";
			document.getElementById('talo').textContent = lose;
			document.getElementById('talo').style.color = "red";
			SoundLose.play();	
		}
		else{
			draw++;
			document.getElementById('status').style.color = "#FCBF49";
			document.getElementById('status').style.textShadow = "0 0 0px white, 0 0 2px white";
			document.getElementById('status').textContent = "DRAW!";
			document.getElementById('patas').textContent = draw;
			document.getElementById('patas').style.color = "#FCBF49";
			SoundDraw.play();
		}
	}
	else{
		SoundError.play();
	}
}
function clear(){
	let parent1 = document.getElementById('hooman');
	while(parent1.hasChildNodes()){
		parent1.removeChild(parent1.firstChild);
	}
	let parent2	= document.getElementById('bot');
	while(parent2.hasChildNodes()){
		parent2.removeChild(parent2.firstChild);
	}
	c1 = 0;
	c2 = 0;
	j = 0;
	score1 = 0;
	score2 = 0;
	document.getElementById('sc1').innerText = score1;
	document.getElementById('sc2').innerText = score2;
	document.getElementById('status').innerText = "";
	RandomCards();
}

function pause(ms){
    return new Promise(resolve => setTimeout(resolve , ms));
}
