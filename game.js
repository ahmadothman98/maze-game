window.onload=function(){
    localStorage.setItem('score',0);
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
        makeRed();
        let score = localStorage.getItem('score');
        score -= 10 ;
        statusH2.innerHTML = "You Lost!";

         
    }
    function youWon(){
        removeWallsListener();
        makeDefault();
        let score = localStorage.getItem('score');
        score += 5 ;
        statusH2.innerHTML = "You Won!";

    }
     function removeWallsListener(){
        for(let bound = 0 ; bound < bounds.length ; bound ++){
            document.getElementsByClassName("boundary")[bound].removeEventListener('mouseover',youLost);
        }
     }
        document.getElementById("start").addEventListener('click',startGame);
};
