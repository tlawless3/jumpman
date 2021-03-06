/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

'use strict';

var Logo = require('../objects/Logo');
var assets = require('../assets');
var Bricks = require('../objects/Bricks');
var Jumpman = require('../objects/Jumpman');
var Enemy = require('../objects/Enemy');
var Killbox = require('../objects/Killbox');
var brickGroup;
var jumpmanSprite;
var enemyGroup;
var killboxes;
var killboxLeft;
var killboxRight;
var scoreText;
//percentage needs to be > than this to spawn enemy
var spawnChance = .7;
//speed of enemies
var enemySpeed = 200;
var score = 0;
//creates a new jumpman
var createJumpman;

exports.create = function (game) {
  //background image
  game.add.image(0, 0, 'sky')
  //"killboxes" for enemies
  killboxes = game.add.group();
  killboxLeft = game.add.existing(new Killbox(game, 0, 505));
  killboxes.add(killboxLeft);
  killboxRight = game.add.existing(new Killbox(game, 755, 505));
  killboxes.add(killboxRight);

  scoreText = game.add.text(5, 5, "Score: 0", {fontSize: '32px', fill: '#000'});

  brickGroup = game.add.group();
  //adds bricks, the platforms, to game
  //ground level
  for(var i = 0; i < 18; i++){
    var brick = game.add.existing(new Bricks(game , i * 45, 555));
    brickGroup.add(brick);
  }
  //lower left
  for(var i = 0; i < 4; i++){
    var brick = game.add.existing(new Bricks(game, i * 45, 400));
    brickGroup.add(brick);
  }
  //lower right
  for(var i = 0; i < 4; i++){
    var brick = game.add.existing(new Bricks(game, 800 -(i * 45 + 45), 400));
    brickGroup.add(brick);
  }
  //center
  for(var i = 0; i < 10; i++){
    var brick = game.add.existing(new Bricks(game, 180 + i * 45, 250));
    brickGroup.add(brick);
  }
  //top left
  for(var i = 0; i < 4; i++){
    var brick = game.add.existing(new Bricks(game, i * 45, 100));
    brickGroup.add(brick);
  }
  //top right
  for(var i = 0; i < 4; i++){
    var brick = game.add.existing(new Bricks(game, 800 - (i * 45 + 45), 100));
    brickGroup.add(brick);
  }

  jumpmanSprite = game.add.existing(new Jumpman(game, 400, 203));

  createJumpman = function() {
    jumpmanSprite = game.add.existing(new Jumpman(game, 400, 203));
  }

  //spawns enemies in a semi random matter
  enemyGroup = game.add.group();

  var spawnInterval = setInterval(function(){
    var randomNum = Math.random();
    var spawnSide = "";

    if(randomNum > spawnChance){
      var spawnSide = Math.random();
      if(spawnSide > .49){
        spawnSide = "left";
      } else {
        spawnSide = "right";
      }
      var enemy = game.add.existing(new Enemy(game, spawnSide === "left" ? 5 : 800 - 40, 100 - 36, spawnSide, enemySpeed));
      enemyGroup.add(enemy);
    }
  }, 1000)

};

exports.update = function (game) {
  game.physics.arcade.collide(brickGroup, jumpmanSprite);
  game.physics.arcade.collide(enemyGroup, brickGroup);
  //kills enemies when they collide with bottom left/right
  game.physics.arcade.collide(enemyGroup, killboxes, function(enemyGroup, killboxes){
    enemyGroup.kill();
  });
  //crushing/dying
  game.physics.arcade.collide(enemyGroup, jumpmanSprite, function(jumpmanSprite, enemyGroup){
    if(enemyGroup.body.touching.up && jumpmanSprite.body.touching.down){
      enemyGroup.destroy();
      score += 1;
      scoreText.text = "Score: " + score;
    } else if ((enemyGroup.body.touching.right || enemyGroup.body.touching.left || enemyGroup.body.touching.down) && (jumpmanSprite.body.touching.right || jumpmanSprite.body.touching.left || jumpmanSprite.body.touching.up)){
      jumpmanSprite.kill();
      enemyGroup.destroy();
      score = 0;
      scoreText.text = "Score: " + score;
      createJumpman();
    }
  });
  //game conditions changing with score
  if(score === 2){
    spawnChance = .6;
  } else if(score === 5){
    enemySpeed = 250;
  } else if(score === 10){
    spawnChance = .55;
    enemySpeed = 275;
  } else if(score === 15){
    spawnChance = .5;
    enemySpeed = 290;
  } else if(score === 20){
    spawnChance = .4;
    enemySpeed = 300;
  }

}
