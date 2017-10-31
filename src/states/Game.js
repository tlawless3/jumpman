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
var brickGroup;

exports.create = function (game) {
  //  TODO: Replace this content with really cool game code here :)
  var x = game.world.centerX;
  var y = game.world.centerY;
  //game.add.existing(new Logo(game, x, y));
  game.add.image(0, 0, 'sky')

  brickGroup = game.add.group();
  //adds bricks, the platforms, to game
  //ground level
  for(var i = 0; i < 18; i++){
    brickGroup.create((new Bricks(game , i * 45, 555)));
  }
  //lower left
  for(var i = 0; i < 4; i++){
    game.add.existing(new Bricks(game, i * 45, 400));
  }
  //lower right
  for(var i = 0; i < 4; i++){
    game.add.existing(new Bricks(game, 800 -(i * 45 + 45), 400));
  }
  //center
  for(var i = 0; i < 10; i++){
    game.add.existing(new Bricks(game, 180 + i * 45, 250));
  }
  //top left
  for(var i = 0; i < 4; i++){
    game.add.existing(new Bricks(game, i * 45, 100));
  }
  //top right
  for(var i = 0; i < 4; i++){
    game.add.existing(new Bricks(game, 800 - (i * 45 + 45), 100));
  }

  game.add.existing(new Jumpman(game, 400, 203));
};

exports.update = function (game) {
  game.physics.arcade.collide(Bricks, Jumpman, function(){
    console.log("collide");
  });
}
