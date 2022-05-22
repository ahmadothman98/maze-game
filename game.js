window.onload=function(){
    let scoreTag = '';
    createScore();
    createRestartButton();
    let statusH2 = document.getElementById("status");
    let bounds = document.getElementsByClassName("boundary");

    function startGame(){
        statusH2.innerHTML = "Game Started";
        document.getElementById("end").addEventListener('mouseover',youWon);
        console.log("game starts");
        makeDefault();
        for(let bound = 0 ; bound < 5 ; bound ++){
            document.getElementsByClassName("boundary")[bound].addEventListener('mouseover',youLost);
        }
        document.getElementById("game").addEventListener('mouseleave',cheating);
        
    
    }
        
    function makeRed(){
        for(let bound = 0 ; bound < bounds.length ; bound ++){
            bounds[bound].style.backgroundColor = "red";
        }
    }
    function makeDefault(){
        for(let bound = 0 ; bound < bounds.length ; bound ++){
            bounds[bound].style.backgroundColor = "#eeeeee";
        }
    }
    function youLost(){
        removeWallsListener();
        document.getElementById("end").removeEventListener('mouseover',youWon);
        document.getElementById("game").removeEventListener('mouseleave',cheating);
        makeRed();
        updateScoreDown();
        statusH2.innerHTML = "You Lost!";

         
    }
    function youWon(){
        removeWallsListener();
        document.getElementById("end").removeEventListener('mouseover',youWon);
        document.getElementById("game").removeEventListener('mouseleave',cheating);
        makeDefault();
        updateScoreUp();
        statusH2.innerHTML = "You Won!";

    }
    function cheating(){
        alert("Dont Cheat!");
        document.getElementById("game").removeEventListener('mouseleave',cheating);
        document.getElementById("end").removeEventListener('mouseover',youWon);
        removeWallsListener();
        statusH2.innerHTML = "Begin by moving your mouse over the \"S\".";
        

     }
     function removeWallsListener(){
        for(let bound = 0 ; bound < bounds.length ; bound ++){
            document.getElementsByClassName("boundary")[bound].removeEventListener('mouseover',youLost);
        }
     }
     function updateScoreUp(){
        let newScore = parseInt(localStorage.getItem('score'));
        newScore += 5 ;
        localStorage.setItem('score',newScore);
        score = localStorage.getItem('score');
        scoreTag.innerHTML = "Score : " + score;
     }
     function updateScoreDown(){
        let newScore = parseInt(localStorage.getItem('score'));
        newScore -= 10 ;
        localStorage.setItem('score',newScore);
        score = localStorage.getItem('score');
        scoreTag.innerHTML = "Score : " + score;
     }
     function restart(){
        localStorage.setItem('score',0);
        document.querySelector("#score_id").innerHTML = "Score : 0";
     }

     function createRestartButton(){
        let restartDiv = document.createElement("div");
        document.querySelector('body').appendChild(restartDiv);
        let restartButton = document.createElement("button");
        restartDiv.appendChild(restartButton);
        restartButton.innerHTML = "Restart";
        restartDiv.style.display = 'flex';
        restartDiv.style.justifyContent = 'center';
        restartButton.addEventListener('click',restart);

     }

     function createScore(){
        localStorage.setItem('score',0); 
        let score = localStorage.getItem('score');
    
        scoreTag = document.createElement("h2");
        scoreTag.id = 'score_id';
        document.getElementsByTagName('body')[0].appendChild(scoreTag);
        scoreTag.innerHTML = "Score : " + score;
     }
        document.getElementById("start").addEventListener('click',startGame);
};
