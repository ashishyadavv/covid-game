function loadImages(){
    enemy_img=new Image;
    enemy_img.src="v1.png";
    player_img=new Image;
    player_img.src="superhero.png";
    
    gem_img=new Image;
    gem_img.src="gemm.png";
    
    button_img=new Image;
    button_img.src="button.jpg";
}




function init() {
    
    canvas=document.getElementById("mycanvas");
    pen=canvas.getContext('2d');
    W=700;
    H=400;
    canvas.width=W;
    canvas.height=H;
    game_over="false";
    game_end=false;
    playing =false;
    //startButton;
    
    e1={
        x:150,
        y:50,
        w:60,
        h:60,
        speed:20,
        
    };
    e2={
        x:300,
        y:150,
        w:60,
        h:60,
        speed:30,
        
    };
    e3={
        x:450,
        y:20,
        w:60,
        h:60,
        speed:40,
        
    };
    enemy=[e1,e2,e3];
    
    player={
        x:20,
        y:H/2,
        w:60,
        h:60,
        speed:20,
        moving : "false",
        health:100,
    };
    
    gem ={
        x :W-100,
        y :H/2,
        w :60,
        h :60,
    };
    button_s={
        x :320,
        y :345,
        w :120,
        h :60,
    };
    
    canvas.addEventListener('mousedown',function(){
        player.moving= true;
    })
    
     canvas.addEventListener('mouseup',function(){
        player.moving= false;
    })
    
    
    
}
function overlap(rect1,rect2){
    
    if (rect1.x < rect2.x + rect2.w &&
       rect1.x + rect1.w > rect2.x &&
       rect1.y < rect2.y + rect2.h &&
       rect1.y + rect1.h > rect2.y) {
        // collision detected!
        return true;
    }
        return false;
    
}

function draw(){
    pen.clearRect(0,0,W,H);
    pen.fillStyle="aqua";
    pen.drawImage(button_img,button_s.x,button_s.y,button_s.w,button_s.h);
        pen.drawImage(player_img,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_img,gem.x,gem.y,gem.w,gem.h);
    
    
    
    for(let i=0;i<enemy.length;i++)
        {
            pen.drawImage(enemy_img,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
            
        }
    
    pen.fillStyle="black";
    pen.fillText("score:"+player.health,20,20,50);
    pen.font = "30px Georgia";
    pen.fillText("START",332,380,1000);

    
}



function update()
{
    
    if(player.moving == true)
        {
            player.x +=player.speed;
            player.health +=1;
        }
    
    
    for(let i=0;i<enemy.length;i++){
       if(overlap(player,enemy[i])){
           player.health -=50;
           
           if(player.health < 0)
               {
                   alert("game over" + player.health);
                   game_over=true;
                   //game_end=false;
               }
       }
           
   }    
    
    
    if(overlap(player,gem)){
        
        game_over=true;
        game_end=true;
    }
    
    
    
    
    for(let i=0;i<enemy.length;i++)
        {
            enemy[i].y +=enemy[i].speed;
            
            if(enemy[i].y >H-enemy[i].h || enemy[i].y<0){
                        enemy[i].speed *= -1;
            }
        }
    
    
}
function gameloop(){
    
    
    draw();
    update();
    if(game_over==true)
        {   alert("you win");
            clearInterval(f);
        }
    //console.log("In game loop");
    
}
loadImages();
init();

var f = setInterval(gameloop,100);