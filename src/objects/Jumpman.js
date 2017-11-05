/*
 * Jumpman
 * ====
 *
 * The main character's sprite.
 *
 */

'use strict';

function Jumpman(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'jumpman');

  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.enableBody = true;
  this.body.collideWorldBounds = true;
  this.body.gravity.y = 550;

  this.jumping = false;
  this.collided = true;

  //for jump function
  this.body.onCollide = new Phaser.Signal();
  this.body.onCollide.add(this.changeCollide, this);

  //jump with spacebar
  var jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  jumpKey.onDown.add(this.jump, this);
  this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
  //moving left/right
  var cursors = game.input.keyboard.createCursorKeys();
  cursors.left.onDown.add(this.moveLeft, this);
  cursors.right.onDown.add(this.moveRight, this);
  cursors.left.onUp.add(this.stopMove, this);
  cursors.right.onUp.add(this.stopMove, this);
}
Jumpman.prototype = Object.create(Phaser.Sprite.prototype);
module.exports = Jumpman.prototype.constructor = Jumpman;

Jumpman.prototype.update = function (game) {

};

//changes status to indicate collision with brick sprite
Jumpman.prototype.changeCollide = function(){
  this.collided = true;
};

//jump function
Jumpman.prototype.jump = function (){
  if(this.collided){
    this.body.velocity.y = -450;
    this.collided = false;
  }
};

Jumpman.prototype.moveLeft = function (){
  if(!this.collided){
    this.body.velocity.x = -100;
  } else {
    this.body.velocity.x = -200;
  }
};

Jumpman.prototype.moveRight = function (){
  if(!this.collided){
    this.body.velocity.x = 100;
  } else {
    this.body.velocity.x = 200;
  }
}

Jumpman.prototype.stopMove = function () {
  this.body.velocity.x = 0;
}
