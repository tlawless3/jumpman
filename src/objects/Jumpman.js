/*
 * Jumpman
 * ====
 *
 * The main character's sprite.
 *
 */

'use strict';

var cursors;
var jumpKey

function Jumpman(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'jumpman');

  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.enableBody = true;
  this.body.collideWorldBounds = true;
  this.body.gravity.y = 550;

  this.maxJump = false;
  this.jumping = false;
  this.collided = true;

  //for jump function
  this.body.onCollide = new Phaser.Signal();
  this.body.onCollide.add(this.changeCollide, this);

  //jump with spacebar
  jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  jumpKey.onDown.add(this.jump, this);
  this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
  //moving left/right
  cursors = game.input.keyboard.createCursorKeys();
  cursors.left.onUp.add(this.stopMove, this);
  cursors.right.onUp.add(this.stopMove, this);
}
Jumpman.prototype = Object.create(Phaser.Sprite.prototype);
module.exports = Jumpman.prototype.constructor = Jumpman;

Jumpman.prototype.update = function (game) {
  if(cursors.left.isDown){
    this.moveLeft();
  }
  if(cursors.right.isDown){
    this.moveRight();
  }
  if(jumpKey.isDown){
    this.longerJump();
  }
};

//changes status to indicate collision with brick sprite
Jumpman.prototype.changeCollide = function(){
  this.collided = true;
};

//jump function
Jumpman.prototype.jump = function (){
  if(this.collided && this.body.velocity.y === 0){
    this.maxJump = false;
    this.body.velocity.y = -80;
    this.collided = false;
  }
};

Jumpman.prototype.longerJump = function(){
  if(!this.collided && this.body.velocity.y >= -450 && !this.maxJump){
    this.body.velocity.y += -40;
  }
  var that = this;
  setTimeout(function(){
    that.maxJump = true;
  }, 150)
}

Jumpman.prototype.moveLeft = function (){
  this.body.velocity.x = -200;
};

Jumpman.prototype.moveRight = function (){
  this.body.velocity.x = 200;
}

Jumpman.prototype.stopMove = function () {
  this.body.velocity.x = 0;
}
