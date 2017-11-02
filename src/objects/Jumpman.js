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
  this.body.gravity.y = 300;

}
Jumpman.prototype = Object.create(Phaser.Sprite.prototype);
module.exports = Jumpman.prototype.constructor = Jumpman;

Jumpman.prototype.update = function (game) {

};

//jump function
Jumpman.prototype.jump = function () {
  this.body.velocity.y = -400;
};
