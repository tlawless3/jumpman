/*
 * Killbox
 * ====
 *
 * A box that kills enemies
 *
 */

'use strict';

function Killbox(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'killbox');

  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.enableBody = true;
  this.body.immovable = true;
}
Killbox.prototype = Object.create(Phaser.Sprite.prototype);
module.exports = Killbox.prototype.constructor = Killbox;

Killbox.prototype.update = function () {

};
