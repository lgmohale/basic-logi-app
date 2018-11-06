var player;
var starfield;
var cursors;
var enemies;
var bullets;
var lives = 3;
var Player;
var score = 0;
var scoreText;
var livesText;
var gameoverText;
// var gameOver;
var levelStopped = false;
class controls extends Phaser.Scene {
    constructor() {
        super({key: "controls"});
    }

    preload(){
        this.load.image('space','assets/ship.png');
        this.load.image('stars','assets/stars.jpg');
        this.load.image('invader','assets/invader.png');
        this.load.image('bullets','assets/bullets.png');
    }

    create(){       

         //  The scrolling starfield background
        this.starfield =  this.add.tileSprite(400,300,window.innerWidth, window.innerHeight, 'stars');

         //  The hero!
        this.player = this.physics.add.image(25, 250, 'space');
        this.player.setImmovable();
        this.player.setCollideWorldBounds(true); 

        //controlls
        cursors = this.input.keyboard.createCursorKeys();
        bullets = this.physics.add.group();

        //loading the spaceship
        this.input.keyboard.on('keydown_P', function (event){
             var bullet = bullets.create(this.player.x, this.player.y, 'bullets');
            bullet.setVelocity(400,0);
        },this)



        //adding enemies
        enemies = this.physics.add.group({
            key: 'invader',
            frameQuantity: 5000,
            gridAlign: {
                x: 825,
                y: 25,
                width: 30,
                height: 96,
                cellWidth: 100,
                cellHeight: 100
            },
            collideWorldBounds: false
        });


        // enemies.children.iterate(function(child){
        //     child.setVelocityX(Phaser.Math.Between(-100,-300));
        // enemies.setVelocityX(Phaser.Math.Between(-100,-300));

        Phaser.Actions.Call(enemies.getChildren(), function(go) {
            go.setVelocityX(Phaser.Math.Between(-100,-300))
          });


      
          //collion of player and enemies
          this.physics.add.collider(this.player, enemies, PlayerEnemyCollision,null,this);

          //collison between bullets and enemies
          this.physics.add.overlap(bullets, enemies, BulletsEnemyCollision,null,this);

          //displays score
           scoreText = this.add.text(25,50,'SCORE: ' + score,{
            fontSize: '16px',
            fill: '#FFF'
          });
          
          //Displays lives
          livesText = this.add.text(25, 25, 'LIVES: ' + lives,{
              fontSize: '16px',
              fill: '#fff'
          });

          //
          gameoverText = this.add.text(300,200,'',{
            fontSize: '32px',
            fill: '#fff'
          });

    }
    update(){

        if(levelStopped) {
            return;
        }

        //Scroll the background
        this.starfield.tilePositionX += 5;
        
        //player movement
        this.player.setVelocity(0);
        if (cursors.left.isDown)
        {
            this.player.setVelocityX(-200);
        }
        else if (cursors.right.isDown)
        {
            this.player.setVelocityX(200);
        }

        if (cursors.up.isDown)
        {
            this.player.setVelocityY(-200);
        }
        else if (cursors.down.isDown)
        {
            this.player.setVelocityY(200);
        }

        //setInterval(enemyGenerator, 4000);
        
     }

     //

     

}

//collision between player and the enemy
function PlayerEnemyCollision(player, enemies){
    enemies.disableBody(true, true);

lives -=1;
livesText.setText('LIVE: ' + lives);
    if(lives == 0){
        restartLevel();
        gameoverText.setText('GAME OVER!!!');
    };
};

function restartLevel(player) {
    console.log("in restartLevel");
    levelStopped = true;
    game.scene.pause('controls');
    levelStopped = false;
    lives = 3;
    livesText.setText('LIVE: ' + lives);
};



//collision between bullets and the enemy
function BulletsEnemyCollision(bullets, enemies){
    score +=10;
    console.log("score: "+ score)
    scoreText.setText('Score: ' + score)
    enemies.disableBody(true, true);
    bullets.disableBody(true, true);
    //
    // if(score == 120){
    //     Nextleve();
    //     console.log('next level');
    //     gameoverText.setText('WELL DONE!!!');
    // };
    
};

// function Nextleve(){
//     game.scene.pause('controls');
//     game.scene.start('level2');
// };