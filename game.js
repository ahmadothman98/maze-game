window.onload=function(){
    let scoreTag = '';
    let end_time=0;
    let best_min = 0;
    let best_sec =0;
    let won = 0;
    createScore();
    createRestartButton();
    createTime();
    let statusH2 = document.getElementById("status");
    let bounds = document.getElementsByClassName("boundary");

    function startGame(){
        won = 0;
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
        won =1 ;
        removeWallsListener();
        document.getElementById("end").removeEventListener('mouseover',youWon);
        document.getElementById("game").removeEventListener('mouseleave',cheating);
        makeDefault();
        updateScoreUp();
        statusH2.innerHTML = "You Won!";
        end_time = 1;


    }
    function cheating(){
        alert("Dont Cheat!");
        document.getElementById("game").removeEventListener('mouseleave',cheating);
        document.getElementById("end").removeEventListener('mouseover',youWon);
        removeWallsListener();
        statusH2.innerHTML = "Begin by moving your mouse over the \"S\".";
        end_time = 1;

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
        end_time = 1;

     }
     function restart(){
        localStorage.setItem('score',0);
        document.querySelector("#score_id").innerHTML = "Score : 0";
        end_time = 1;
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
     function createTime(){
        let timeElapsed = document.createElement("div");
        let button = document.querySelector('button').parentNode;
        button.parentNode.insertBefore(timeElapsed,button);
        timeElapsed.innerHTML = "<div id ='live'></div><div id ='last'></div><div id ='best'></div>"
        timeElapsed.style.display = 'flex';
        timeElapsed.style.justifyContent = 'center';
        timeElapsed.style.margin = ' 30px';
        timeElapsed.style.fontSize = ' 25px';
        timeElapsed.childNodes[0].style.margin = '0 100px 0 100px';
        timeElapsed.childNodes[1].style.margin = '0 100px 0 100px';
        timeElapsed.childNodes[2].style.margin = '0 100px 0 100px';
        document.getElementById('live').innerHTML = "Live: 0:0.0";
        document.getElementById('last').innerHTML = "Last: 0:0.0";
        document.getElementById('best').innerHTML = "Best: 0:0.0";



     }
     function startTimer(minutes = 0){
         end_time = 0; 
         let start_time = Date.now();
         console.log(start_time);
         let milliseconds = 0;
         let seconds = 0;
         var interval = setInterval(timer,10);
         function timer(){
            elapsed_time= Date.now() - start_time;
            milliseconds = Math.floor(elapsed_time) ;
            seconds =  (milliseconds /1000).toFixed(1);
            if (milliseconds > 60000){
                minutes++;
                milliseconds = 0;
                seconds = 0;
                clearInterval(interval);
                startTimer(minutes);
                
            }
            document.getElementById('live').innerHTML = "Live: " + minutes + ":" + seconds;
         
         if(end_time === 1 ){
            clearInterval(interval);
            if(won === 1){
                document.getElementById('last').innerHTML = "Last: " + minutes + ":" + seconds;
                document.getElementById('live').innerHTML = "Live: 0:0.0";
                if(best_min === 0 && best_sec ===0 ){
                    best_min= minutes;
                    best_sec = seconds;
                    document.getElementById('best').innerHTML = "Best: " + best_min + ":" + best_sec;
                }
                else{
                    if(minutes<=best_min){
                        if(seconds<best_sec){
                            best_min= minutes;
                            best_sec = seconds;
                            document.getElementById('best').innerHTML = "Best: " + best_min + ":" + best_sec;
                        }
                    }
                }

         }
        }
    }
     }
     

        document.getElementById("start").addEventListener('mouseover',function(){startGame();startTimer();});
};
