/*
 * Enemy
 * ====
 *
 *The goumbo
 *
 */

'use strict';

function Enemy(game, x, y, spawnPoint, speed) {
  Phaser.Sprite.call(this, game, x, y, 'enemy');

  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.enableBody = true;
  this.body.collideWorldBounds = true;
  this.body.gravity.y = 550;
  if(spawnPoint === "left"){
    this.body.velocity.x = speed;
  } else if(spawnPoint === "right") {
    this.body.velocity.x = -speed;
  }
  this.body.bounce.setTo(1, 0);
}
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
module.exports = Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {

};
