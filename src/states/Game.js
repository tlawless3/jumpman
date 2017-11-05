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
var brickGroup;
var jumpmanSprite;
var enemyGroup;
//percentage needs to be > than this to spawn enemy
var spawnChance = .7;
//speed of enemies
var enemySpeed = 200;

exports.create = function (game) {
  //background image
  game.add.image(0, 0, 'sky')

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
}
