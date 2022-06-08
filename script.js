alert("Welcome to the Dragon Game - Created by SVSK. " + "\n\n"+"Your task is to save the dino from dragon." + "\n\n" +
`Please use arrow key to jump, left key to move back and right key to move forward.` 
)
// alert.style.color= "red";



let flag=false;
let score = 0;
let cross = true;
document.onkeydown = function (e) {
    // console.log("key code is", e.keyCode);
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 900);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if(flag){
            dino.classList.remove('flipDino');
            flag=false;
        }
        dino.style.left = dx + 90 + "px";
    }
    if (e.keyCode == 37) {
        
        dino = document.querySelector('.dino');
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if(flag==false){
            dino.classList.add('flipDino');
            flag=true;
        }
        
        dino.style.left = (dx - 90) + "px";
    }

}

audio = new Audio("music.mp3");
audioGO = new Audio("gameover.mp3");
setTimeout(() => {
    audio.play();
}, 500);

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX,offsetY);
    if ((offsetX < 140 && offsetY < 20) ||(dx < -75 || dx > (parseInt(window.innerWidth)-220))) {
        // dino = document.querySelector('.dino'); 
        gameOver.style.visibility = 'visible';
        
        
        gameOver.classList.add('gameOverAni');
        audioGO.play();
        obstacle.classList.remove('obstacleAni');
        audio.pause();
        
        setTimeout(() => {
            audioGO.pause();
        }, 3000);
        dino.classList.add('dinoDown');
        setTimeout(() => {
            dino.style.display = "none";
        }, 2000);
    }
    else if (dx > ox && offsetX < 100 && cross) { //very imporatnt code lines
        score += 1;
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 2500 );
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            
            if (aniDur > 2.5) {
                newDur = aniDur - 0.1;              
                obstacle.style.animationDuration = newDur + "s";
            }
            
            
        }, 600);
        
        updateScore(score);
    }


}, 10);
function updateScore(score) {
    scoreCont.innerHTML = "Your Score : " + score;
}

