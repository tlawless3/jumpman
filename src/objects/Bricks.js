/*
 * bricks
 * ====
 *
 * Platforms the player can jump on.
 *
 */

'use strict';

function Bricks(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'bricks');

  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.enableBody = true;
  this.body.immovable = true;
}
Bricks.prototype = Object.create(Phaser.Sprite.prototype);
module.exports = Bricks.prototype.constructor = Bricks;

Bricks.prototype.update = function () {
  
};
